
// Experimental

import { ByteBuffer } from './sentis-byte-buffer.js';
import { KernelMetadata } from './sentis-kernel-metadata.js';
import { NODE_CATEGORIES } from "./grapher.js";
import { SentisFlatBuffer } from './sentis-schema.mjs';
const { Program, Operator, KernelCall, Tensor, EValue, EDim, Int, Byte, ScalarType, InstructionArguments, KernelTypes } = SentisFlatBuffer;

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

const sentis = {
    executionPlan: undefined // defined in Graph, use only after it's defined, i.e. Node, etc.
};

const listThing = (thing, accessorFunc = undefined) => {
    const length = sentis.executionPlan[`${thing}Length`]?.() || 0;
    const list = [];
    for (let i = 0; i < length; i++) {
        const accessedThing = accessorFunc ? sentis.executionPlan[thing]?.(i)?.[accessorFunc]?.() : sentis.executionPlan[thing]?.(i);
        list.push(accessedThing);
    }
    return list.join(', ');
};

const listOperators = () => listThing('operators', 'name');
const listInputsNames = () => listThing('inputsName');
const listOutputsNames = () => listThing('outputsName');

const debugExecutionPlan = () => {
    const optionalEncoding = undefined;
    const index = 0;
    const obj = undefined;
    const spacer = {'===': ''}; // separate derived from actual API

    // Interactive inspection in DevTools
    const logObject = {
        '===': 'Note: whenever an index is required, like the singular of a thing, 0 is used',
        executionPlan: {
            ...spacer,
            name: sentis.executionPlan.name?.(optionalEncoding),
            values: sentis.executionPlan.values?.(index, obj),
            valuesLength: sentis.executionPlan.valuesLength?.(),
        },
        inputs: {
            '-derivedInputsNames': listInputsNames(),
            ...spacer,
            inputs: sentis.executionPlan.inputs?.(index),
            inputsLength: sentis.executionPlan.inputsLength?.(),
            inputsArray: sentis.executionPlan.inputsArray?.(),
            inputsName: sentis.executionPlan.inputsName?.(index, optionalEncoding),
            inputsNameLength: sentis.executionPlan.inputsNameLength?.(),
        },
        outputs: {
            '-derivedInputsNames': listOutputsNames(),
            ...spacer,
            outputs: sentis.executionPlan.outputs?.(index),
            outputsLength: sentis.executionPlan.outputsLength?.(),
            outputsArray: sentis.executionPlan.outputsArray?.(),
            outputsName: sentis.executionPlan.outputsName?.(index, optionalEncoding),
            outputsNameLength: sentis.executionPlan.outputsNameLength?.(),
        },
        chains: {
            '-firstChain': {
                raw: sentis.executionPlan.chains?.(index, obj),
                inputsArray: sentis.executionPlan.chains?.(index, obj)?.inputsArray(),
                '-firstInstruction.instrArgs.operator': sentis.executionPlan.operators(
                    sentis.executionPlan.chains?.(index, obj)?.instructions(0).instrArgs(new KernelCall()).opIndex()
                ).name()
            },
            ...spacer,
            chains: sentis.executionPlan.chains?.(index, obj),
            chainsLength: sentis.executionPlan.chainsLength?.(),
        },
        operators: {
            '-derivedOperators': listOperators(),
            ...spacer,
            operators: sentis.executionPlan.operators?.(index),
            length: sentis.executionPlan.operatorsLength?.(),
            backendPartitioning: sentis.executionPlan.backendPartitioning?.(obj),
        },
        rawExecutionPlan: sentis.executionPlan, // Add the raw object for reference if needed
    };
    logInfo('ExecutionPlan Debugging', logObject);
};

const getInt32 = (buffer) => {
    return buffer[0] | (buffer[1] << 8) | (buffer[2] << 16) | (buffer[3] << 24);
};

const parseTensor = (val) => {
    console.log('logging Tensor', val);
    return null;
};

const extractValueByType = (value, type) => {
    const valType = value.valType();
    const expectedValType = KernelTypes[type];
    if (valType !== expectedValType) {
        logWarning(`Type mismatch: Expected ${type}, but got ${KernelTypes[valType]}`);
        return null;
    }
    const val = value.val(new SentisFlatBuffer[type]()); // Get the actual value object based on the type
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
        case 'Tensor':
            return parseTensor(val);
        default:
            logWarning(`Unsupported type: ${type}`);
            return null;
    }
};

const parseKernel = (kernelName, kernelCall, chain) => {
    const metadata = KernelMetadata[kernelName];
    if (!metadata) {
        logWarning(`Unsupported kernel: ${kernelName}`);
        return undefined;
    }

    const attributes = [];

    // Process inputs
    metadata.inputs.forEach(({ index, name, required }) => {
        const inputIndex = required ? chain.inputs(index) : chain.inputs(index);
        if (inputIndex !== undefined && inputIndex !== null) {
            // const inputValue
            attributes.push({ name, value: `Kernel MetaData Input ${inputIndex}` });
        } else if (required) {
            logError(`Missing required input: ${name}`);
        }
    });

    // Process arguments
    metadata.args.forEach(({ index, name, type }) => {
        const argIndex = kernelCall.args(index);
        const value = sentis.executionPlan.values(argIndex, new EValue());
        if (value) {
            const argValue = extractValueByType(value, type);
            attributes.push({ name, value: argValue });
        } else {
            logWarning(`Missing argument: ${name}`);
        }
    });

    return attributes;
};

