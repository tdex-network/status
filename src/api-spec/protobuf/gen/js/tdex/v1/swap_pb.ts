/* eslint-disable */
// @generated by protobuf-ts 2.8.2 with parameter add_pb_suffix,eslint_disable,ts_nocheck,keep_enum_prefix,long_type_string
// @generated from protobuf file "tdex/v1/swap.proto" (package "tdex.v1", syntax proto3)
// tslint:disable
// @ts-nocheck
import type { BinaryWriteOptions } from '@protobuf-ts/runtime';
import type { IBinaryWriter } from '@protobuf-ts/runtime';
import { WireType } from '@protobuf-ts/runtime';
import type { BinaryReadOptions } from '@protobuf-ts/runtime';
import type { IBinaryReader } from '@protobuf-ts/runtime';
import { UnknownFieldHandler } from '@protobuf-ts/runtime';
import type { PartialMessage } from '@protobuf-ts/runtime';
import { reflectionMergePartial } from '@protobuf-ts/runtime';
import { MESSAGE_TYPE } from '@protobuf-ts/runtime';
import { MessageType } from '@protobuf-ts/runtime';
/**
 * @generated from protobuf message tdex.v1.SwapRequest
 */
export interface SwapRequest {
  /**
   * Random unique identifier for the current message
   *
   * @generated from protobuf field: string id = 1;
   */
  id: string;
  /**
   * The proposer's quantity
   *
   * @generated from protobuf field: uint64 amount_p = 2;
   */
  amountP: string;
  /**
   * The proposer's asset hash
   *
   * @generated from protobuf field: string asset_p = 3;
   */
  assetP: string;
  /**
   * The responder's quantity
   *
   * @generated from protobuf field: uint64 amount_r = 4;
   */
  amountR: string;
  /**
   * The responder's asset hash
   *
   * @generated from protobuf field: string asset_r = 5;
   */
  assetR: string;
  /**
   * The proposer's unsigned transaction in PSBT format (base64 string)
   *
   * @generated from protobuf field: string transaction = 6;
   */
  transaction: string;
  /**
   * In case of a confidential psetv0 transaction the blinding key of each
   * confidential input is included. Each blinding key is identified by the
   * prevout script hex encoded.
   *
   * @generated from protobuf field: map<string, bytes> input_blinding_key = 7;
   */
  inputBlindingKey: {
    [key: string]: Uint8Array;
  };
  /**
   * In case of a confidential psetv0 transaction the blinding key of each
   * confidential output is included. Each blinding key is identified by the
   * output script hex encoded.
   *
   * @generated from protobuf field: map<string, bytes> output_blinding_key = 8;
   */
  outputBlindingKey: {
    [key: string]: Uint8Array;
  };
}
/**
 * @generated from protobuf message tdex.v1.SwapAccept
 */
export interface SwapAccept {
  /**
   * Random unique identifier for the current message
   *
   * @generated from protobuf field: string id = 1;
   */
  id: string;
  /**
   * indetifier of the SwapRequest message
   *
   * @generated from protobuf field: string request_id = 2;
   */
  requestId: string;
  /**
   * The partial signed transaction base64 encoded containing the Responder's
   * signed inputs in a PSBT format
   *
   * @generated from protobuf field: string transaction = 3;
   */
  transaction: string;
  /**
   * In case of a confidential transaction the blinding key of each confidential
   * input is included. Each blinding key is identified by the prevout script
   * hex encoded.
   *
   * @generated from protobuf field: map<string, bytes> input_blinding_key = 4;
   */
  inputBlindingKey: {
    [key: string]: Uint8Array;
  };
  /**
   * In case of a confidential transaction the blinding key of each confidential
   * output is included. Each blinding key is identified by the output script
   * hex encoded.
   *
   * @generated from protobuf field: map<string, bytes> output_blinding_key = 5;
   */
  outputBlindingKey: {
    [key: string]: Uint8Array;
  };
}
/**
 * @generated from protobuf message tdex.v1.SwapComplete
 */
export interface SwapComplete {
  /**
   * Random unique identifier for the current message
   *
   * @generated from protobuf field: string id = 1;
   */
  id: string;
  /**
   * indetifier of the SwapAccept message
   *
   * @generated from protobuf field: string accept_id = 2;
   */
  acceptId: string;
  /**
   * The signed transaction base64 encoded containing the Proposers's signed
   * inputs in a PSBT format
   *
   * @generated from protobuf field: string transaction = 3;
   */
  transaction: string;
}
/**
 * @generated from protobuf message tdex.v1.SwapFail
 */
