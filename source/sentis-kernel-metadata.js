import { NODE_CATEGORIES } from "./grapher.js";

export const KernelMetadata = {
    Reshape: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
            { index: 1, name: "shape", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "allowZero", type: "Bool" },
        ],
    },
    Conv: {
        category: NODE_CATEGORIES.Layer,
        inputs: [
            { index: 0, name: "input", required: true },
            { index: 1, name: "weights", required: true },
            { index: 2, name: "bias", required: false },
        ],
        outputs: [],
        args: [
            { index: 0, name: "autoPad", type: "Int" },
            { index: 1, name: "dilations", type: "IntList" },
            { index: 2, name: "group", type: "Int" },
            { index: 3, name: "pads", type: "IntList" },
            { index: 4, name: "strides", type: "IntList" },
            { index: 5, name: "kernelShape", type: "IntList" },
            { index: 6, name: "fusedactivation", type: "Int" },
        ],
    },
    MaxPool: {
        category: NODE_CATEGORIES.Pool,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "kernelShape", type: "IntList" },
            { index: 1, name: "strides", type: "IntList" },
            { index: 2, name: "pads", type: "IntList" },
            { index: 3, name: "autoPad", type: "Int" },
        ],
    },
    Celu: {
        category: NODE_CATEGORIES.Activation,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "alpha", type: "Float" },
        ],
    },
    Elu: {
        category: NODE_CATEGORIES.Activation,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "alpha", type: "Float" },
        ],
    },
    Gelu: {
        category: NODE_CATEGORIES.Activation,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    GeluFast: {
        category: NODE_CATEGORIES.Activation,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Erf: {
        category: NODE_CATEGORIES.Activation,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Hardmax: {
        category: NODE_CATEGORIES.Activation,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "axis", type: "Int" },
        ],
    },
    HardSigmoid: {
        category: NODE_CATEGORIES.Activation,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "alpha", type: "Float" },
            { index: 1, name: "beta", type: "Float" },
        ],
    },
    HardSwish: {
        category: NODE_CATEGORIES.Activation,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    LeakyRelu: {
        category: NODE_CATEGORIES.Activation,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "alpha", type: "Float" },
        ],
    },
    PRelu: {
        category: NODE_CATEGORIES.Activation,
        inputs: [
            { index: 0, name: "input", required: true },
            { index: 1, name: "slope", required: true },
        ],
        outputs: [],
        args: [],
    },
    Relu: {
        category: NODE_CATEGORIES.Activation,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Relu6: {
        category: NODE_CATEGORIES.Activation,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Selu: {
        category: NODE_CATEGORIES.Activation,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "alpha", type: "Float" },
            { index: 1, name: "gamma", type: "Float" },
        ],
    },
    Sigmoid: {
        category: NODE_CATEGORIES.Activation,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Softplus: {
        category: NODE_CATEGORIES.Activation,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Softsign: {
        category: NODE_CATEGORIES.Activation,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Swish: {
        category: NODE_CATEGORIES.Activation,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Tanh: {
        category: NODE_CATEGORIES.Activation,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    ThresholdedRelu: {
        category: NODE_CATEGORIES.Activation,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "alpha", type: "Float" },
        ],
    },
    LogSoftmax: {
        category: NODE_CATEGORIES.Activation,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "axis", type: "Int" },
        ],
    },
    Softmax: {
        category: NODE_CATEGORIES.Activation,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "axis", type: "Int" },
        ],
    },
    ConvTranspose: {
        category: NODE_CATEGORIES.Layer,
        inputs: [
            { index: 0, name: "input", required: true },
            { index: 1, name: "weights", required: true },
            { index: 2, name: "bias", required: false },
        ],
        outputs: [],
        args: [
            { index: 0, name: "autoPad", type: "Int" },
            { index: 1, name: "outputPadding", type: "IntList" },
            { index: 2, name: "pads", type: "IntList" },
            { index: 3, name: "strides", type: "IntList" },
            { index: 4, name: "kernelShape", type: "IntList" },
            { index: 5, name: "fusedactivation", type: "Int" },
        ],
    },
    Shape: {
        category: NODE_CATEGORIES.Shape,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "start", type: "Int" },
            { index: 1, name: "end", type: "Int" },
        ],
    },
    Size: {
        category: NODE_CATEGORIES.Shape,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    ConstantOfShape: {
        category: NODE_CATEGORIES.Shape,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "dataType", type: "Int" },
            { index: 1, name: "cf", type: "Float" },
            { index: 2, name: "ci", type: "Int" },
        ],
    },
    OneHot: {
        category: NODE_CATEGORIES.Shape,
        inputs: [
            { index: 0, name: "indices", required: true },
            { index: 1, name: "depth", required: true },
            { index: 2, name: "values", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "axis", type: "Int" },
        ],
    },
    Range: {
        category: NODE_CATEGORIES.Shape,
        inputs: [
            { index: 0, name: "start", required: true },
            { index: 1, name: "limit", required: true },
            { index: 2, name: "delta", required: true },
        ],
        outputs: [],
        args: [],
    },
    ArgMax: {
        category: NODE_CATEGORIES.Shape,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "axis", type: "Int" },
            { index: 1, name: "keepdim", type: "Bool" },
            { index: 2, name: "selectLastIndex", type: "Bool" },
        ],
    },
    ArgMin: {
        category: NODE_CATEGORIES.Shape,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "axis", type: "Int" },
            { index: 1, name: "keepdim", type: "Bool" },
            { index: 2, name: "selectLastIndex", type: "Bool" },
        ],
    },
    Gather: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
            { index: 1, name: "indices", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "axis", type: "Int" },
        ],
    },
    GatherElements: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
            { index: 1, name: "indices", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "axis", type: "Int" },
        ],
    },
    GatherND: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
            { index: 1, name: "indices", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "batchDims", type: "Int" },
        ],
    },
    NonZero: {
        category: NODE_CATEGORIES.Shape,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    ScatterElements: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
            { index: 1, name: "indices", required: true },
            { index: 2, name: "updates", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "axis", type: "Int" },
            { index: 1, name: "reduction", type: "Int" },
        ],
    },
    ScatterND: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
            { index: 1, name: "indices", required: true },
            { index: 2, name: "updates", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "reduction", type: "Int" },
        ],
    },
    TopK: {
        category: NODE_CATEGORIES.Shape,
        inputs: [
            { index: 0, name: "input", required: true },
            { index: 1, name: "k", required: true },
        ],
        outputs: [
            { index: 0, name: "values", required: true },
            { index: 1, name: "indices", required: true },
        ],
        args: [
            { index: 0, name: "axis", type: "Int" },
            { index: 1, name: "largest", type: "Bool" },
            { index: 2, name: "sorted", type: "Bool" },
        ],
    },
    And: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "a", required: true },
            { index: 1, name: "b", required: true },
        ],
        outputs: [],
        args: [],
    },
    Compress: {
        category: NODE_CATEGORIES.Shape,
        inputs: [
            { index: 0, name: "input", required: true },
            { index: 1, name: "conditions", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "hasAxis", type: "Bool" },
            { index: 1, name: "axis", type: "Int" },
        ],
    },
    Equal: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "a", required: true },
            { index: 1, name: "b", required: true },
        ],
        outputs: [],
        args: [],
    },
    Greater: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "a", required: true },
            { index: 1, name: "b", required: true },
        ],
        outputs: [],
        args: [],
    },
    GreaterOrEqual: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "a", required: true },
            { index: 1, name: "b", required: true },
        ],
        outputs: [],
        args: [],
    },
    IsInf: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "detectNegative", type: "Bool" },
            { index: 1, name: "detectPositive", type: "Bool" },
        ],
    },
    IsNaN: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Less: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "a", required: true },
            { index: 1, name: "b", required: true },
        ],
        outputs: [],
        args: [],
    },
    LessOrEqual: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "a", required: true },
            { index: 1, name: "b", required: true },
        ],
        outputs: [],
        args: [],
    },
    Not: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Or: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "a", required: true },
            { index: 1, name: "b", required: true },
        ],
        outputs: [],
        args: [],
    },
    Xor: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "a", required: true },
            { index: 1, name: "b", required: true },
        ],
        outputs: [],
        args: [],
    },
    Where: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "condition", required: true },
            { index: 1, name: "x", required: true },
            { index: 2, name: "y", required: true },
        ],
        outputs: [],
        args: [],
    },
    Abs: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Add: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "a", required: true },
            { index: 1, name: "b", required: true },
        ],
        outputs: [],
        args: [],
    },
    Ceil: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Clip: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
            { index: 1, name: "min", required: false },
            { index: 2, name: "max", required: false },
        ],
        outputs: [],
        args: [],
    },
    CumSum: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
            { index: 1, name: "axis", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "reverse", type: "Bool" },
            { index: 1, name: "exclusive", type: "Bool" },
        ],
    },
    Dense: {
        category: NODE_CATEGORIES.Layer,
        inputs: [
            { index: 0, name: "input", required: true },
            { index: 1, name: "weights", required: true },
            { index: 2, name: "bias", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "fusedactivation", type: "Int" },
        ],
    },
    DenseBatched: {
        category: NODE_CATEGORIES.Layer,
        inputs: [
            { index: 0, name: "input", required: true },
            { index: 1, name: "weights", required: true },
            { index: 2, name: "bias", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "fusedactivation", type: "Int" },
        ],
    },
    Div: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "a", required: true },
            { index: 1, name: "b", required: true },
        ],
        outputs: [],
        args: [],
    },
    Einsum: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: "0..N-1", name: "inputs", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "equation", type: "String" },
        ],
    },
    Exp: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Floor: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Log: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    MatMul: {
        category: NODE_CATEGORIES.Layer,
        inputs: [
            { index: 0, name: "a", required: true },
            { index: 1, name: "b", required: true },
        ],
        outputs: [],
        args: [],
    },
    MatMul2D: {
        category: NODE_CATEGORIES.Layer,
        inputs: [
            { index: 0, name: "a", required: true },
            { index: 1, name: "b", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "transposeA", type: "Bool" },
            { index: 1, name: "transposeB", type: "Bool" },
        ],
    },
    Max: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "a", required: true },
            { index: 1, name: "b", required: true },
        ],
        outputs: [],
        args: [],
    },
    Min: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "a", required: true },
            { index: 1, name: "b", required: true },
        ],
        outputs: [],
        args: [],
    },
    Mod: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "a", required: true },
            { index: 1, name: "b", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "fmod", type: "Bool" },
        ],
    },
    Mul: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "a", required: true },
            { index: 1, name: "b", required: true },
        ],
        outputs: [],
        args: [],
    },
    Neg: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Pow: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "a", required: true },
            { index: 1, name: "b", required: true },
        ],
        outputs: [],
        args: [],
    },
    Reciprocal: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Round: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    ScalarMad: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "dataType", type: "Int" },
            { index: 1, name: "sFloat", type: "Float" },
            { index: 2, name: "bFloat", type: "Float" },
            { index: 3, name: "sInt", type: "Int" },
            { index: 4, name: "bInt", type: "Int" },
        ],
    },
    Shrink: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "bias", type: "Float" },
            { index: 1, name: "lamda", type: "Float" },
        ],
    },
    Sign: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Sqrt: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Square: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Sub: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "a", required: true },
            { index: 1, name: "b", required: true },
        ],
        outputs: [],
        args: [],
    },
    ScaleBias: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
            { index: 1, name: "scale", required: true },
            { index: 2, name: "bias", required: true },
        ],
        outputs: [],
        args: [],
    },
    InstanceNormalization: {
        category: NODE_CATEGORIES.Normalization,
        inputs: [
            { index: 0, name: "input", required: true },
            { index: 1, name: "scale", required: true },
            { index: 2, name: "bias", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "epsilon", type: "Float" },
        ],
    },
    LayerNormalization: {
        category: NODE_CATEGORIES.Normalization,
        inputs: [
            { index: 0, name: "input", required: true },
            { index: 1, name: "scale", required: true },
            { index: 2, name: "bias", required: false },
        ],
        outputs: [],
        args: [
            { index: 0, name: "epsilon", type: "Float" },
        ],
    },
    BatchNormalization: {
        category: NODE_CATEGORIES.Normalization,
        inputs: [
            { index: 0, name: "input", required: true },
            { index: 1, name: "scale", required: true },
            { index: 2, name: "bias", required: true },
            { index: 3, name: "mean", required: true },
            { index: 4, name: "variance", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "epsilon", type: "Float" },
        ],
    },
    LRN: {
        category: NODE_CATEGORIES.Normalization,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "alpha", type: "Float" },
            { index: 1, name: "beta", type: "Float" },
            { index: 2, name: "bias", type: "Float" },
            { index: 3, name: "count", type: "Int" },
        ],
    },
    NonMaxSuppression: {
        category: NODE_CATEGORIES.Shape,
        inputs: [
            { index: 0, name: "input", required: true },
            { index: 1, name: "scores", required: true },
            { index: 2, name: "maxOutputBoxesPerClass", required: false },
            { index: 3, name: "iouThreshold", required: false },
            { index: 4, name: "scoreThreshold", required: false },
        ],
        outputs: [],
        args: [
            { index: 0, name: "centerPointBox", type: "Int" },
        ],
    },
    RoiAlign: {
        category: NODE_CATEGORIES.Shape,
        inputs: [
            { index: 0, name: "input", required: true },
            { index: 1, name: "rois", required: true },
            { index: 2, name: "batchIndices", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "mode", type: "Int" },
            { index: 1, name: "outputHeight", type: "Int" },
            { index: 2, name: "outputWidth", type: "Int" },
            { index: 3, name: "samplingRatio", type: "Int" },
            { index: 4, name: "spatialScale", type: "Float" },
        ],
    },
    AveragePool: {
        category: NODE_CATEGORIES.Pool,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "kernelShape", type: "IntList" },
            { index: 1, name: "strides", type: "IntList" },
            { index: 2, name: "pads", type: "IntList" },
            { index: 3, name: "autopad", type: "Int" },
        ],
    },
    GlobalAveragePool: {
        category: NODE_CATEGORIES.Pool,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    GlobalMaxPool: {
        category: NODE_CATEGORIES.Pool,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    RandomNormal: {
        category: NODE_CATEGORIES.Transform,
        inputs: [],
        outputs: [],
        args: [
            { index: 0, name: "mean", type: "Float" },
            { index: 1, name: "scale", type: "Float" },
            { index: 2, name: "shape", type: "IntList" },
            { index: 3, name: "hasSeed", type: "Bool" },
            { index: 4, name: "seed", type: "Int" },
        ],
    },
    RandomNormalLike: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "mean", type: "Float" },
            { index: 1, name: "scale", type: "Float" },
            { index: 2, name: "hasSeed", type: "Bool" },
            { index: 3, name: "seed", type: "Int" },
        ],
    },
    RandomUniform: {
        category: NODE_CATEGORIES.Transform,
        inputs: [],
        outputs: [],
        args: [
            { index: 0, name: "low", type: "Float" },
            { index: 1, name: "high", type: "Float" },
            { index: 2, name: "shape", type: "IntList" },
            { index: 3, name: "hasSeed", type: "Bool" },
            { index: 4, name: "seed", type: "Int" },
        ],
    },
    RandomUniformLike: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "low", type: "Float" },
            { index: 1, name: "high", type: "Float" },
            { index: 2, name: "hasSeed", type: "Bool" },
            { index: 3, name: "seed", type: "Int" },
        ],
    },
    Bernoulli: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "dataType", type: "Int" },
            { index: 1, name: "hasSeed", type: "Bool" },
            { index: 2, name: "seed", type: "Int" },
        ],
    },
    Multinomial: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "count", type: "Int" },
            { index: 1, name: "hasSeed", type: "Bool" },
            { index: 2, name: "seed", type: "Int" },
        ],
    },
    LSTM: {
        category: NODE_CATEGORIES.Layer,
        inputs: [
            { index: 0, name: "X", required: true },
            { index: 1, name: "W", required: true },
            { index: 2, name: "R", required: true },
            { index: 3, name: "B", required: false },
            { index: 4, name: "sequenceLens", required: false },
            { index: 5, name: "initialH", required: false },
            { index: 6, name: "initialC", required: false },
            { index: 7, name: "P", required: false },
        ],
        outputs: [
            { index: 0, name: "Y", required: true },
            { index: 1, name: "Y_h", required: false },
            { index: 2, name: "Y_c", required: false },
        ],
        args: [
            { index: 0, name: "hiddenSize", type: "Int" },
            { index: 1, name: "direction", type: "Int" },
            { index: 2, name: "activations", type: "IntList" },
            { index: 3, name: "activationAlpha", type: "FloatList" },
            { index: 4, name: "activationBeta", type: "FloatList" },
            { index: 5, name: "clip", type: "Float" },
            { index: 6, name: "inputForget", type: "Bool" },
            { index: 7, name: "layout", type: "Int" },
        ],
    },
    ReduceL1: {
        category: NODE_CATEGORIES.undefined,
        inputs: [
            { index: 0, name: "data", required: true },
            { index: 1, name: "axes", required: false },
        ],
        outputs: [],
        args: [
            { index: 0, name: "keepdims", type: "Bool" },
            { index: 1, name: "noopWithEmptyAxes", type: "Bool" },
        ],
    },
    ReduceL2: {
        category: NODE_CATEGORIES.undefined,
        inputs: [
            { index: 0, name: "data", required: true },
            { index: 1, name: "axes", required: false },
        ],
        outputs: [],
        args: [
            { index: 0, name: "keepdims", type: "Bool" },
            { index: 1, name: "noopWithEmptyAxes", type: "Bool" },
        ],
    },
    ReduceLogSum: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "data", required: true },
            { index: 1, name: "axes", required: false },
        ],
        outputs: [],
        args: [
            { index: 0, name: "keepdims", type: "Bool" },
            { index: 1, name: "noopWithEmptyAxes", type: "Bool" },
        ],
    },
    ReduceLogSumExp: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "data", required: true },
            { index: 1, name: "axes", required: false },
        ],
        outputs: [],
        args: [
            { index: 0, name: "keepdims", type: "Bool" },
            { index: 1, name: "noopWithEmptyAxes", type: "Bool" },
        ],
    },
    ReduceMax: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "data", required: true },
            { index: 1, name: "axes", required: false },
        ],
        outputs: [],
        args: [
            { index: 0, name: "keepdims", type: "Bool" },
            { index: 1, name: "noopWithEmptyAxes", type: "Bool" },
        ],
    },
    ReduceMean: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "data", required: true },
            { index: 1, name: "axes", required: false },
        ],
        outputs: [],
        args: [
            { index: 0, name: "keepdims", type: "Bool" },
            { index: 1, name: "noopWithEmptyAxes", type: "Bool" },
        ],
    },
    ReduceMin: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "data", required: true },
            { index: 1, name: "axes", required: false },
        ],
        outputs: [],
        args: [
            { index: 0, name: "keepdims", type: "Bool" },
            { index: 1, name: "noopWithEmptyAxes", type: "Bool" },
        ],
    },
    ReduceProd: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "data", required: true },
            { index: 1, name: "axes", required: false },
        ],
        outputs: [],
        args: [
            { index: 0, name: "keepdims", type: "Bool" },
            { index: 1, name: "noopWithEmptyAxes", type: "Bool" },
        ],
    },
    ReduceSum: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "data", required: true },
            { index: 1, name: "axes", required: false },
        ],
        outputs: [],
        args: [
            { index: 0, name: "keepdims", type: "Bool" },
            { index: 1, name: "noopWithEmptyAxes", type: "Bool" },
        ],
    },
    ReduceSumSquare: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "data", required: true },
            { index: 1, name: "axes", required: false },
        ],
        outputs: [],
        args: [
            { index: 0, name: "keepdims", type: "Bool" },
            { index: 1, name: "noopWithEmptyAxes", type: "Bool" },
        ],
    },
    Cast: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "dataType", type: "Int" },
        ],
    },
    CastLike: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
            { index: 1, name: "targetType", required: true },
        ],
        outputs: [],
        args: [],
    },
    Concat: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: "0..N-1", name: "inputs", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "axis", type: "Int" },
        ],
    },
    DepthToSpace: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "blocksize", type: "Int" },
            { index: 1, name: "mode", type: "Int" },
        ],
    },
    Expand: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
            { index: 1, name: "shape", required: true },
        ],
        outputs: [],
        args: [],
    },
    Flatten: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "axis", type: "Int" },
        ],
    },
    GridSample: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
            { index: 1, name: "grid", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "mode", type: "Int" },
            { index: 1, name: "paddingMode", type: "Int" },
            { index: 2, name: "alignCorners", type: "Bool" },
        ],
    },
    Identity: {
        category: NODE_CATEGORIES.Shape,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    MoveDim: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "source", type: "IntList" },
            { index: 1, name: "destination", type: "IntList" },
        ],
    },
    Narrow: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
            { index: 1, name: "dim", required: true },
            { index: 2, name: "start", required: true },
            { index: 3, name: "length", required: true },
        ],
        outputs: [],
        args: [],
    },
    Pad: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "data", required: true },
            { index: 1, name: "pads", required: true },
            { index: 2, name: "constantValue", required: false },
            { index: 3, name: "axes", required: false },
        ],
        outputs: [],
        args: [
            { index: 0, name: "mode", type: "Int" },
        ],
    },
    Resize: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
            { index: 1, name: "scalesOrSizes", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "scaleMode", type: "Int" },
            { index: 1, name: "coordTransformMode", type: "Int" },
            { index: 2, name: "mode", type: "Int" },
            { index: 3, name: "nearestMode", type: "Int" },
            { index: 4, name: "axes", type: "IntList" },
        ],
    },
    Select: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
            { index: 1, name: "dim", required: true },
            { index: 2, name: "selectIndex", required: true },
        ],
        outputs: [],
        args: [],
    },
    Slice: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
            { index: 1, name: "starts", required: true },
            { index: 2, name: "ends", required: true },
            { index: 3, name: "axes", required: false },
            { index: 4, name: "steps", required: false },
        ],
        outputs: [],
        args: [],
    },
    SliceSet: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
            { index: 1, name: "values", required: true },
            { index: 2, name: "starts", required: true },
            { index: 3, name: "ends", required: true },
            { index: 4, name: "axes", required: false },
            { index: 5, name: "steps", required: false },
        ],
        outputs: [],
        args: [],
    },
    SpaceToDepth: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "blocksize", type: "Int" },
        ],
    },
    Split: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
            { index: 1, name: "split", required: false },
        ],
        outputs: [
            { index: "0..N-1", name: "outputs", required: true },
        ],
        args: [
            { index: 0, name: "axis", type: "Int" },
            { index: 1, name: "numOutputs", type: "Int" },
        ],
    },
    Squeeze: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
            { index: 1, name: "axes", required: false },
        ],
        outputs: [],
        args: [],
    },
    Tile: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
            { index: 1, name: "repeats", required: true },
        ],
        outputs: [],
        args: [],
    },
    Transpose: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "permutations", type: "IntList" },
        ],
    },
    Trilu: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
            { index: 1, name: "k", required: false },
        ],
        outputs: [],
        args: [
            { index: 0, name: "mode", type: "Int" },
        ],
    },
    Unsqueeze: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
            { index: 1, name: "axes", required: true },
        ],
        outputs: [],
        args: [],
    },
    Acos: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Acosh: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Asin: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Asinh: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Atan: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Atanh: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Cos: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Cosh: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Sin: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Sinh: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Tan: {
        category: NODE_CATEGORIES.Transform,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    DequantizeUint8: {
        category: NODE_CATEGORIES.Quantization,
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "scale", type: "Float" },
            { index: 1, name: "zeroPoint", type: "Int" },
        ],
    },
    Gemm: { // was missing...
        inputs: [
            { index: 0, name: "input", require: true },
            { index: 1, name: "bias" },
            { index: 2, name: "C" }, // count?
            { index: 3, name: "transposeB" }
        ],
        outputs: [], // no idea
        args: [] // no idea
    }
};
