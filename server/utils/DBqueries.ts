// @ts-ignore
import { DataNode } from "../models";

export const getAllNodesData = async () => {
  const response = await DataNode.findAll({ order: [["id", "ASC"]] });
  const nodes = response.map((data: any) => data.toJSON());
  return nodes;
};
