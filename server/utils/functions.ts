import { ServerFile } from "../types";
import { Chunk } from "./classes";

export const splitFile = (
  file: ServerFile,
  bufferSizeOne: number,
  bufferSizeTwo: number
) => {
  const fileBuffer = file.data;
  const firstThird = bufferSizeOne + bufferSizeTwo;
  const firstChunk = fileBuffer.slice(0, bufferSizeOne);
  const secondChunk = fileBuffer.slice(bufferSizeOne, firstThird);
  const thirdChunk = fileBuffer.slice(firstThird);
  const firstNodeChunk = new Chunk(firstChunk, 1, file.id);
  const secondNodeChunk = new Chunk(secondChunk, 2, file.id);
  const thirdNodeChunk = new Chunk(thirdChunk, 3, file.id);
  return [firstNodeChunk, secondNodeChunk, thirdNodeChunk];
};
