import {
  ServerFile,
  dataNodePercentageStorage,
  dataNodeWithOutPercentage,
} from "../types";
import { ChunkClass } from "./classes";

export const nodeDivisionPercentage = (
  nodesArray: dataNodeWithOutPercentage[]
) => {
  nodesArray = nodesArray.filter((node) => Number(node.availableStorage) !== 0);
  let availableStorageSum = 0;
  nodesArray.forEach((node) => {
    availableStorageSum += Number(node.availableStorage);
  });

  //Assigning available storage percentage to all dataNode objects
  let totalPercentage = 0;
  for (let i = 0; i < nodesArray.length; i++) {
    if (i === nodesArray.length - 1) {
      nodesArray[i].availableStoragePercentage = 100 - totalPercentage;
    }
    nodesArray[i].availableStoragePercentage = Math.round(
      (Number(nodesArray[i].availableStorage) / availableStorageSum) * 100
    );
    totalPercentage += Number(nodesArray[i].availableStoragePercentage);
  }

  //Changing object type
  const nodePercentage = nodesArray.map((node) => changeNodeObjectType(node));

  return nodePercentage;
};

export const splitFile = (
  file: ServerFile,
  dataNodesInPercentageArray: dataNodePercentageStorage[]
) => {
  const fileBuffer = file.data;
  let sumBufferSize = 0;
  const chunkArray = dataNodesInPercentageArray.map((node, i) => {
    if (i === dataNodesInPercentageArray.length - 1) {
      const lastChunkBuffer = fileBuffer.slice(sumBufferSize);
      return new ChunkClass(lastChunkBuffer, i + 1, file.id, node.nodeId);
    }
    const chunkSize = Math.floor(
      (node.availableStoragePercentage / 100) * file.size
    );
    const chunkBuffer = fileBuffer.slice(
      sumBufferSize,
      chunkSize + sumBufferSize
    );
    sumBufferSize += chunkSize;
    return new ChunkClass(chunkBuffer, i + 1, file.id, node.nodeId);
  });
  return chunkArray;
};

export const concatArrayOfChunks = (chunkArray: any) => {
  const bufferArray = chunkArray.map((chunk: any) => Buffer.from(chunk.buffer));
  const file = Buffer.concat(bufferArray);

  return file;
};

function changeNodeObjectType(dataNode: {
  nodeId: number;
  availableStorage: number;
  availableStoragePercentage?: number;
}) {
  const changedObject: dataNodePercentageStorage = {
    nodeId: dataNode.nodeId,
    availableStorage: dataNode.availableStorage,
    availableStoragePercentage: Number(dataNode.availableStoragePercentage),
  };
  return changedObject;
}
