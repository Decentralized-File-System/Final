import {
  ServerFile,
  dataNodePercentageStorage,
  dataNodeWithOutPercentage,
} from "../types";
import { Chunk } from "./classes";

export const nodeDivisionPercentage = (
  nodesArray: dataNodeWithOutPercentage[]
) => {
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

  // Getting each node obj
  const firstDataNode = dataNodesInPercentageArray.filter(
    (dataNodeObj) => dataNodeObj.nodeId === 1
  )[0];
  const secondDataNode = dataNodesInPercentageArray.filter(
    (dataNodeObj) => dataNodeObj.nodeId === 2
  )[0];

  // Calculating Chunk sizes for each node
  const firstChunkSize = Math.floor(
    (firstDataNode.availableStoragePercentage / 100) * file.size
  );
  const secondChunkSize = Math.floor(
    (secondDataNode.availableStoragePercentage / 100) * file.size
  );

  // Slicing buffer according to the sizes
  const firstChunk = fileBuffer.slice(0, firstChunkSize);
  const secondChunk = fileBuffer.slice(
    firstChunkSize,
    firstChunkSize + secondChunkSize
  );
  const thirdChunk = fileBuffer.slice(firstChunkSize + secondChunkSize);

  // Building chunks for each node
  const firstNodeChunk = new Chunk(firstChunk, 1, file.id);
  const secondNodeChunk = new Chunk(secondChunk, 2, file.id);
  const thirdNodeChunk = new Chunk(thirdChunk, 3, file.id);

  return [firstNodeChunk, secondNodeChunk, thirdNodeChunk];
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
