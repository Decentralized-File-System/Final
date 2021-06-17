import {
  ServerFile,
  dataNodePercentageStorage,
  dataNodeWithOutPercentage,
} from "../types";
import { Chunk } from "./classes";

export const nodeDivisionPercentage = (
  firstDataNodeObj: dataNodeWithOutPercentage,
  secondDataNodeObj: dataNodeWithOutPercentage,
  thirdDataNodeObj: dataNodeWithOutPercentage
) => {
  const availableStorageSum =
    firstDataNodeObj.availableStorage +
    secondDataNodeObj.availableStorage +
    thirdDataNodeObj.availableStorage;

  //Assigning available storage percentage to all dataNode objects
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

  //Changing object type
  const newFirstData = changeNodeObjectType(firstDataNodeObj);
  const newSecondData = changeNodeObjectType(secondDataNodeObj);
  const newThirdData = changeNodeObjectType(thirdDataNodeObj);

  return [newFirstData, newSecondData, newThirdData];
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
