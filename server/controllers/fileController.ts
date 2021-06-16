import { Request, Response } from "express";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { ServerFile } from "../types";
import { splitFile } from "../utils/functions";

const save_file_post = async (req: Request, res: Response) => {
  const pathName = path.join(__dirname, "../mock-nodes");
  //@ts-ignore
  const file: ServerFile = req.files.file;
  file.id = uuidv4();

  const fileChunksArr = splitFile(file, 60537, 60537);
  console.log(fileChunksArr);
};

export default save_file_post;
