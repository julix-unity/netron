
// Experimental

import { ByteBuffer } from './sentis-byte-buffer.js';
import { KernelMetadata } from './sentis-kernel-metadata.js';
import { SentisFlatBuffer } from './sentis-schema.mjs';
const { Program, Operator, KernelCall, Tensor: SchemaTensor,  EValue, ScalarType, EDim, Int, Byte, InstructionArguments, KernelTypes } = SentisFlatBuffer;

export const logError = (...args) => {
    /* eslint-disable no-console */
    console.error(...args);
    /* eslint-enable no-console */
};
export const logInfo = (...args) => {
    /* eslint-disable no-console */
    console.info(...args);
    /* eslint-enable no-console */
};
export const logWarning = (...args) => {
    /* eslint-disable no-console */
    console.warn(...args);
    /* eslint-enable no-console */
};

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

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

const scalarTypeMap = {
    [ScalarType.FLOAT]: 'float32',
    [ScalarType.INT]: 'int32',
    [ScalarType.BYTE]: 'uint8',
    [ScalarType.SHORT]: 'int16',
};

sentis.TensorShape = class {
    constructor(dimensions) {
        this.dimensions = dimensions;
    }

    toString() {
        return `[${this.dimensions.join(',')}]`;
    }
}
sentis.TensorType = class {
    constructor(scalarType, shape) {
        this.dataType = scalarTypeMap[scalarType];
        if (!this.dataType) {
            throw new Error(`Unknown scalar type: ${scalarType}`);
        }
        this.shape = new sentis.TensorShape(shape);
    }

    toString() {
        return `${this.dataType}${this.shape}`;
    }
}

const logTensor = (tensor) => {
    if (!tensor) {
        logError("Invalid tensor object.");
        return {};
    }

    return {
        bufferIndex: tensor.constantBufferIdx(),
        scalarType: tensor.scalarType(),
        lengthByte: tensor.lengthByte(),
        fixedSizes: tensor.fixedSizesArray(), // Array of fixed sizes
        storageOffset: tensor.storageOffset(),
        shapeDynamism: tensor.shapeDynamism(),
        dynamicSizesLength: tensor.dynamicSizesLength(), // Number of dynamic sizes
        dynamicSizes: tensor.dynamicSizesArray?.(), // Array of dynamic sizes if implemented
        bbPosition: tensor.bb_pos, // Position in the ByteBuffer
        bbLength: tensor.bb.bytes_?.length, // Length of the ByteBuffer
    };
};
sentis.Tensor = class {
    constructor(buffer, scalarType, shape) {
        this.buffer = buffer; // Raw byte buffer
        if (!buffer || scalarType === undefined || shape === undefined) {
            logError('Tensor constructed with missing arguments:', { buffer, scalarType, shape });
        }
        
        logInfo("logging Tensor", { buffer, scalarType, shape });

        this.buffer = buffer || new ArrayBuffer(0); // Fallback to an empty buffer
        this.type = new sentis.TensorType(scalarType || ScalarType.FLOAT, shape || []);
    }

    getData() {
        const { dataType } = this.type;
        const typedArrayMap = {
            float32: Float32Array,
            int32: Int32Array,
            uint8: Uint8Array,
            int16: Int16Array,
        };
        const TypedArrayConstructor = typedArrayMap[dataType];
        if (!TypedArrayConstructor) {
            throw new Error(`Unsupported data type: ${dataType}`);
        }
        return new TypedArrayConstructor(this.buffer);
    }

    toString() {
        return `Tensor<${this.type.toString()}>`;
    }
}

const scalarType = ScalarType.FLOAT;
const shape = [1, 224, 224, 3]; // Example tensor shape
const rawBuffer = new ArrayBuffer(1 * 224 * 224 * 3 * 4); // Allocate buffer for Float32 data

const tensor = new sentis.Tensor(rawBuffer, scalarType, shape);
logInfo(tensor.toString()); // Tensor<float32[1,224,224,3]>


function determineCategory(tensor) {
    return 'Intermediate';
    if (tensor.constantBufferIdx() !== 0) {
        return 'Initializer';
    } else if (tensor.shapeDynamism() === 0) { // Static tensors with fixed shape
        return 'Input';
    }
    return 'Intermediate'; // Default to intermediate if no other category matches
}

