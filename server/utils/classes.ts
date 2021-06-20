export class Chunk {
  buffer: Buffer;
  index: number;
  fileId: string;
  nodeId: number;
  constructor(buffer: Buffer, index: number, fileId: string, nodeId: number) {
    this.buffer = buffer;
    this.index = index;
    this.fileId = fileId;
    this.nodeId = nodeId;
  }
}
