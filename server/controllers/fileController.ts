import { Request, Response } from "express";
import path from "path";
import fs from "fs";

const save_file_post = async (req: Request, res: Response) => {
  const pathName = path.join(__dirname, "../files");
  const file = req.files;
  console.log(file);
};

export default save_file_post;