function extractTensor(tensor) {

    const mockTensor = {
        mock: true,
        name: 'mock_tensor',
        category: 'Intermediate', // determineCategory(tensor),
        type: 'float32',
        shape: tensor.fixedSizesArray() || [128, 8],
        value: [
            [0.1, 0.2, 0.3],
            [0.4, 0.5, 0.6],
        ],
    };
    console.log(mockTensor);
    return mockTensor;

    const bufferIndex = tensor.constantBufferIdx();
    const scalarType = tensor.scalarType();
    const shape = tensor.fixedSizesArray();
    const offset2 = tensor.bb.__offset(tensor.bb_pos, 8);

    console.log(tensor, { bufferIndex, scalarType, shape, offset2 });
    logTensor(tensor);

    if (bufferIndex === undefined || scalarType === undefined || !shape) {
        logError('Incomplete tensor data:', { bufferIndex, scalarType, shape });
        return null;
    }

    // Determine the offset in the byte buffer
    const offset = bufferIndex; // Replace with the actual calculation if bufferIndex is relative
    const length = tensor.lengthByte(); // Total bytes to read for the tensor data
    const rawBuffer = tensor.bb.bytes().slice(offset, offset + length);

    return {
        buffer: rawBuffer, // Raw data
        scalarType,
        shape,
    };
}

export const extractValueByType = (value, type) => {
    const valType = value.valType();
    const expectedValType = KernelTypes[type];
    if (valType !== expectedValType) {
        logWarning(`Type mismatch: Expected ${type}, but got ${KernelTypes[valType]}`);
        return null;
    }

    const val = value.val(new SentisFlatBuffer[type]());
    switch (type) {
        case 'Int':
            return val.intVal();
        case 'Bool':
            return val.boolVal();
        case 'Float':
            return val.floatVal();
        case 'IntList':
            return val.itemsArray();
        case 'FloatList':
            return val.itemsArray();
        case 'BoolList':
            // Since BoolList stores booleans as Int8Array, convert to array of booleans
            return Array.from(val.itemsArray()).map((item) => Boolean(item));
        case 'String':
            return val.stringVal();
        // case 'Tensor':
        //     return extractTensor(val);

        default:
            logWarning(`Unsupported type: ${type}`);
            return {};
    }
};

function processIO(executionPlan, type = 'input', chain = null) {
    const context = chain || executionPlan;

    const lengthFuncName = `${type}sLength`;
    const accessorFuncName = `${type}s`;

    if (typeof context[lengthFuncName] !== 'function' || typeof context[accessorFuncName] !== 'function') {
        throw new Error(`Invalid context: Missing methods '${lengthFuncName}' or '${accessorFuncName}'.`);
    }

    const length = context[lengthFuncName]();
    const accessor = context[accessorFuncName].bind(context);

    const results = [];
    for (let i = 0; i < length; i++) {
        const index = accessor(i);
        if (index !== null && index !== undefined) {
            // Retrieve the EValue from the ExecutionPlan
            const value = executionPlan.values(index, new EValue());
            if (value) {
                const valTypeEnum = value.valType();
                const valTypeStr = KernelTypes[valTypeEnum] || `UnknownType(${valTypeEnum})`;

                // Extract the actual value
                const extractedValue = extractValueByType(value, valTypeStr);
                // console.log(context.constructor.name, value, value.val(new Tensor()), valTypeStr, extractedValue);

                const descriptiveLabel = `${valTypeStr}_#i${i}_#idx${index}`;

                // Create a new Argument with the label and value
                const result = new sentis.Argument(descriptiveLabel, [extractedValue]);
                results.push(result);
                console.log(result.value[0]);
            } else {
                logWarning(`No value found in execution plan for index ${index}`);
            }
        } else {
            logWarning(`Invalid index at position ${i}: ${index}`);
        }
    }
    return results;
}

// function processExecutinoPlanIO(executionPlan, type = 'input') {
//     // context is either executionPlan or chain, type is input or output
//     const results = [];
//     const lengthFunc = executionPlan[`${type}sLength`]?.bind(executionPlan);
//     const accessorFunc = executionPlan[`${type}s`]?.bind(executionPlan);
//     if (!lengthFunc || !accessorFunc) {
//         throw new Error(`Invalid context: Missing '${type}Length' or '${type}s' methods.`);
//     }

