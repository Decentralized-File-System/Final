//@ts-ignore
import { DataNode } from "../models";

export const getDataNodesData = async () => {
  try {
    let data = await DataNode.findAll({});
    data = data.map((dataNode: any) => dataNode.dataValues);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