function processIO(type = 'input', chain = null) {

    const context = chain || sentis.executionPlan;
    const accessorFuncName = `${type}s`;
    const lengthFuncName = `${type}sLength`;
    const nameFuncName = `${type}sName`;

    if (
        typeof context[lengthFuncName] !== 'function' ||
        typeof context[accessorFuncName] !== 'function' ||
        typeof sentis.executionPlan[nameFuncName] !== 'function'
    ) {
        throw new Error(`Invalid context: Missing methods '${lengthFuncName}', '${accessorFuncName}', or '${nameFuncName}'.`);
    }

    const lengthFunc = context[lengthFuncName].bind(context);
    const accessorFunc = context[accessorFuncName].bind(context);

    const length = lengthFunc();
    const result = [];
    document.val = {};
    for (let i = 0; i < length; i++) {
        const index = accessorFunc(i);
        const eValue = sentis.executionPlan.values(index, new EValue());
        const valType = eValue?.valType();
        const valTypeStr = KernelTypes[valType] || "Unknown";

        const name = sentis.executionPlan[nameFuncName](i, new TextDecoder('utf-8'));
        const readableLabel = name || `${type}_${valTypeStr}_${index}`;

        if (valTypeStr === 'Tensor') {
            const val = eValue.val(new Tensor());
            const valMeta = {
                tensor: val,
                name,
                constantBufferIdx: val.constantBufferIdx(),
                dynamicSizesLength: val.dynamicSizesLength(),
                fixedSizesArray: val.fixedSizesArray(),
                fixedSizesLength: val.fixedSizesLength(),
                lengthByte: val.lengthByte(),
                scalarType: val.scalarType(),
                shapeDynamism: val.shapeDynamism(),
                storageOffset: val.storageOffset(),
                //val.dynamicSizes(index, obj),
                // val.fixedSizes(index),
            };
            logInfo(valMeta);

            const tensor = val;
            if (tensor.storageOffset() && tensor.fixedSizesArray()) {
                const shape = Array.from(tensor.fixedSizesArray());
                const totalElements = shape.reduce((a, b) => a * b, 1);
                const offset = tensor.storageOffset();
                const scalarTypeStr = ScalarType[tensor.scalarType()]; // INT, FLOAT, etc.
                const data = [];

                const parseValByType = {
                    INT: () => tensor.bb.readInt32(offset + i * 4), // int32
                    FLOAT: () => tensor.bb.readFloat32(offset + i * 4), // float32
                    BYTE: () => null, // don't know how to read it yet,
                    SHORT: () => null, // don't know how to read it yet,
                }

                for (let i = 0; i < totalElements; i++) {
                    const value = parseValByType[scalarTypeStr]();
                    if (value === null) {
                        logWarning(`Didn't have a value parsed for Tensor with scalarType: ${scalarTypeStr}`);
                    }
                    data.push(value);
                }
                logInfo('Decoded Tensor Data:', data);
            }
        }
        result.push(new sentis.Argument(readableLabel, [index]));
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
        const bb = new ByteBuffer(rawBytes);

        // Parse the program using FlatBuffers
        const program = Program.getSizePrefixedRootAsProgram(bb);
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
        // this here sets executionPlan for the entire sentis file
        sentis.executionPlan = program.executionPlan();
        debugExecutionPlan();
        if (!sentis.executionPlan) {
            logError("No execution plan!");
            return;
        }

        // Graph properties
        this.name = program.name || '';
        this.inputs = processIO('input');
        this.outputs = processIO('output');
        this.nodes = [];

        for (let i = 0; i < sentis.executionPlan.chainsLength?.(); i++) {
            const chain = sentis.executionPlan.chains?.(i);
            this.nodes.push(new sentis.Node(metadata, chain));
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

sentis.Node = class {
    constructor(metadata, chain) {
        this.type = { name: "Default", type: "Unknown", category: NODE_CATEGORIES.Custom }; // Fallback
        this.inputs = processIO('input', chain);
        this.outputs = processIO('output', chain);
        this.attributes = [];

        const kernelCalls = this.parseInstructions(chain);

        kernelCalls.forEach((kernelCall) => {

            const kernelName = this.nameKernel(kernelCall);
            const category = this.categorizeKernel(kernelName);

            console.log(`Now debugging: ${kernelName} (${category})`);

            // Update Node's type
            this.type = { name: kernelName, type: kernelName, category };

            // Use parseKernel to get attributes
            const parsedAttributes = parseKernel(kernelName, kernelCall, chain);

            if (parsedAttributes) {
                this.attributes.push(...parsedAttributes);
            } else {
                logWarning(`Could not parse attributes for ${kernelName}`);
            }
        });
    }

    parseInstructions = (chain) => {
        // for each inscruction parse attributes via operator name
        const kernelCalls = [];
        for (let i = 0; i < chain.instructionsLength(); i++) {
            const instruction = chain.instructions(i);
            if (!instruction) {
                continue;
            }

            const instrType = instruction.instrArgsType();
            const instrTypeStr = InstructionArguments[instrType];
            if (instrTypeStr === "NONE") { // does happen
                this.type.name = "No Op";
                continue;
            }

            if (instrTypeStr !== "KernelCall") { // this should never happen
                logError(`Unknown instruction type: ${instrType}`);
                continue;
            }

            const kernelCall = instruction.instrArgs(new KernelCall());

            kernelCalls.push(kernelCall);
            continue;

        }
        return kernelCalls;
    };
    nameKernel = (kernelCall) => {
        const operatorIndex = kernelCall.opIndex();
        const operator = sentis.executionPlan.operators(operatorIndex, new Operator());
        return operator.name();
    };
    categorizeKernel = (kernelName) => {
        const kernelCategory = KernelMetadata[kernelName]?.category;
        const category = NODE_CATEGORIES[kernelCategory] ?? NODE_CATEGORIES.Custom;
        return category;
    };
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