//     const length = lengthFunc();
//     for (let i = 0; i < length; i++) {
//         const index = accessorFunc(i);
//         console.log(index);
//         if (index !== null) {
//             const value = executionPlan.values(index, new EValue());
//             const valueType = value?.valType();

//             const descriptiveLabel = `${capitalizeFirstLetter(valueType)}_#i${i}_#idx${index}`;

//             // Add argument with all metadata
//             console.log(descriptiveLabel, value, value?.type, valueType);
//             const result = new sentis.Argument(descriptiveLabel, value, valueType);
//             results.push(result);
//         }
//     }
//     return results;
// }

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
        console.log('Hitting Model!');
        this.metadata = metadata || {};
        this.program = program;
        this.format = `Sentis v${program.version()}`;
        this.graphs = [new sentis.Graph(metadata, program)];
    }
};

sentis.Graph = class {
    constructor(metadata, program) {
        const executionPlan = program.executionPlan();
        // debugExecutionPlan(executionPlan);
        if (!executionPlan) {
            logError("No execution plan!");
            return;
        }

        // Graph properties
        this.name = program.name || '';
        this.inputs = processIO(executionPlan, 'input');
        this.outputs = processIO(executionPlan, 'output');
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

const getKernelCall = (chain) => {
    const instruction = chain.instructions(0); // currently always only one
    const instrType = instruction?.instrArgsType?.();
    if (instrType !== InstructionArguments.KernelCall) {
        if (instrType === InstructionArguments.NONE) {
            logInfo('NoOp', instrType);
        } else {
            logInfo(`Unknown Instruction: ${instrType}`);
        }
        return ({
            kernelCall: null,
            type: instrType === InstructionArguments.NONE ? 'NoOp' : instrType
        });
    }

    // kernelCall
    return {
        kernelCall: instruction.instrArgs(new KernelCall()),
        type: instrType
    };
};

const getOperatorName = (executionPlan, kernelCall) => {
    if (!executionPlan || !kernelCall) {
        logError("Tried to get operator name from invalid KernelCall");
        return null;
    }
    const opIndex = kernelCall.opIndex();
    const operator = executionPlan.operators(opIndex, new Operator());

    if (!operator) {
        logError(`Missing operator for opIndex ${opIndex}`);
        return null;
    }
    return operator.name();
};

const parseKernel = (operatorName, kernelCall, chain, executionPlan) => {
    const metadata = KernelMetadata[operatorName];
    if (!metadata) {
        logWarning(`Unsupported kernel: ${operatorName}`);
        return undefined;
    }

    const attributes = [];

    // Process inputs
    metadata.inputs.forEach(({ index, name, required }) => {
        const inputIndex = required ? chain.inputs(index) : chain.inputs(index);
        if (inputIndex !== undefined && inputIndex !== null) {
            attributes.push({ name, type: { name: "function" }, value: `Input ${inputIndex}` });
        } else if (required) {
            logError(`Missing required input: ${name}`);
        }
    });

    // Process arguments
    metadata.args.forEach(({ index, name, type }) => {
        const argIndex = kernelCall.args(index);
        const value = executionPlan.values(argIndex, new EValue());

        if (value) {
            const argValue = extractValueByType(value, type);
            attributes.push(new sentis.Argument(name, [argValue]));
        } else {
            logWarning(`Missing argument: ${name}`);
        }
    });

    return attributes;
};

sentis.Node = class {
    constructor(metadata, chain, executionPlan) {
        this.inputs = processIO(executionPlan, 'input', chain);
        this.outputs = processIO(executionPlan, 'output', chain);
        this.attributes = [];

        const { kernelCall, type } = getKernelCall(chain);

        // Node name
        const operatorName = kernelCall && getOperatorName(executionPlan, kernelCall);
        this.type = { name: operatorName ?? type };
        this.custom = { name: 'lolcat' };

        // Node attributes
        const parsedAttributes = kernelCall && operatorName && (
            parseKernel(operatorName, kernelCall, chain, executionPlan)
        );

        if (parsedAttributes) {
            this.attributes.push(...parsedAttributes);
        } else {
            logWarning(`Could not parse kernel: ${operatorName}`);
        }

        console.log(operatorName, this.inputs, this.outputs, this.attributes)
    }
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
