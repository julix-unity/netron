
// Experimental

import { ByteBuffer } from './byte-buffer.js';
import { SentisFlatBuffer } from './sentis-schema.mjs';

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

const debugGraph = (program, executionPlan) => {
    console.log(`
        Program 
        Version: ${program.version?.()}
        Identifier: ${program.bufferHasIdentifier?.()}
        ----
        Graph Construction:
        Inputs Length: ${executionPlan.inputsLength?.()}
        Outputs Length: ${executionPlan.outputsLength?.()}
        Chains Length: ${executionPlan.chainsLength?.()}
    `, program);
}

const sentis = {};

const getInt32 = (buffer) => {
    return buffer[0] | (buffer[1] << 8) | (buffer[2] << 16) | (buffer[3] << 24);
};
sentis.ModelFactory = class {
    match(context) {
        const stream = context.stream;

        console.log(stream);

        // Early return if the stream is invalid or too short
        if (!stream || stream.length <= 12) {
            /* eslint-disable no-console */
            console.error('Stream is invalid or too short.');
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

        console.log(reader, fileSize, rawBytes, bb);

        // Parse the program using FlatBuffers
        const program = SentisFlatBuffer.Program.getRootAsProgram(bb);
        if (!program) {
            console.error("No program!");
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
            console.error("No execution plan!");
            return;
        }

        debugGraph(program, executionPlan);

        // Graph properties
        this.name = program.name || '';
        this.inputs = [];
        this.outputs = [];
        this.nodes = [];

        for (let i = 0; i < executionPlan.inputsLength?.(); i++) {
            const input = executionPlan?.inputs(i);
            this.inputs.push(new sentis.Argument(`input_${i}`, [input]));
        }

        for (let i = 0; i < executionPlan.outputsLength?.(); i++) {
            const output = executionPlan.outputs?.(i);
            this.outputs.push(new sentis.Argument(`output_${i}`, [output]));
        }

        for (let i = 0; i < executionPlan.chainsLength?.(); i++) {
            const chain = executionPlan.chains?.(i);
            this.nodes.push(new sentis.Node(metadata, chain));

            const isFirstOrLast = (i === 0 || i === executionPlan.chainsLength?.() - 1)
            if (isFirstOrLast) {
                console.log(chain);
            }
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
    constructor(metadata, chain, /*values, valueMap,*/ executionPlan) {
        this.type = metadata.type ? metadata.type(chain.type) : { name: chain.type || 'Unknown' };
        this.inputs = [];
        this.outputs = [];
        this.attributes = [];

        

        // where do we get Builder from?
        //   static addInstrArgsType(builder:flatbuffers.Builder, instrArgsType:InstructionArguments) {
        //     builder.addFieldInt8(0, instrArgsType, InstructionArguments.NONE);
        //   }
          
        //   static addInstrArgs(builder:flatbuffers.Builder, instrArgsOffset:flatbuffers.Offset) {
        //     builder.addFieldOffset(1, instrArgsOffset, 0);
        //   }

        console.log(
            'Chain Instructions',
            // chain.instructions(0).instrArgs(executionPlan),
            // chain.instructions(0).instrArgsType(executionPlan)
        );

        for (let j = 0; j < chain.inputsLength?.(); j++) {
            const inputIndex = chain.inputs?.(j);
            this.inputs.push(inputIndex);


            // if (chain.Instructions(0).Value.InstrArgsType == SentisFlatBuffer.InstructionArguments.NONE) {
            //     continue;
            // }

            // const kernel = chain.instructions(0).Value.InstrArgsAsKernelCall();
            // const kernelName = executionPlan.Operators(kernel.OpIndex).Value.Name;
            // console.log("kernel", kernel, kernelName);
        }

        // this.type = chain.instructions?.(0).instrArgsType() || "";
        // console.log(this.type);

        // // Map inputs from the chain
        // if (chain.inputs?.()) {
        //     for (let i = 0; i < chain.inputs?.length; i++) {
        //         const inputId = chain.inputs[i];
        //         const inputValue = values[inputId];
        //         const argument = new sentis.Argument(`input_${i}`, [valueMap.map(inputValue.name, inputValue.val)]);
        //         this.inputs.push(argument);
        //     }
        // }

        // // Map outputs from the chain
        // if (chain.outputs?.()) {
        //     for (let i = 0; i < chain.outputs?.length; i++) {
        //         const outputId = chain.outputs[i];
        //         const outputValue = values[outputId];
        //         const argument = new sentis.Argument(`output_${i}`, [valueMap.map(outputValue.name, outputValue.val)]);
        //         this.outputs.push(argument);
        //     }
        // }

        // // Process chain instructions as attributes
        // if (chain.instructions()) {
        //     for (const instruction of chain.instructions()) {
        //         if (instruction.instr_args && instruction.instr_args.op_index !== undefined) {
        //             const operator = metadata.operators
        //                 ? metadata.operators[instruction.instr_args.op_index]
        //                 : { name: `op_${instruction.instr_args.op_index}` };

        //             const attribute = new sentis.Argument(
        //                 operator.name,
        //                 instruction.instr_args.args.map((argId) => valueMap.map(values[argId].name, values[argId].val))
        //             );
        //             this.attributes.push(attribute);
        //         }
        //     }
        // }
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