export interface SwapFail {
  /**
   * Random unique identifier for the current message
   *
   * @generated from protobuf field: string id = 1;
   */
  id: string;
  /**
   * indetifier of either SwapRequest or SwapAccept message. It can be empty
   *
   * @generated from protobuf field: string message_id = 2;
   */
  messageId: string;
  /**
   * The failure code. It can be empty
   *
   * @generated from protobuf field: uint32 failure_code = 3;
   */
  failureCode: number;
  /**
   * The failure reason messaged
   *
   * @generated from protobuf field: string failure_message = 4;
   */
  failureMessage: string;
}
// @generated message type with reflection information, may provide speed optimized methods
class SwapRequest$Type extends MessageType<SwapRequest> {
  constructor() {
    super('tdex.v1.SwapRequest', [
      { no: 1, name: 'id', kind: 'scalar', T: 9 /*ScalarType.STRING*/ },
      { no: 2, name: 'amount_p', kind: 'scalar', T: 4 /*ScalarType.UINT64*/ },
      { no: 3, name: 'asset_p', kind: 'scalar', T: 9 /*ScalarType.STRING*/ },
      { no: 4, name: 'amount_r', kind: 'scalar', T: 4 /*ScalarType.UINT64*/ },
      { no: 5, name: 'asset_r', kind: 'scalar', T: 9 /*ScalarType.STRING*/ },
      { no: 6, name: 'transaction', kind: 'scalar', T: 9 /*ScalarType.STRING*/ },
      {
        no: 7,
        name: 'input_blinding_key',
        kind: 'map',
        K: 9 /*ScalarType.STRING*/,
        V: { kind: 'scalar', T: 12 /*ScalarType.BYTES*/ },
      },
      {
        no: 8,
        name: 'output_blinding_key',
        kind: 'map',
        K: 9 /*ScalarType.STRING*/,
        V: { kind: 'scalar', T: 12 /*ScalarType.BYTES*/ },
      },
    ]);
  }
  create(value?: PartialMessage<SwapRequest>): SwapRequest {
    const message = {
      id: '',
      amountP: '0',
      assetP: '',
      amountR: '0',
      assetR: '',
      transaction: '',
      inputBlindingKey: {},
      outputBlindingKey: {},
    };
    globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
    if (value !== undefined) reflectionMergePartial<SwapRequest>(this, message, value);
    return message;
  }
  internalBinaryRead(
    reader: IBinaryReader,
    length: number,
    options: BinaryReadOptions,
    target?: SwapRequest
  ): SwapRequest {
    let message = target ?? this.create(),
      end = reader.pos + length;
    while (reader.pos < end) {
      let [fieldNo, wireType] = reader.tag();
      switch (fieldNo) {
        case /* string id */ 1:
          message.id = reader.string();
          break;
        case /* uint64 amount_p */ 2:
          message.amountP = reader.uint64().toString();
          break;
        case /* string asset_p */ 3:
          message.assetP = reader.string();
          break;
        case /* uint64 amount_r */ 4:
          message.amountR = reader.uint64().toString();
          break;
        case /* string asset_r */ 5:
          message.assetR = reader.string();
          break;
        case /* string transaction */ 6:
          message.transaction = reader.string();
          break;
        case /* map<string, bytes> input_blinding_key */ 7:
          this.binaryReadMap7(message.inputBlindingKey, reader, options);
          break;
        case /* map<string, bytes> output_blinding_key */ 8:
          this.binaryReadMap8(message.outputBlindingKey, reader, options);
          break;
        default:
          let u = options.readUnknownField;
          if (u === 'throw')
            throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
          let d = reader.skip(wireType);
          if (u !== false) (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
      }
    }
    return message;
  }
  private binaryReadMap7(
    map: SwapRequest['inputBlindingKey'],
    reader: IBinaryReader,
    options: BinaryReadOptions
  ): void {
    let len = reader.uint32(),
      end = reader.pos + len,
      key: keyof SwapRequest['inputBlindingKey'] | undefined,
      val: SwapRequest['inputBlindingKey'][any] | undefined;
    while (reader.pos < end) {
      let [fieldNo, wireType] = reader.tag();
      switch (fieldNo) {
        case 1:
          key = reader.string();
          break;
        case 2:
          val = reader.bytes();
          break;
        default:
          throw new globalThis.Error('unknown map entry field for field tdex.v1.SwapRequest.input_blinding_key');
      }
    }
    map[key ?? ''] = val ?? new Uint8Array(0);
  }
  private binaryReadMap8(
    map: SwapRequest['outputBlindingKey'],
    reader: IBinaryReader,
    options: BinaryReadOptions
  ): void {
    let len = reader.uint32(),
      end = reader.pos + len,
      key: keyof SwapRequest['outputBlindingKey'] | undefined,
      val: SwapRequest['outputBlindingKey'][any] | undefined;
    while (reader.pos < end) {
      let [fieldNo, wireType] = reader.tag();
      switch (fieldNo) {
        case 1:
          key = reader.string();
          break;
        case 2:
          val = reader.bytes();
          break;
        default:
          throw new globalThis.Error('unknown map entry field for field tdex.v1.SwapRequest.output_blinding_key');
      }
    }
    map[key ?? ''] = val ?? new Uint8Array(0);
  }
  internalBinaryWrite(message: SwapRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
    /* string id = 1; */
    if (message.id !== '') writer.tag(1, WireType.LengthDelimited).string(message.id);
    /* uint64 amount_p = 2; */
    if (message.amountP !== '0') writer.tag(2, WireType.Varint).uint64(message.amountP);
    /* string asset_p = 3; */
    if (message.assetP !== '') writer.tag(3, WireType.LengthDelimited).string(message.assetP);
    /* uint64 amount_r = 4; */
    if (message.amountR !== '0') writer.tag(4, WireType.Varint).uint64(message.amountR);
    /* string asset_r = 5; */
    if (message.assetR !== '') writer.tag(5, WireType.LengthDelimited).string(message.assetR);
    /* string transaction = 6; */
    if (message.transaction !== '') writer.tag(6, WireType.LengthDelimited).string(message.transaction);
    /* map<string, bytes> input_blinding_key = 7; */
    for (let k of Object.keys(message.inputBlindingKey))
      writer
        .tag(7, WireType.LengthDelimited)
        .fork()
        .tag(1, WireType.LengthDelimited)
        .string(k)
        .tag(2, WireType.LengthDelimited)
        .bytes(message.inputBlindingKey[k])
        .join();
    /* map<string, bytes> output_blinding_key = 8; */
    for (let k of Object.keys(message.outputBlindingKey))
      writer
        .tag(8, WireType.LengthDelimited)
        .fork()
        .tag(1, WireType.LengthDelimited)
        .string(k)
        .tag(2, WireType.LengthDelimited)
        .bytes(message.outputBlindingKey[k])
        .join();
    let u = options.writeUnknownFields;
    if (u !== false) (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
    return writer;
  }
}
/**
 * @generated MessageType for protobuf message tdex.v1.SwapRequest
 */
export const SwapRequest = new SwapRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SwapAccept$Type extends MessageType<SwapAccept> {
  constructor() {
    super('tdex.v1.SwapAccept', [
      { no: 1, name: 'id', kind: 'scalar', T: 9 /*ScalarType.STRING*/ },
      { no: 2, name: 'request_id', kind: 'scalar', T: 9 /*ScalarType.STRING*/ },
      { no: 3, name: 'transaction', kind: 'scalar', T: 9 /*ScalarType.STRING*/ },
      {
        no: 4,
        name: 'input_blinding_key',
        kind: 'map',
        K: 9 /*ScalarType.STRING*/,
        V: { kind: 'scalar', T: 12 /*ScalarType.BYTES*/ },
      },
      {
        no: 5,
        name: 'output_blinding_key',
        kind: 'map',
        K: 9 /*ScalarType.STRING*/,
        V: { kind: 'scalar', T: 12 /*ScalarType.BYTES*/ },
      },
    ]);
  }
  create(value?: PartialMessage<SwapAccept>): SwapAccept {
    const message = { id: '', requestId: '', transaction: '', inputBlindingKey: {}, outputBlindingKey: {} };
    globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
    if (value !== undefined) reflectionMergePartial<SwapAccept>(this, message, value);
    return message;
  }
  internalBinaryRead(
    reader: IBinaryReader,
    length: number,
    options: BinaryReadOptions,
    target?: SwapAccept
  ): SwapAccept {
    let message = target ?? this.create(),
      end = reader.pos + length;
    while (reader.pos < end) {
      let [fieldNo, wireType] = reader.tag();
      switch (fieldNo) {
        case /* string id */ 1:
          message.id = reader.string();
          break;
        case /* string request_id */ 2:
          message.requestId = reader.string();
          break;
        case /* string transaction */ 3:
          message.transaction = reader.string();
          break;
        case /* map<string, bytes> input_blinding_key */ 4:
          this.binaryReadMap4(message.inputBlindingKey, reader, options);
          break;
        case /* map<string, bytes> output_blinding_key */ 5:
          this.binaryReadMap5(message.outputBlindingKey, reader, options);
          break;
        default:
          let u = options.readUnknownField;
          if (u === 'throw')
            throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
          let d = reader.skip(wireType);
          if (u !== false) (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
      }
    }
    return message;
  }
  private binaryReadMap4(map: SwapAccept['inputBlindingKey'], reader: IBinaryReader, options: BinaryReadOptions): void {
    let len = reader.uint32(),
      end = reader.pos + len,
      key: keyof SwapAccept['inputBlindingKey'] | undefined,
      val: SwapAccept['inputBlindingKey'][any] | undefined;
    while (reader.pos < end) {
      let [fieldNo, wireType] = reader.tag();
      switch (fieldNo) {
        case 1:
          key = reader.string();
          break;
        case 2:
          val = reader.bytes();
          break;
        default:
          throw new globalThis.Error('unknown map entry field for field tdex.v1.SwapAccept.input_blinding_key');
      }
    }
    map[key ?? ''] = val ?? new Uint8Array(0);
  }
  private binaryReadMap5(
    map: SwapAccept['outputBlindingKey'],
    reader: IBinaryReader,
    options: BinaryReadOptions
  ): void {
    let len = reader.uint32(),
      end = reader.pos + len,
      key: keyof SwapAccept['outputBlindingKey'] | undefined,
      val: SwapAccept['outputBlindingKey'][any] | undefined;
    while (reader.pos < end) {
      let [fieldNo, wireType] = reader.tag();
      switch (fieldNo) {
        case 1:
          key = reader.string();
          break;
        case 2:
          val = reader.bytes();
          break;
        default:
          throw new globalThis.Error('unknown map entry field for field tdex.v1.SwapAccept.output_blinding_key');
      }
    }
    map[key ?? ''] = val ?? new Uint8Array(0);
  }
  internalBinaryWrite(message: SwapAccept, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
    /* string id = 1; */
    if (message.id !== '') writer.tag(1, WireType.LengthDelimited).string(message.id);
    /* string request_id = 2; */
    if (message.requestId !== '') writer.tag(2, WireType.LengthDelimited).string(message.requestId);
    /* string transaction = 3; */
    if (message.transaction !== '') writer.tag(3, WireType.LengthDelimited).string(message.transaction);
    /* map<string, bytes> input_blinding_key = 4; */
    for (let k of Object.keys(message.inputBlindingKey))
      writer
        .tag(4, WireType.LengthDelimited)
        .fork()
        .tag(1, WireType.LengthDelimited)
        .string(k)
        .tag(2, WireType.LengthDelimited)
        .bytes(message.inputBlindingKey[k])
        .join();
    /* map<string, bytes> output_blinding_key = 5; */
    for (let k of Object.keys(message.outputBlindingKey))
      writer
        .tag(5, WireType.LengthDelimited)
        .fork()
        .tag(1, WireType.LengthDelimited)
        .string(k)
        .tag(2, WireType.LengthDelimited)
        .bytes(message.outputBlindingKey[k])
        .join();
    let u = options.writeUnknownFields;
    if (u !== false) (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
    return writer;
  }
}
/**
 * @generated MessageType for protobuf message tdex.v1.SwapAccept
 */
export const SwapAccept = new SwapAccept$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SwapComplete$Type extends MessageType<SwapComplete> {
  constructor() {
    super('tdex.v1.SwapComplete', [
      { no: 1, name: 'id', kind: 'scalar', T: 9 /*ScalarType.STRING*/ },
      { no: 2, name: 'accept_id', kind: 'scalar', T: 9 /*ScalarType.STRING*/ },
      { no: 3, name: 'transaction', kind: 'scalar', T: 9 /*ScalarType.STRING*/ },
    ]);
  }
  create(value?: PartialMessage<SwapComplete>): SwapComplete {
    const message = { id: '', acceptId: '', transaction: '' };
    globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
    if (value !== undefined) reflectionMergePartial<SwapComplete>(this, message, value);
    return message;
  }
  internalBinaryRead(
    reader: IBinaryReader,
    length: number,
    options: BinaryReadOptions,
    target?: SwapComplete
  ): SwapComplete {
    let message = target ?? this.create(),
      end = reader.pos + length;
    while (reader.pos < end) {
      let [fieldNo, wireType] = reader.tag();
      switch (fieldNo) {
        case /* string id */ 1:
          message.id = reader.string();
          break;
        case /* string accept_id */ 2:
          message.acceptId = reader.string();
          break;
        case /* string transaction */ 3:
          message.transaction = reader.string();
          break;
        default:
          let u = options.readUnknownField;
          if (u === 'throw')
            throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
          let d = reader.skip(wireType);
          if (u !== false) (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
      }
    }
    return message;
  }
  internalBinaryWrite(message: SwapComplete, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
    /* string id = 1; */
    if (message.id !== '') writer.tag(1, WireType.LengthDelimited).string(message.id);
    /* string accept_id = 2; */
    if (message.acceptId !== '') writer.tag(2, WireType.LengthDelimited).string(message.acceptId);
    /* string transaction = 3; */
    if (message.transaction !== '') writer.tag(3, WireType.LengthDelimited).string(message.transaction);
    let u = options.writeUnknownFields;
    if (u !== false) (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
    return writer;
  }
}
/**
 * @generated MessageType for protobuf message tdex.v1.SwapComplete
 */
export const SwapComplete = new SwapComplete$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SwapFail$Type extends MessageType<SwapFail> {
  constructor() {
    super('tdex.v1.SwapFail', [
      { no: 1, name: 'id', kind: 'scalar', T: 9 /*ScalarType.STRING*/ },
      { no: 2, name: 'message_id', kind: 'scalar', T: 9 /*ScalarType.STRING*/ },
      { no: 3, name: 'failure_code', kind: 'scalar', T: 13 /*ScalarType.UINT32*/ },
      { no: 4, name: 'failure_message', kind: 'scalar', T: 9 /*ScalarType.STRING*/ },
    ]);
  }
  create(value?: PartialMessage<SwapFail>): SwapFail {
    const message = { id: '', messageId: '', failureCode: 0, failureMessage: '' };
    globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
    if (value !== undefined) reflectionMergePartial<SwapFail>(this, message, value);
    return message;
  }
  internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: SwapFail): SwapFail {
    let message = target ?? this.create(),
      end = reader.pos + length;
    while (reader.pos < end) {
      let [fieldNo, wireType] = reader.tag();
      switch (fieldNo) {
        case /* string id */ 1:
          message.id = reader.string();
          break;
        case /* string message_id */ 2:
          message.messageId = reader.string();
          break;
        case /* uint32 failure_code */ 3:
          message.failureCode = reader.uint32();
          break;
        case /* string failure_message */ 4:
          message.failureMessage = reader.string();
          break;
        default:
          let u = options.readUnknownField;
          if (u === 'throw')
            throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
          let d = reader.skip(wireType);
          if (u !== false) (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
      }
    }
    return message;
  }
  internalBinaryWrite(message: SwapFail, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
    /* string id = 1; */
    if (message.id !== '') writer.tag(1, WireType.LengthDelimited).string(message.id);
    /* string message_id = 2; */
    if (message.messageId !== '') writer.tag(2, WireType.LengthDelimited).string(message.messageId);
    /* uint32 failure_code = 3; */
    if (message.failureCode !== 0) writer.tag(3, WireType.Varint).uint32(message.failureCode);
    /* string failure_message = 4; */
    if (message.failureMessage !== '') writer.tag(4, WireType.LengthDelimited).string(message.failureMessage);
    let u = options.writeUnknownFields;
    if (u !== false) (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
    return writer;
  }
}
/**
 * @generated MessageType for protobuf message tdex.v1.SwapFail
 */
export const SwapFail = new SwapFail$Type();
