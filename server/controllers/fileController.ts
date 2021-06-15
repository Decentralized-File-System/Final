import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { promisify } from "util";
import { pipeline } from "stream";
const pipelinePromisify = promisify(pipeline);

const save_file_post = async (req: Request, res: Response) => {
  const pathName = path.join(__dirname, "../files");
  const file = req.file;
  console.log(file);
  try {
    await pipelinePromisify(
      file.stream,
      // @ts-ignore
      fs.createWriteStream(`${__dirname}/../files/${file.originalName}`)
    );
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: "fail" });
    console.log(error);
  }
};

export default save_file_post;
