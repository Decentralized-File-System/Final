export class Chunk{
    buffer: Buffer;
    index: number;
    fileId: string;
    constructor(buffer: Buffer, index:number, fileId:string){
        this.buffer = buffer;
        this.index = index;
        this.fileId = fileId;
    }
};