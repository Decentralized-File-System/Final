import { ServerFile, dataNodePercentageStorage } from "../types";
import { Chunk } from "./classes";

export const nodeDevisionPercetage = (
  firstDataNodeObj: {
    nodeId: number;
    availableStorage: number;
    availableStoragePercentage?: number;
  },
  secondDataNodeObj: {
    nodeId: number;
    availableStorage: number;
    availableStoragePercentage?: number;
  },
  thirdDataNodeObj: {
    nodeId: number;
    availableStorage: number;
    availableStoragePercentage?: number;
  }
) => {
  const availableStorageSum =
    firstDataNodeObj.availableStorage +
    secondDataNodeObj.availableStorage +
    thirdDataNodeObj.availableStorage;

  //Assigining available storage percantage to all dataNode objects
  firstDataNodeObj.availableStoragePercentage = Math.round(
    (firstDataNodeObj.availableStorage / availableStorageSum) * 100
  );
  secondDataNodeObj.availableStoragePercentage = Math.round(
    (secondDataNodeObj.availableStorage / availableStorageSum) * 100
  );
  thirdDataNodeObj.availableStoragePercentage =
    100 -
    (firstDataNodeObj.availableStoragePercentage +
      secondDataNodeObj.availableStoragePercentage);
  const newFirstData:dataNodePercentageStorage = Object.assign(firstDataNodeObj , {}); 
  const newSecondData:dataNodePercentageStorage = Object.assign(firstDataNodeObj , {}); 
  const newThirdData:dataNodePercentageStorage = Object.assign(firstDataNodeObj , {}); 
  return [newFirstData, newSecondData, newThirdData];
};

export const splitFile = (
  file: ServerFile,
  dataNodesInPercentageArray: {
    nodeId: number;
    availableStorage: number;
    availableStoragePercentage: number;
  }[]
) => {
  const fileBuffer = file.data;
  const firstDataNode = dataNodesInPercentageArray.filter(
    (dataNodeObj) => dataNodeObj.nodeId === 1
  )[0];
  const secondDataNode = dataNodesInPercentageArray.filter(
    (dataNodeObj) => dataNodeObj.nodeId === 2
  )[0];
  const thirdDataNode = dataNodesInPercentageArray.filter(
    (dataNodeObj) => dataNodeObj.nodeId === 3
  )[0];
  const firstChunkSize =
    (firstDataNode.availableStoragePercentage / 100) * file.size;
  const secondChunkSize =
    (secondDataNode.availableStoragePercentage / 100) * file.size;
  const thirdChunkSize =
    (thirdDataNode.availableStoragePercentage / 100) * file.size;
  const firstThird = firstChunkSize + secondChunkSize;
  const firstChunk = fileBuffer.slice(0, firstChunkSize);
  const secondChunk = fileBuffer.slice(firstChunkSize, firstThird);
  const thirdChunk = fileBuffer.slice(firstThird);
  const firstNodeChunk = new Chunk(firstChunk, 1, file.id);
  const secondNodeChunk = new Chunk(secondChunk, 2, file.id);
  const thirdNodeChunk = new Chunk(thirdChunk, 3, file.id);
  return [firstNodeChunk, secondNodeChunk, thirdNodeChunk];
};
