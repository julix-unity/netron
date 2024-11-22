import { logError, logInfo, logWarning } from "./sentis.js";
import { SentisFlatBuffer } from './sentis-schema.mjs';
const { KernelTypes, EValue } = SentisFlatBuffer;

const KernelMetadata = {
    Reshape: {
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
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "alpha", type: "Float" },
        ],
    },
    Elu: {
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "alpha", type: "Float" },
        ],
    },
    Gelu: {
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    GeluFast: {
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Erf: {
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Hardmax: {
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "axis", type: "Int" },
        ],
    },
    HardSigmoid: {
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
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    LeakyRelu: {
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "alpha", type: "Float" },
        ],
    },
    PRelu: {
        inputs: [
            { index: 0, name: "input", required: true },
            { index: 1, name: "slope", required: true },
        ],
        outputs: [],
        args: [],
    },
    Relu: {
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Relu6: {
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Selu: {
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
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Softplus: {
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Softsign: {
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Swish: {
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Tanh: {
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    ThresholdedRelu: {
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "alpha", type: "Float" },
        ],
    },
    LogSoftmax: {
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "axis", type: "Int" },
        ],
    },
    Softmax: {
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "axis", type: "Int" },
        ],
    },
    ConvTranspose: {
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
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    ConstantOfShape: {
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
        inputs: [
            { index: 0, name: "start", required: true },
            { index: 1, name: "limit", required: true },
            { index: 2, name: "delta", required: true },
        ],
        outputs: [],
        args: [],
    },
    ArgMax: {
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
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    ScatterElements: {
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
        inputs: [
            { index: 0, name: "a", required: true },
            { index: 1, name: "b", required: true },
        ],
        outputs: [],
        args: [],
    },
    Compress: {
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
        inputs: [
            { index: 0, name: "a", required: true },
            { index: 1, name: "b", required: true },
        ],
        outputs: [],
        args: [],
    },
    Greater: {
        inputs: [
            { index: 0, name: "a", required: true },
            { index: 1, name: "b", required: true },
        ],
        outputs: [],
        args: [],
    },
    GreaterOrEqual: {
        inputs: [
            { index: 0, name: "a", required: true },
            { index: 1, name: "b", required: true },
        ],
        outputs: [],
        args: [],
    },
    IsInf: {
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
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Less: {
        inputs: [
            { index: 0, name: "a", required: true },
            { index: 1, name: "b", required: true },
        ],
        outputs: [],
        args: [],
    },
    LessOrEqual: {
        inputs: [
            { index: 0, name: "a", required: true },
            { index: 1, name: "b", required: true },
        ],
        outputs: [],
        args: [],
    },
    Not: {
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Or: {
        inputs: [
            { index: 0, name: "a", required: true },
            { index: 1, name: "b", required: true },
        ],
        outputs: [],
        args: [],
    },
    Xor: {
        inputs: [
            { index: 0, name: "a", required: true },
            { index: 1, name: "b", required: true },
        ],
        outputs: [],
        args: [],
    },
    Where: {
        inputs: [
            { index: 0, name: "condition", required: true },
            { index: 1, name: "x", required: true },
            { index: 2, name: "y", required: true },
        ],
        outputs: [],
        args: [],
    },
    Abs: {
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Add: {
        inputs: [
            { index: 0, name: "a", required: true },
            { index: 1, name: "b", required: true },
        ],
        outputs: [],
        args: [],
    },
    Ceil: {
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Clip: {
        inputs: [
            { index: 0, name: "input", required: true },
            { index: 1, name: "min", required: false },
            { index: 2, name: "max", required: false },
        ],
        outputs: [],
        args: [],
    },
    CumSum: {
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
        inputs: [
            { index: 0, name: "a", required: true },
            { index: 1, name: "b", required: true },
        ],
        outputs: [],
        args: [],
    },
    Einsum: {
        inputs: [
            { index: "0..N-1", name: "inputs", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "equation", type: "String" },
        ],
    },
    Exp: {
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Floor: {
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Log: {
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    MatMul: {
        inputs: [
            { index: 0, name: "a", required: true },
            { index: 1, name: "b", required: true },
        ],
        outputs: [],
        args: [],
    },
    MatMul2D: {
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
        inputs: [
            { index: 0, name: "a", required: true },
            { index: 1, name: "b", required: true },
        ],
        outputs: [],
        args: [],
    },
    Min: {
        inputs: [
            { index: 0, name: "a", required: true },
            { index: 1, name: "b", required: true },
        ],
        outputs: [],
        args: [],
    },
    Mod: {
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
        inputs: [
            { index: 0, name: "a", required: true },
            { index: 1, name: "b", required: true },
        ],
        outputs: [],
        args: [],
    },
    Neg: {
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Pow: {
        inputs: [
            { index: 0, name: "a", required: true },
            { index: 1, name: "b", required: true },
        ],
        outputs: [],
        args: [],
    },
    Reciprocal: {
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Round: {
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    ScalarMad: {
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
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Sqrt: {
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Square: {
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Sub: {
        inputs: [
            { index: 0, name: "a", required: true },
            { index: 1, name: "b", required: true },
        ],
        outputs: [],
        args: [],
    },
    ScaleBias: {
        inputs: [
            { index: 0, name: "input", required: true },
            { index: 1, name: "scale", required: true },
            { index: 2, name: "bias", required: true },
        ],
        outputs: [],
        args: [],
    },
    InstanceNormalization: {
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
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    GlobalMaxPool: {
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    RandomNormal: {
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
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "dataType", type: "Int" },
        ],
    },
    CastLike: {
        inputs: [
            { index: 0, name: "input", required: true },
            { index: 1, name: "targetType", required: true },
        ],
        outputs: [],
        args: [],
    },
    Concat: {
        inputs: [
            { index: "0..N-1", name: "inputs", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "axis", type: "Int" },
        ],
    },
    DepthToSpace: {
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
        inputs: [
            { index: 0, name: "input", required: true },
            { index: 1, name: "shape", required: true },
        ],
        outputs: [],
        args: [],
    },
    Flatten: {
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "axis", type: "Int" },
        ],
    },
    GridSample: {
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
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    MoveDim: {
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
        inputs: [
            { index: 0, name: "input", required: true },
            { index: 1, name: "dim", required: true },
            { index: 2, name: "selectIndex", required: true },
        ],
        outputs: [],
        args: [],
    },
    Slice: {
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
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "blocksize", type: "Int" },
        ],
    },
    Split: {
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
        inputs: [
            { index: 0, name: "input", required: true },
            { index: 1, name: "axes", required: false },
        ],
        outputs: [],
        args: [],
    },
    Tile: {
        inputs: [
            { index: 0, name: "input", required: true },
            { index: 1, name: "repeats", required: true },
        ],
        outputs: [],
        args: [],
    },
    Transpose: {
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "permutations", type: "IntList" },
        ],
    },
    Trilu: {
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
        inputs: [
            { index: 0, name: "input", required: true },
            { index: 1, name: "axes", required: true },
        ],
        outputs: [],
        args: [],
    },
    Acos: {
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Acosh: {
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Asin: {
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Asinh: {
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Atan: {
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Atanh: {
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Cos: {
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Cosh: {
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Sin: {
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Sinh: {
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    Tan: {
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [],
    },
    DequantizeUint8: {
        inputs: [
            { index: 0, name: "input", required: true },
        ],
        outputs: [],
        args: [
            { index: 0, name: "scale", type: "Float" },
            { index: 1, name: "zeroPoint", type: "Int" },
        ],
    },
};

export const extractValueByType = (value, type) => {
    console.log(value, type);
    const valType = value.valType();
    const expectedValType = KernelTypes[type];
    if (valType !== expectedValType) {
        logWarning(`Type mismatch: Expected ${type}, but got ${KernelTypes[valType]}`);
        return null;
    }
    const val = value.val(new SentisFlatBuffer[type]()); // Get the actual value object based on the type
    console.log(valType, val);
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

export const parseKernel = (operatorName, kernelCall, chain, executionPlan) => {
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
