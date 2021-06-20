// @ts-ignore
import { DataNode } from "../models";
import { Chunk } from "./classes";

export const getAllNodesData = async () => {
  const response = await DataNode.findAll({ order: [["id", "ASC"]] });
  const nodes = response.map((data: any) => data.toJSON());
  return nodes;
};

export const addChunk = async (chunk: Chunk, nodeId: number) => {};
