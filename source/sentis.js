
// Experimental

const logError = (...args) => {
    /* eslint-disable no-console */
    console.error(...args);
    /* eslint-enable no-console */
};

import { ByteBuffer } from './byte-buffer.js';
import { SentisFlatBuffer } from './sentis-schema.mjs';

const { Program, Operator, KernelCall, InstructionArguments } = SentisFlatBuffer;

const debugExecutionPlan = (executionPlan) => {
    const optionalEncoding = undefined;
    const index = 0;
    const obj = undefined;
    console.log(`
Execution Plan 
(first index whenever an arg requires)
===========
    name = ${executionPlan.name?.(optionalEncoding)}
    values = ${executionPlan.values?.(index, obj)}
    valuesLength = ${executionPlan.valuesLength?.()}

== Inputs ==
    inputs = ${executionPlan.inputs?.(index)}
    inputsLength = ${executionPlan.inputsLength?.()}
    inputsArray = ${executionPlan.inputsArray?.()}
    inputsName = ${executionPlan.inputsName?.(index, optionalEncoding)}
    inputsNameLength = ${executionPlan.inputsNameLength?.()}

== Outputs ==
    outputs = ${executionPlan.outputs?.(index)}
    outputsLength = ${executionPlan.outputsLength?.()}
    outputsArray = ${executionPlan.outputsArray?.()}
    outputsName = ${executionPlan.outputsName?.(index, optionalEncoding)}
    outputsNameLength = ${executionPlan.outputsNameLength?.()}

== Chains ==
    chains = ${executionPlan.chains?.(index, obj)}
    chainsLength = ${executionPlan.chainsLength?.()}

== Operators ==
    operators = ${executionPlan.operators?.(index, obj)}
    operatorsLength = ${executionPlan.operatorsLength?.()}
    backendPartitioning = ${executionPlan.backendPartitioning?.(obj)}

Bellow the [object Object]s
    `,
    executionPlan.values?.(index, obj),
    executionPlan.chains?.(index, obj),
    executionPlan.operators?.(index, obj),
    executionPlan.backendPartitioning?.(obj),
    executionPlan,
    );
};

const sentis = {};

const getInt32 = (buffer) => {
    return buffer[0] | (buffer[1] << 8) | (buffer[2] << 16) | (buffer[3] << 24);
};

function processIO(context, lengthFunc, accessorFunc, type = 'input') {
    const result = [];
    for (let i = 0; i < lengthFunc.call(context); i++) {
        const index = accessorFunc.call(context, i);
        if (index !== null) {
            result.push(new sentis.Argument(`${type}_${index}`, [index]));
        }
    }
    return result;
}
sentis.ModelFactory = class {
    match(context) {
        const stream = context.stream;

        // Early return if the stream is invalid or too short
        if (!stream || stream.length <= 12) {
            /* eslint-disable no-console */
            logError('Stream is invalid or too short.');
            /* eslint-enable no-console */
            return;
        }
        // const buffer = stream.peek(4);
        // // Read the root offset (first 4 bytes, little-endian)
        // const rootOffset = getInt32(buffer)
        // if (rootOffset >= stream?.length) {
        //     return;
        // }

        // Set the context type
        context.type = "sentis";
        // context.rootOffset = rootOffset;
    }

    async open(context) {
        const metadata = sentis.Metadata.open();

        // Read the binary data from the correct position
        // const fileSize = context.stream.read(4);
        const reader = context.read('binary');
        const fileSize = getInt32([...reader._buffer.slice(0, 4)]);
        const rawBytes = new Uint8Array([...reader._buffer.slice(0, fileSize + 4)]);
        const bb = new ByteBuffer(rawBytes, 4);

        // Parse the program using FlatBuffers
        const program = Program.getRootAsProgram(bb);
        if (!program) {
            logError("No program!");
        }

        return new sentis.Model(metadata, program);
    }
};

sentis.Model = class {
    constructor(metadata, program) {
        this.metadata = metadata || {};
        this.program = program;
        this.format = `Sentis v${program.version()}`;
        this.graphs = [new sentis.Graph(metadata, program)];
    }
};

sentis.Graph = class {
    constructor(metadata, program) {
        const executionPlan = program.executionPlan();
        debugExecutionPlan(executionPlan);
        if (!executionPlan) {
            logError("No execution plan!");
            return;
        }

        // Graph properties
        this.name = program.name || '';
        this.inputs = processIO(executionPlan, executionPlan.inputsLength, executionPlan.inputs, 'input');
        this.outputs = processIO(executionPlan, executionPlan.outputsLength, executionPlan.outputs, 'output');
        this.nodes = [];

        for (let i = 0; i < executionPlan.chainsLength?.(); i++) {
            const chain = executionPlan.chains?.(i);
            this.nodes.push(new sentis.Node(metadata, chain, executionPlan, executionPlan.operators));
        }
    }
};

sentis.Argument = class {
    constructor(name, value, type = null) {
        this.name = name;
        this.value = value;
        this.type = type;
    }
};

sentis.Value = class {
    constructor(name, type = null, initializer = null) {
        this.name = name;
        this.type = type;
        this.initializer = initializer;
    }
};

