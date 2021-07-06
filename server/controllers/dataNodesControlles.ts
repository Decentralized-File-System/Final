import { Request, Response } from "express";
import { getDataNodesData } from "../DBQueries/dataNodesQuries";

export const getDataNodesInfo = async (req: Request, res: Response) => {
  try {
    const dataNodesData = await getDataNodesData();
    return res.status(201).json(dataNodesData);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
