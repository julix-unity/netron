
// Experimental

const sentis = {};

sentis.ModelFactory = class {
    match(context) {
        const stream = context.stream;

        // Early return if the stream is invalid or too short
        if (!stream || stream.length <= 12) {
            return;
        }

        const buffer = stream.peek(12);

        // Check for the "STU1" identifier
        const identifier = String.fromCharCode(...buffer.slice(4, 8));
        if (identifier !== "STU1") {
            return;
        }

        // Read the root offset (first 4 bytes, little-endian)
        const rootOffset = buffer[0] | (buffer[1] << 8) | (buffer[2] << 16) | (buffer[3] << 24);

        // Ensure the root offset is valid (within file bounds)
        if (rootOffset >= stream.length) {
            return;
        }

        // Set the context type
        context.type = "sentis";
    }

    async open(context) {
        const metadata = sentis.Metadata.open();
        const reader = context.read('binary');
        const program = new sentis.Program(reader);
        return new sentis.Model(metadata, program);
    }
};

sentis.Model = class {
    constructor(metadata, program) {
        this.metadata = metadata || {};
        this.program = program;

        // Set a format string for display
        this.format = `Sentis v${program.version}`;

        // Extract and store graphs (e.g., execution plans)
        this.graphs = [new sentis.Graph(metadata, program.execution_plan)];
    }
};