sentis.Node = class {
    constructor(metadata, chain, executionPlan) {
        this.type = metadata.type ? metadata.type(chain.type) : { name: chain.type || 'Unknown' };
        this.inputs = processIO(chain, chain.inputsLength, chain.inputs, 'input');
        this.outputs = processIO(chain, chain.outputsLength, chain.outputs, 'output');
        this.attributes = [];

        for (let i = 0; i < chain.instructionsLength(); i++) {
            const instruction = chain.instructions(i);
            if (!instruction) {
                continue;
            }

            const type = instruction.instrArgsType();
            if (type === InstructionArguments.NONE) {
                this.attributes.push({ name: 'NoOp' });
                continue;
            }

            if (type !== InstructionArguments.KernelCall) {
                this.attributes.push({ name: 'UnknownInstruction', type });
                continue;
            }

            const args = instruction.instrArgs(new KernelCall());
            const opIndex = args.opIndex();
            const operator = executionPlan.operators(opIndex, new Operator());

            if (!operator) {
                logError(`Missing operator for opIndex ${opIndex}`);
                this.attributes.push({ name: 'KernelCall', value: 'Unknown Kernel', opIndex });
                continue;
            }

            const kernelName = operator?.name?.() ?? 'Unnamed Kernel';
            this.attributes.push({ name: 'KernelCall', value: kernelName, opIndex, args: args.argsArray() });
        }

    }
};

sentis.Tensor = class {
    constructor(tensor, buffers) {
        // Tensor type (e.g., float32, int32)
        this.type = new sentis.TensorType(tensor.scalar_type, tensor.fixed_sizes, tensor.dynamic_sizes);

        // Tensor data (from buffer or dynamically allocated)
        if (tensor.constant_buffer_idx && buffers) {
            const buffer = buffers[tensor.constant_buffer_idx - 1]; // Constant buffer index is 1-based
            if (buffer) {
                this.values = buffer.storage.slice(0, tensor?.length_byte);
            } else {
                throw new Error(`Buffer with index ${tensor.constant_buffer_idx} not found.`);
            }
        } else if (tensor.storage_offset >= 0) {
            this.values = `Dynamic: offset=${tensor.storage_offset}`;
        } else {
            this.values = null; // No data for this tensor
        }
    }
};

sentis.TensorType = class {
    constructor(scalarType, fixedSizes, dynamicSizes) {
        this.dataType = this._getDataType(scalarType);
        this.shape = new sentis.TensorShape(fixedSizes, dynamicSizes || []);
    }

    /**
     * Returns the data type as a string.
     * @param {number} scalarType - Scalar type as defined in the schema.
     * @returns {string} - Data type as a string (e.g., "float32", "int32").
     */
    _getDataType(scalarType) {
        switch (scalarType) {
            case 0: return 'float32';
            case 1: return 'int32';
            case 2: return 'uint8';
            case 3: return 'int16';
            default: throw new Error(`Unsupported scalar type '${scalarType}'.`);
        }
    }

    toString() {
        return `${this.dataType}${this.shape}`;
    }
};

sentis.TensorShape = class {
    constructor(fixedSizes, dynamicSizes) {
        this.fixed = fixedSizes || [];
        this.dynamic = dynamicSizes.map((dim) => (dim.val ? dim.val.name : '?'));
    }

    toString() {
        const fixedPart = this.fixed?.length ? `[${this.fixed.join(',')}]` : '';
        const dynamicPart = this.dynamic?.length ? `[${this.dynamic.join(',')}]` : '';
        return fixedPart + dynamicPart;
    }
};

sentis.Activation = {
    0: "Linear", 1: "Relu", 2: "Softmax", 3: "Tanh", 4: "Sigmoid", 5: "Elu", 6: "Relu6", 7: "LeakyRelu", 8: "Selu", 9: "Swish",
    10: "LogSoftmax", 11: "Softplus", 12: "Softsign", 13: "PRelu",
    20: "Hardmax", 21: "HardSigmoid",
    100: "Abs", 101: "Neg", 102: "Ceil", 103: "Clip", 104: "Floor", 105: "Round",
    110: "Reciprocal", 111: "Sqrt", 113: "Exp", 114: "Log",
    200: "Acos", 201: "Acosh", 202: "Asin", 203: "Asinh", 204: "Atan", 205: "Atanh", 206: "Cos", 207: "Cosh", 208: "Sin", 209: "Sinh", 210: "Tan"
};

sentis.Metadata = class {

    static open() {
        sentis.Metadata._metadata = sentis.Metadata._metadata || new sentis.Metadata();
        return sentis.Metadata._metadata;
    }

    constructor() {
        this._types = new Map();

        const register = (id, name, category, inputs) => {
            this._types.set(id, { name, category, inputs: (inputs || []).map((input) => {
                return { name: input };
            }) });
        };

        // Registering types based on the schema from `program.fbs`
        register(0, 'Null', 'Literal');
        register(1, 'Int', 'Scalar');
        register(2, 'Float', 'Scalar');
        register(3, 'Bool', 'Scalar');
        register(4, 'Byte', 'Scalar');
        register(10, 'Tensor', 'Data');
        register(11, 'String', 'Literal');
        register(12, 'IntList', 'List');
        register(13, 'FloatList', 'List');
        register(14, 'BoolList', 'List');
    }

    type(id) {
        if (!this._types.has(id)) {
            // If the type is not registered, add it with a generic structure
            this._types.set(id, { name: id?.toString() || "no-name" });
        }
        return this._types.get(id);
    }
};

sentis.Error = class extends Error {

    constructor(message) {
        super(message);
        this.name = 'Error loading Sentis model.';
    }
};

export const ModelFactory = sentis.ModelFactory;
