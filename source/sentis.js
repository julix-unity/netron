
// Experimental

import { ByteBuffer } from './sentis-byte-buffer.js';
import { KernelMetadata } from './sentis-kernel-metadata.js';
import { SentisFlatBuffer } from './sentis-schema.mjs';
const { Program, Operator, KernelCall, Tensor, EValue, EDim, Int, Byte, InstructionArguments, KernelTypes } = SentisFlatBuffer;

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
        default:
            logWarning(`Unsupported type: ${type}`);
            return null;
    }
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
            attributes.push({ name, value: `Input ${inputIndex}` });
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
            attributes.push({ name, value: argValue });
        } else {
            logWarning(`Missing argument: ${name}`);
        }
    });

    return attributes;
};

function processIO(executionPlan, type = 'input', chain = null) {

    const context = chain || executionPlan;
    const lengthFuncName = `${type}sLength`;
    const accessorFuncName = `${type}s`;

    if (typeof context[lengthFuncName] !== 'function' || typeof context[accessorFuncName] !== 'function') {
        throw new Error(`In processIO - Invalid context: Missing methods '${lengthFuncName}' or '${accessorFuncName}'.`);
    }

    const lengthFunc = context[lengthFuncName].bind(context);
    const accessorFunc = context[accessorFuncName].bind(context);

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

sentis.Node = class {
    constructor(metadata, chain, executionPlan) {
        this.type = { name: "Unknown" }; // Placeholder type
        this.inputs = processIO(executionPlan, 'input', chain);
        this.outputs = processIO(executionPlan, 'output', chain);
        this.attributes = [];

        for (let i = 0; i < chain.instructionsLength(); i++) {
            const instruction = chain.instructions(i);
            if (!instruction) {
                continue;
            }

            const instrType = instruction.instrArgsType();
            if (instrType === InstructionArguments.NONE) {
                this.attributes.push({ name: 'NoOp' });
                continue;
            }

            if (instrType !== InstructionArguments.KernelCall) {
                this.attributes.push({ name: 'UnknownInstruction', type: instrType });
                continue;
            }

            // Extract KernelCall arguments
            const kernelCall = instruction.instrArgs(new KernelCall());
            const opIndex = kernelCall.opIndex();
            const operator = executionPlan.operators(opIndex, new Operator());

            if (!operator) {
                logError(`Missing operator for opIndex ${opIndex}`);
                this.attributes.push({ name: 'KernelCall', value: 'Unknown Kernel', opIndex });
                continue;
            }

            const operatorName = operator.name();

            // Update node type
            this.type = { name: operatorName ?? 'Unnamed Kernel' };

            // Use parseKernel to get attributes
            const parsedAttributes = parseKernel(operatorName, kernelCall, chain, executionPlan);

            if (parsedAttributes) {
                this.attributes.push(...parsedAttributes);
            } else {
                logWarning(`Could not parse kernel: ${operatorName}`);
            }
        }
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