sentis.Graph = class {
    constructor(metadata, program) {
        // Graph properties
        this.name = program.execution_plan.name || '';
        this.inputs = [];
        this.outputs = [];
        this.nodes = []; // List of computational nodes.

        // A map to manage values, ensuring uniqueness
        const values = new Map();
        values.map = (name, type, initializer) => {
            if (!values.has(name)) {
                values.set(name, new sentis.Value(name, type, initializer));
            }
            return values.get(name);
        };

        const executionPlan = program.execution_plan;

        // Handle inputs from the execution plan
        for (let i = 0; i < executionPlan.inputs.length; i++) {
            const inputId = executionPlan.inputs[i];
            const inputName = executionPlan.inputs_name[i];
            const eValue = executionPlan.values[inputId];
            const argument = new sentis.Argument(inputName, [values.map(inputName, eValue.val)]);
            this.inputs.push(argument);
        }

        // Handle outputs from the execution plan
        for (let i = 0; i < executionPlan.outputs.length; i++) {
            const outputId = executionPlan.outputs[i];
            const outputName = executionPlan.outputs_name[i];
            const eValue = executionPlan.values[outputId];
            const argument = new sentis.Argument(outputName, [values.map(outputName, eValue.val)]);
            this.outputs.push(argument);
        }

        // Handle nodes (chains of instructions)
        for (const chain of executionPlan.chains) {
            const node = new sentis.Node(metadata, chain, executionPlan.values, values);
            this.nodes.push(node);
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
    constructor(metadata, chain, values, valueMap) {
        this.name = chain.name || '';
        this.type = metadata.type ? metadata.type(chain.type) : { name: chain.type || 'Unknown' };
        this.inputs = [];
        this.outputs = [];
        this.attributes = [];

        // Map inputs from the chain
        if (chain.inputs) {
            for (let i = 0; i < chain.inputs.length; i++) {
                const inputId = chain.inputs[i];
                const inputValue = values[inputId];
                const argument = new sentis.Argument(`input_${i}`, [valueMap.map(inputValue.name, inputValue.val)]);
                this.inputs.push(argument);
            }
        }

        // Map outputs from the chain
        if (chain.outputs) {
            for (let i = 0; i < chain.outputs.length; i++) {
                const outputId = chain.outputs[i];
                const outputValue = values[outputId];
                const argument = new sentis.Argument(`output_${i}`, [valueMap.map(outputValue.name, outputValue.val)]);
                this.outputs.push(argument);
            }
        }

        // Process chain instructions as attributes
        if (chain.instructions) {
            for (const instruction of chain.instructions) {
                if (instruction.instr_args && instruction.instr_args.op_index !== undefined) {
                    const operator = metadata.operators
                        ? metadata.operators[instruction.instr_args.op_index]
                        : { name: `op_${instruction.instr_args.op_index}` };

                    const attribute = new sentis.Argument(
                        operator.name,
                        instruction.instr_args.args.map((argId) => valueMap.map(values[argId].name, values[argId].val))
                    );
                    this.attributes.push(attribute);
                }
            }
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
                this.values = buffer.storage.slice(0, tensor.length_byte);
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
        const fixedPart = this.fixed.length ? `[${this.fixed.join(',')}]` : '';
        const dynamicPart = this.dynamic.length ? `[${this.dynamic.join(',')}]` : '';
        return fixedPart + dynamicPart;
    }
};

sentis.NNModel = class {
    constructor(reader) {
        // Read the schema version
        this.version = reader.uint32();

        // Read execution plan
        this.executionPlan = this._readExecutionPlan(reader);

        // Read constant buffers (if any)
        this.buffers = this._readBuffers(reader);

        // Read data segments (if any)
        this.dataSegments = this._readDataSegments(reader);
    }

    _readExecutionPlan(reader) {
        const executionPlan = {};

        // Read the name of the execution plan
        executionPlan.name = reader.string();

        // Read values
        executionPlan.values = this._readValues(reader);

        // Read inputs
        executionPlan.inputs = reader.uint32Array();
        executionPlan.inputs_name = reader.stringArray();

        // Read outputs
        executionPlan.outputs = reader.uint32Array();
        executionPlan.outputs_name = reader.stringArray();

        // Read chains
        executionPlan.chains = this._readChains(reader);

        // Read operators
        executionPlan.operators = this._readOperators(reader);

        // Read backend partitioning
        executionPlan.backend_partitioning = this._readBackendPartitioning(reader);

        return executionPlan;
    }

    _readValues(reader) {
        const length = reader.uint32();
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push(new sentis.Value(reader));
        }
        return values;
    }

    _readChains(reader) {
        const length = reader.uint32();
        const chains = [];
        for (let i = 0; i < length; i++) {
            chains.push(new sentis.Chain(reader));
        }
        return chains;
    }

    _readOperators(reader) {
        const length = reader.uint32();
        const operators = [];
        for (let i = 0; i < length; i++) {
            operators.push(reader.string());
        }
        return operators;
    }

    _readBackendPartitioning(reader) {
        return {
            chains: reader.uint32Array(),
            backend: reader.uint8(),
        };
    }

    _readBuffers(reader) {
        const length = reader.uint32();
        const buffers = [];
        for (let i = 0; i < length; i++) {
            buffers.push(new sentis.Buffer(reader));
        }
        return buffers;
    }

    _readDataSegments(reader) {
        const length = reader.uint32();
        const segments = [];
        for (let i = 0; i < length; i++) {
            segments.push({
                offset: reader.uint64(),
                size: reader.uint64(),
            });
        }
        return segments;
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

sentis.BinaryReader = class {

    constructor(reader) {
        this._reader = reader;
    }

    get position() {
        return this._reader.position;
    }

    seek(position) {
        this._reader.seek(position);
    }

    skip(offset) {
        this._reader.skip(offset);
    }

    read(length) {
        return this._reader.read(length);
    }

    byte() {
        return this._reader.byte();
    }

    int32() {
        return this._reader.int32();
    }

    int32s() {
        const values = new Array(this.int32());
        for (let i = 0; i < values.length; i++) {
            values[i] = this.int32();
        }
        return values;
    }

    int64() {
        return this._reader.int64();
    }

    float32() {
        return this._reader.float32();
    }

    string() {
        let content = '';
        const size = this.int32();
        for (let i = 0; i < size; i++) {
            const c = this.byte();
            content += String.fromCharCode(c);
        }
        return content;
    }

    strings() {
        const values = [];
        const length = this.int32();
        for (let i = 0; i < length; i++) {
            values.push(this.string());
        }
        return values;
    }

    shape() {
        return this.int32s();
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
            this._types.set(id, { name: id.toString() });
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
