import { Request, Response } from "express";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { ServerFile } from "../types";
import { splitFile, nodeDevisionPercetage } from "../utils/functions";

const save_file_post = async (req: Request, res: Response) => {
  const pathName = path.join(__dirname, "../mock-nodes");
  //@ts-ignore
  const file: ServerFile = req.files.file;
  file.id = uuidv4();
  
  const check = nodeDevisionPercetage(
    {
      nodeId: 1,
      availableStorage: 5368709120,
      // availableStoragePercentage: 0
    },
    {
      nodeId: 2,
      availableStorage: 10737418240,
      // availableStoragePercentage: 0
    },
    {
      nodeId: 3,
      availableStorage: 16106127360,
      // availableStoragePercentage: 0
    }
  );

  // console.log(check);

  const fileChunksArr = splitFile(file, check);
  console.log(fileChunksArr);
};

export default save_file_post;
