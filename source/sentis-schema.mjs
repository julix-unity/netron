/* eslint-disable */

// replaces import * as flatbuffers from "flatbuffers";
var flatbuffers = {
  SIZE_PREFIX_LENGTH: 4,
}

// Below generated programmatically with vite
var BackendType = /* @__PURE__ */ ((BackendType2) => {
  BackendType2[BackendType2["CPU"] = 0] = "CPU";
  return BackendType2;
})(BackendType || {});
class BackendPartitioning {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsBackendPartitioning(bb, obj) {
    return (obj || new BackendPartitioning()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsBackendPartitioning(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new BackendPartitioning()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  chains(index) {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.readInt32(this.bb.__vector(this.bb_pos + offset) + index * 4) : 0;
  }
  chainsLength() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  chainsArray() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + offset), this.bb.__vector_len(this.bb_pos + offset)) : null;
  }
  backend() {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.readInt8(this.bb_pos + offset) : BackendType.CPU;
  }
  static startBackendPartitioning(builder) {
    builder.startObject(2);
  }
  static addChains(builder, chainsOffset) {
    builder.addFieldOffset(0, chainsOffset, 0);
  }
  static createChainsVector(builder, data) {
    builder.startVector(4, data.length, 4);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addInt32(data[i]);
    }
    return builder.endVector();
  }
  static startChainsVector(builder, numElems) {
    builder.startVector(4, numElems, 4);
  }
  static addBackend(builder, backend) {
    builder.addFieldInt8(1, backend, BackendType.CPU);
  }
  static endBackendPartitioning(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createBackendPartitioning(builder, chainsOffset, backend) {
    BackendPartitioning.startBackendPartitioning(builder);
    BackendPartitioning.addChains(builder, chainsOffset);
    BackendPartitioning.addBackend(builder, backend);
    return BackendPartitioning.endBackendPartitioning(builder);
  }
}
class Bool {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsBool(bb, obj) {
    return (obj || new Bool()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsBool(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new Bool()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  boolVal() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? !!this.bb.readInt8(this.bb_pos + offset) : false;
  }
  static startBool(builder) {
    builder.startObject(1);
  }
  static addBoolVal(builder, boolVal) {
    builder.addFieldInt8(0, +boolVal, 0);
  }
  static endBool(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createBool(builder, boolVal) {
    Bool.startBool(builder);
    Bool.addBoolVal(builder, boolVal);
    return Bool.endBool(builder);
  }
}
class BoolList {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsBoolList(bb, obj) {
    return (obj || new BoolList()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsBoolList(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new BoolList()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  items(index) {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? !!this.bb.readInt8(this.bb.__vector(this.bb_pos + offset) + index) : false;
  }
  itemsLength() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  itemsArray() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? new Int8Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + offset), this.bb.__vector_len(this.bb_pos + offset)) : null;
  }
  static startBoolList(builder) {
    builder.startObject(1);
  }
  static addItems(builder, itemsOffset) {
    builder.addFieldOffset(0, itemsOffset, 0);
  }
  static createItemsVector(builder, data) {
    builder.startVector(1, data.length, 1);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addInt8(+data[i]);
    }
    return builder.endVector();
  }
  static startItemsVector(builder, numElems) {
    builder.startVector(1, numElems, 1);
  }
  static endBoolList(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createBoolList(builder, itemsOffset) {
    BoolList.startBoolList(builder);
    BoolList.addItems(builder, itemsOffset);
    return BoolList.endBoolList(builder);
  }
}
class Buffer {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsBuffer(bb, obj) {
    return (obj || new Buffer()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsBuffer(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new Buffer()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  storage(index) {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.readUint8(this.bb.__vector(this.bb_pos + offset) + index) : 0;
  }
  storageLength() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  storageArray() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? new Uint8Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + offset), this.bb.__vector_len(this.bb_pos + offset)) : null;
  }
  static startBuffer(builder) {
    builder.startObject(1);
  }
  static addStorage(builder, storageOffset) {
    builder.addFieldOffset(0, storageOffset, 0);
  }
  static createStorageVector(builder, data) {
    builder.startVector(1, data.length, 1);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addInt8(data[i]);
    }
    return builder.endVector();
  }
  static startStorageVector(builder, numElems) {
    builder.startVector(1, numElems, 1);
  }
  static endBuffer(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createBuffer(builder, storageOffset) {
    Buffer.startBuffer(builder);
    Buffer.addStorage(builder, storageOffset);
    return Buffer.endBuffer(builder);
  }
}
class Byte {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsByte(bb, obj) {
    return (obj || new Byte()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsByte(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new Byte()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  byteVal() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.readUint8(this.bb_pos + offset) : 0;
  }
  static startByte(builder) {
    builder.startObject(1);
  }
  static addByteVal(builder, byteVal) {
    builder.addFieldInt8(0, byteVal, 0);
  }
  static endByte(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createByte(builder, byteVal) {
    Byte.startByte(builder);
    Byte.addByteVal(builder, byteVal);
    return Byte.endByte(builder);
  }
}
class KernelCall {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsKernelCall(bb, obj) {
    return (obj || new KernelCall()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsKernelCall(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new KernelCall()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  opIndex() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
  }
  args(index) {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.readInt32(this.bb.__vector(this.bb_pos + offset) + index * 4) : 0;
  }
  argsLength() {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  argsArray() {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + offset), this.bb.__vector_len(this.bb_pos + offset)) : null;
  }
  static startKernelCall(builder) {
    builder.startObject(2);
  }
  static addOpIndex(builder, opIndex) {
    builder.addFieldInt32(0, opIndex, 0);
  }
  static addArgs(builder, argsOffset) {
    builder.addFieldOffset(1, argsOffset, 0);
  }
  static createArgsVector(builder, data) {
    builder.startVector(4, data.length, 4);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addInt32(data[i]);
    }
    return builder.endVector();
  }
  static startArgsVector(builder, numElems) {
    builder.startVector(4, numElems, 4);
  }
  static endKernelCall(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createKernelCall(builder, opIndex, argsOffset) {
    KernelCall.startKernelCall(builder);
    KernelCall.addOpIndex(builder, opIndex);
    KernelCall.addArgs(builder, argsOffset);
    return KernelCall.endKernelCall(builder);
  }
}
var InstructionArguments = /* @__PURE__ */ ((InstructionArguments2) => {
  InstructionArguments2[InstructionArguments2["NONE"] = 0] = "NONE";
  InstructionArguments2[InstructionArguments2["KernelCall"] = 1] = "KernelCall";
  return InstructionArguments2;
})(InstructionArguments || {});
class Instruction {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsInstruction(bb, obj) {
    return (obj || new Instruction()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsInstruction(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new Instruction()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  instrArgsType() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.readUint8(this.bb_pos + offset) : InstructionArguments.NONE;
  }
  instrArgs(obj) {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.__union(obj, this.bb_pos + offset) : null;
  }
  static startInstruction(builder) {
    builder.startObject(2);
  }
  static addInstrArgsType(builder, instrArgsType) {
    builder.addFieldInt8(0, instrArgsType, InstructionArguments.NONE);
  }
  static addInstrArgs(builder, instrArgsOffset) {
    builder.addFieldOffset(1, instrArgsOffset, 0);
  }
  static endInstruction(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createInstruction(builder, instrArgsType, instrArgsOffset) {
    Instruction.startInstruction(builder);
    Instruction.addInstrArgsType(builder, instrArgsType);
    Instruction.addInstrArgs(builder, instrArgsOffset);
    return Instruction.endInstruction(builder);
  }
}
class Chain {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsChain(bb, obj) {
    return (obj || new Chain()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsChain(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new Chain()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  inputs(index) {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.readInt32(this.bb.__vector(this.bb_pos + offset) + index * 4) : 0;
  }
  inputsLength() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  inputsArray() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + offset), this.bb.__vector_len(this.bb_pos + offset)) : null;
  }
  outputs(index) {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.readInt32(this.bb.__vector(this.bb_pos + offset) + index * 4) : 0;
  }
  outputsLength() {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  outputsArray() {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + offset), this.bb.__vector_len(this.bb_pos + offset)) : null;
  }
  instructions(index, obj) {
    const offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? (obj || new Instruction()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
  }
  instructionsLength() {
    const offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  static startChain(builder) {
    builder.startObject(3);
  }
  static addInputs(builder, inputsOffset) {
    builder.addFieldOffset(0, inputsOffset, 0);
  }
  static createInputsVector(builder, data) {
    builder.startVector(4, data.length, 4);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addInt32(data[i]);
    }
    return builder.endVector();
  }
  static startInputsVector(builder, numElems) {
    builder.startVector(4, numElems, 4);
  }
  static addOutputs(builder, outputsOffset) {
    builder.addFieldOffset(1, outputsOffset, 0);
  }
  static createOutputsVector(builder, data) {
    builder.startVector(4, data.length, 4);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addInt32(data[i]);
    }
    return builder.endVector();
  }
  static startOutputsVector(builder, numElems) {
    builder.startVector(4, numElems, 4);
  }
  static addInstructions(builder, instructionsOffset) {
    builder.addFieldOffset(2, instructionsOffset, 0);
  }
  static createInstructionsVector(builder, data) {
    builder.startVector(4, data.length, 4);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addOffset(data[i]);
    }
    return builder.endVector();
  }
  static startInstructionsVector(builder, numElems) {
    builder.startVector(4, numElems, 4);
  }
  static endChain(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createChain(builder, inputsOffset, outputsOffset, instructionsOffset) {
    Chain.startChain(builder);
    Chain.addInputs(builder, inputsOffset);
    Chain.addOutputs(builder, outputsOffset);
    Chain.addInstructions(builder, instructionsOffset);
    return Chain.endChain(builder);
  }
}
class DataSegment {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsDataSegment(bb, obj) {
    return (obj || new DataSegment()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsDataSegment(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new DataSegment()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  offset() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.readUint64(this.bb_pos + offset) : BigInt("0");
  }
  size() {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.readUint64(this.bb_pos + offset) : BigInt("0");
  }
  static startDataSegment(builder) {
    builder.startObject(2);
  }
  static addOffset(builder, offset) {
    builder.addFieldInt64(0, offset, BigInt("0"));
  }
  static addSize(builder, size) {
    builder.addFieldInt64(1, size, BigInt("0"));
  }
  static endDataSegment(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createDataSegment(builder, offset, size) {
    DataSegment.startDataSegment(builder);
    DataSegment.addOffset(builder, offset);
    DataSegment.addSize(builder, size);
    return DataSegment.endDataSegment(builder);
  }
}
class Int {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsInt(bb, obj) {
    return (obj || new Int()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsInt(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new Int()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  intVal() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
  }
  static startInt(builder) {
    builder.startObject(1);
  }
  static addIntVal(builder, intVal) {
    builder.addFieldInt32(0, intVal, 0);
  }
  static endInt(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createInt(builder, intVal) {
    Int.startInt(builder);
    Int.addIntVal(builder, intVal);
    return Int.endInt(builder);
  }
}
var SymbolicDim = /* @__PURE__ */ ((SymbolicDim2) => {
  SymbolicDim2[SymbolicDim2["NONE"] = 0] = "NONE";
  SymbolicDim2[SymbolicDim2["Int"] = 1] = "Int";
  SymbolicDim2[SymbolicDim2["Byte"] = 2] = "Byte";
  return SymbolicDim2;
})(SymbolicDim || {});
class EDim {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsEDim(bb, obj) {
    return (obj || new EDim()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsEDim(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new EDim()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  valType() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.readUint8(this.bb_pos + offset) : SymbolicDim.NONE;
  }
  val(obj) {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.__union(obj, this.bb_pos + offset) : null;
  }
  static startEDim(builder) {
    builder.startObject(2);
  }
  static addValType(builder, valType) {
    builder.addFieldInt8(0, valType, SymbolicDim.NONE);
  }
  static addVal(builder, valOffset) {
    builder.addFieldOffset(1, valOffset, 0);
  }
  static endEDim(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createEDim(builder, valType, valOffset) {
    EDim.startEDim(builder);
    EDim.addValType(builder, valType);
    EDim.addVal(builder, valOffset);
    return EDim.endEDim(builder);
  }
}
class Float {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsFloat(bb, obj) {
    return (obj || new Float()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsFloat(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new Float()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  floatVal() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.readFloat32(this.bb_pos + offset) : 0;
  }
  static startFloat(builder) {
    builder.startObject(1);
  }
  static addFloatVal(builder, floatVal) {
    builder.addFieldFloat32(0, floatVal, 0);
  }
  static endFloat(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createFloat(builder, floatVal) {
    Float.startFloat(builder);
    Float.addFloatVal(builder, floatVal);
    return Float.endFloat(builder);
  }
}
class FloatList {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsFloatList(bb, obj) {
    return (obj || new FloatList()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsFloatList(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new FloatList()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  items(index) {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.readFloat32(this.bb.__vector(this.bb_pos + offset) + index * 4) : 0;
  }
  itemsLength() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  itemsArray() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? new Float32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + offset), this.bb.__vector_len(this.bb_pos + offset)) : null;
  }
  static startFloatList(builder) {
    builder.startObject(1);
  }
  static addItems(builder, itemsOffset) {
    builder.addFieldOffset(0, itemsOffset, 0);
  }
  static createItemsVector(builder, data) {
    builder.startVector(4, data.length, 4);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addFloat32(data[i]);
    }
    return builder.endVector();
  }
  static startItemsVector(builder, numElems) {
    builder.startVector(4, numElems, 4);
  }
  static endFloatList(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createFloatList(builder, itemsOffset) {
    FloatList.startFloatList(builder);
    FloatList.addItems(builder, itemsOffset);
    return FloatList.endFloatList(builder);
  }
}
class IntList {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsIntList(bb, obj) {
    return (obj || new IntList()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsIntList(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new IntList()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  items(index) {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.readInt32(this.bb.__vector(this.bb_pos + offset) + index * 4) : 0;
  }
  itemsLength() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  itemsArray() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + offset), this.bb.__vector_len(this.bb_pos + offset)) : null;
  }
  static startIntList(builder) {
    builder.startObject(1);
  }
  static addItems(builder, itemsOffset) {
    builder.addFieldOffset(0, itemsOffset, 0);
  }
  static createItemsVector(builder, data) {
    builder.startVector(4, data.length, 4);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addInt32(data[i]);
    }
    return builder.endVector();
  }
  static startItemsVector(builder, numElems) {
    builder.startVector(4, numElems, 4);
  }
  static endIntList(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createIntList(builder, itemsOffset) {
    IntList.startIntList(builder);
    IntList.addItems(builder, itemsOffset);
    return IntList.endIntList(builder);
  }
}
class Null {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsNull(bb, obj) {
    return (obj || new Null()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsNull(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new Null()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static startNull(builder) {
    builder.startObject(0);
  }
  static endNull(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createNull(builder) {
    Null.startNull(builder);
    return Null.endNull(builder);
  }
}
class String {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsString(bb, obj) {
    return (obj || new String()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsString(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new String()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  stringVal(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  static startString(builder) {
    builder.startObject(1);
  }
  static addStringVal(builder, stringValOffset) {
    builder.addFieldOffset(0, stringValOffset, 0);
  }
  static endString(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createString(builder, stringValOffset) {
    String.startString(builder);
    String.addStringVal(builder, stringValOffset);
    return String.endString(builder);
  }
}
var ScalarType = /* @__PURE__ */ ((ScalarType2) => {
  ScalarType2[ScalarType2["FLOAT"] = 0] = "FLOAT";
  ScalarType2[ScalarType2["INT"] = 1] = "INT";
  ScalarType2[ScalarType2["BYTE"] = 2] = "BYTE";
  ScalarType2[ScalarType2["SHORT"] = 3] = "SHORT";
  return ScalarType2;
})(ScalarType || {});
var TensorShapeDynamism = /* @__PURE__ */ ((TensorShapeDynamism2) => {
  TensorShapeDynamism2[TensorShapeDynamism2["STATIC"] = 0] = "STATIC";
  TensorShapeDynamism2[TensorShapeDynamism2["DYNAMIC_UNBOUND"] = 1] = "DYNAMIC_UNBOUND";
  return TensorShapeDynamism2;
})(TensorShapeDynamism || {});
class Tensor {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsTensor(bb, obj) {
    return (obj || new Tensor()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsTensor(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new Tensor()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  scalarType() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.readInt8(this.bb_pos + offset) : ScalarType.FLOAT;
  }
  lengthByte() {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
  }
  fixedSizes(index) {
    const offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? this.bb.readInt32(this.bb.__vector(this.bb_pos + offset) + index * 4) : 0;
  }
  fixedSizesLength() {
    const offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  fixedSizesArray() {
    const offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + offset), this.bb.__vector_len(this.bb_pos + offset)) : null;
  }
  constantBufferIdx() {
    const offset = this.bb.__offset(this.bb_pos, 10);
    return offset ? this.bb.readUint32(this.bb_pos + offset) : 0;
  }
  storageOffset() {
    const offset = this.bb.__offset(this.bb_pos, 12);
    return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
  }
  shapeDynamism() {
    const offset = this.bb.__offset(this.bb_pos, 14);
    return offset ? this.bb.readInt8(this.bb_pos + offset) : TensorShapeDynamism.STATIC;
  }
  dynamicSizes(index, obj) {
    const offset = this.bb.__offset(this.bb_pos, 16);
    return offset ? (obj || new EDim()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
  }
  dynamicSizesLength() {
    const offset = this.bb.__offset(this.bb_pos, 16);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  static startTensor(builder) {
    builder.startObject(7);
  }
  static addScalarType(builder, scalarType) {
    builder.addFieldInt8(0, scalarType, ScalarType.FLOAT);
  }
  static addLengthByte(builder, lengthByte) {
    builder.addFieldInt32(1, lengthByte, 0);
  }
  static addFixedSizes(builder, fixedSizesOffset) {
    builder.addFieldOffset(2, fixedSizesOffset, 0);
  }
  static createFixedSizesVector(builder, data) {
    builder.startVector(4, data.length, 4);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addInt32(data[i]);
    }
    return builder.endVector();
  }
  static startFixedSizesVector(builder, numElems) {
    builder.startVector(4, numElems, 4);
  }
  static addConstantBufferIdx(builder, constantBufferIdx) {
    builder.addFieldInt32(3, constantBufferIdx, 0);
  }
  static addStorageOffset(builder, storageOffset) {
    builder.addFieldInt32(4, storageOffset, 0);
  }
  static addShapeDynamism(builder, shapeDynamism) {
    builder.addFieldInt8(5, shapeDynamism, TensorShapeDynamism.STATIC);
  }
  static addDynamicSizes(builder, dynamicSizesOffset) {
    builder.addFieldOffset(6, dynamicSizesOffset, 0);
  }
  static createDynamicSizesVector(builder, data) {
    builder.startVector(4, data.length, 4);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addOffset(data[i]);
    }
    return builder.endVector();
  }
  static startDynamicSizesVector(builder, numElems) {
    builder.startVector(4, numElems, 4);
  }
  static endTensor(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createTensor(builder, scalarType, lengthByte, fixedSizesOffset, constantBufferIdx, storageOffset, shapeDynamism, dynamicSizesOffset) {
    Tensor.startTensor(builder);
    Tensor.addScalarType(builder, scalarType);
    Tensor.addLengthByte(builder, lengthByte);
    Tensor.addFixedSizes(builder, fixedSizesOffset);
    Tensor.addConstantBufferIdx(builder, constantBufferIdx);
    Tensor.addStorageOffset(builder, storageOffset);
    Tensor.addShapeDynamism(builder, shapeDynamism);
    Tensor.addDynamicSizes(builder, dynamicSizesOffset);
    return Tensor.endTensor(builder);
  }
}
var KernelTypes = /* @__PURE__ */ ((KernelTypes2) => {
  KernelTypes2[KernelTypes2["NONE"] = 0] = "NONE";
  KernelTypes2[KernelTypes2["Null"] = 1] = "Null";
  KernelTypes2[KernelTypes2["Int"] = 2] = "Int";
  KernelTypes2[KernelTypes2["Float"] = 3] = "Float";
  KernelTypes2[KernelTypes2["Bool"] = 4] = "Bool";
  KernelTypes2[KernelTypes2["Byte"] = 5] = "Byte";
  KernelTypes2[KernelTypes2["Tensor"] = 6] = "Tensor";
  KernelTypes2[KernelTypes2["String"] = 7] = "String";
  KernelTypes2[KernelTypes2["IntList"] = 8] = "IntList";
  KernelTypes2[KernelTypes2["FloatList"] = 9] = "FloatList";
  KernelTypes2[KernelTypes2["BoolList"] = 10] = "BoolList";
  return KernelTypes2;
})(KernelTypes || {});
class EValue {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsEValue(bb, obj) {
    return (obj || new EValue()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsEValue(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new EValue()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  valType() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.readUint8(this.bb_pos + offset) : KernelTypes.NONE;
  }
  val(obj) {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.__union(obj, this.bb_pos + offset) : null;
  }
  static startEValue(builder) {
    builder.startObject(2);
  }
  static addValType(builder, valType) {
    builder.addFieldInt8(0, valType, KernelTypes.NONE);
  }
  static addVal(builder, valOffset) {
    builder.addFieldOffset(1, valOffset, 0);
  }
  static endEValue(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createEValue(builder, valType, valOffset) {
    EValue.startEValue(builder);
    EValue.addValType(builder, valType);
    EValue.addVal(builder, valOffset);
    return EValue.endEValue(builder);
  }
}
class Operator {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsOperator(bb, obj) {
    return (obj || new Operator()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsOperator(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new Operator()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  name(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  static startOperator(builder) {
    builder.startObject(1);
  }
  static addName(builder, nameOffset) {
    builder.addFieldOffset(0, nameOffset, 0);
  }
  static endOperator(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createOperator(builder, nameOffset) {
    Operator.startOperator(builder);
    Operator.addName(builder, nameOffset);
    return Operator.endOperator(builder);
  }
}
class ExecutionPlan {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsExecutionPlan(bb, obj) {
    return (obj || new ExecutionPlan()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsExecutionPlan(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new ExecutionPlan()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  name(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  values(index, obj) {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? (obj || new EValue()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
  }
  valuesLength() {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  inputs(index) {
    const offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? this.bb.readInt32(this.bb.__vector(this.bb_pos + offset) + index * 4) : 0;
  }
  inputsLength() {
    const offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  inputsArray() {
    const offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + offset), this.bb.__vector_len(this.bb_pos + offset)) : null;
  }
  inputsName(index, optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 10);
    return offset ? this.bb.__string(this.bb.__vector(this.bb_pos + offset) + index * 4, optionalEncoding) : null;
  }
  inputsNameLength() {
    const offset = this.bb.__offset(this.bb_pos, 10);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  outputs(index) {
    const offset = this.bb.__offset(this.bb_pos, 12);
    return offset ? this.bb.readInt32(this.bb.__vector(this.bb_pos + offset) + index * 4) : 0;
  }
  outputsLength() {
    const offset = this.bb.__offset(this.bb_pos, 12);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  outputsArray() {
    const offset = this.bb.__offset(this.bb_pos, 12);
    return offset ? new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + offset), this.bb.__vector_len(this.bb_pos + offset)) : null;
  }
  outputsName(index, optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 14);
    return offset ? this.bb.__string(this.bb.__vector(this.bb_pos + offset) + index * 4, optionalEncoding) : null;
  }
  outputsNameLength() {
    const offset = this.bb.__offset(this.bb_pos, 14);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  chains(index, obj) {
    const offset = this.bb.__offset(this.bb_pos, 16);
    return offset ? (obj || new Chain()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
  }
  chainsLength() {
    const offset = this.bb.__offset(this.bb_pos, 16);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  operators(index, obj) {
    const offset = this.bb.__offset(this.bb_pos, 18);
    return offset ? (obj || new Operator()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
  }
  operatorsLength() {
    const offset = this.bb.__offset(this.bb_pos, 18);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  backendPartitioning(obj) {
    const offset = this.bb.__offset(this.bb_pos, 20);
    return offset ? (obj || new BackendPartitioning()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
  }
  static startExecutionPlan(builder) {
    builder.startObject(9);
  }
  static addName(builder, nameOffset) {
    builder.addFieldOffset(0, nameOffset, 0);
  }
  static addValues(builder, valuesOffset) {
    builder.addFieldOffset(1, valuesOffset, 0);
  }
  static createValuesVector(builder, data) {
    builder.startVector(4, data.length, 4);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addOffset(data[i]);
    }
    return builder.endVector();
  }
  static startValuesVector(builder, numElems) {
    builder.startVector(4, numElems, 4);
  }
  static addInputs(builder, inputsOffset) {
    builder.addFieldOffset(2, inputsOffset, 0);
  }
  static createInputsVector(builder, data) {
    builder.startVector(4, data.length, 4);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addInt32(data[i]);
    }
    return builder.endVector();
  }
  static startInputsVector(builder, numElems) {
    builder.startVector(4, numElems, 4);
  }
  static addInputsName(builder, inputsNameOffset) {
    builder.addFieldOffset(3, inputsNameOffset, 0);
  }
  static createInputsNameVector(builder, data) {
    builder.startVector(4, data.length, 4);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addOffset(data[i]);
    }
    return builder.endVector();
  }
  static startInputsNameVector(builder, numElems) {
    builder.startVector(4, numElems, 4);
  }
  static addOutputs(builder, outputsOffset) {
    builder.addFieldOffset(4, outputsOffset, 0);
  }
  static createOutputsVector(builder, data) {
    builder.startVector(4, data.length, 4);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addInt32(data[i]);
    }
    return builder.endVector();
  }
  static startOutputsVector(builder, numElems) {
    builder.startVector(4, numElems, 4);
  }
  static addOutputsName(builder, outputsNameOffset) {
    builder.addFieldOffset(5, outputsNameOffset, 0);
  }
  static createOutputsNameVector(builder, data) {
    builder.startVector(4, data.length, 4);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addOffset(data[i]);
    }
    return builder.endVector();
  }
  static startOutputsNameVector(builder, numElems) {
    builder.startVector(4, numElems, 4);
  }
  static addChains(builder, chainsOffset) {
    builder.addFieldOffset(6, chainsOffset, 0);
  }
  static createChainsVector(builder, data) {
    builder.startVector(4, data.length, 4);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addOffset(data[i]);
    }
    return builder.endVector();
  }
  static startChainsVector(builder, numElems) {
    builder.startVector(4, numElems, 4);
  }
  static addOperators(builder, operatorsOffset) {
    builder.addFieldOffset(7, operatorsOffset, 0);
  }
  static createOperatorsVector(builder, data) {
    builder.startVector(4, data.length, 4);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addOffset(data[i]);
    }
    return builder.endVector();
  }
  static startOperatorsVector(builder, numElems) {
    builder.startVector(4, numElems, 4);
  }
  static addBackendPartitioning(builder, backendPartitioningOffset) {
    builder.addFieldOffset(8, backendPartitioningOffset, 0);
  }
  static endExecutionPlan(builder) {
    const offset = builder.endObject();
    return offset;
  }
}
class Program {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsProgram(bb, obj) {
    return (obj || new Program()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsProgram(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new Program()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static bufferHasIdentifier(bb) {
    return bb.__has_identifier("STU1");
  }
  version() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.readUint32(this.bb_pos + offset) : 0;
  }
  executionPlan(obj) {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? (obj || new ExecutionPlan()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
  }
  segmentsOffset() {
    const offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? this.bb.readUint32(this.bb_pos + offset) : 0;
  }
  segments(index, obj) {
    const offset = this.bb.__offset(this.bb_pos, 10);
    return offset ? (obj || new DataSegment()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
  }
  segmentsLength() {
    const offset = this.bb.__offset(this.bb_pos, 10);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  static startProgram(builder) {
    builder.startObject(4);
  }
  static addVersion(builder, version) {
    builder.addFieldInt32(0, version, 0);
  }
  static addExecutionPlan(builder, executionPlanOffset) {
    builder.addFieldOffset(1, executionPlanOffset, 0);
  }
  static addSegmentsOffset(builder, segmentsOffset) {
    builder.addFieldInt32(2, segmentsOffset, 0);
  }
  static addSegments(builder, segmentsOffset) {
    builder.addFieldOffset(3, segmentsOffset, 0);
  }
  static createSegmentsVector(builder, data) {
    builder.startVector(4, data.length, 4);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addOffset(data[i]);
    }
    return builder.endVector();
  }
  static startSegmentsVector(builder, numElems) {
    builder.startVector(4, numElems, 4);
  }
  static endProgram(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static finishProgramBuffer(builder, offset) {
    builder.finish(offset, "STU1");
  }
  static finishSizePrefixedProgramBuffer(builder, offset) {
    builder.finish(offset, "STU1", true);
  }
}
class Short {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsShort(bb, obj) {
    return (obj || new Short()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsShort(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new Short()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  shortVal() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.readInt16(this.bb_pos + offset) : 0;
  }
  static startShort(builder) {
    builder.startObject(1);
  }
  static addShortVal(builder, shortVal) {
    builder.addFieldInt16(0, shortVal, 0);
  }
  static endShort(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createShort(builder, shortVal) {
    Short.startShort(builder);
    Short.addShortVal(builder, shortVal);
    return Short.endShort(builder);
  }
}
const sentisFlatBuffer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BackendPartitioning,
  BackendType,
  Bool,
  BoolList,
  Buffer,
  Byte,
  Chain,
  DataSegment,
  EDim,
  EValue,
  ExecutionPlan,
  Float,
  FloatList,
  Instruction,
  InstructionArguments,
  Int,
  IntList,
  KernelCall,
  KernelTypes,
  Null,
  Operator,
  Program,
  ScalarType,
  Short,
  String,
  SymbolicDim,
  Tensor,
  TensorShapeDynamism
}, Symbol.toStringTag, { value: "Module" }));
export {
  sentisFlatBuffer as SentisFlatBuffer
};
