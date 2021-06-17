import { Request, Response } from "express";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { ServerFile } from "../types";
import {
  splitFile,
  nodeDivisionPercentage as nodeDivisionPercentage,
} from "../utils/functions";

const save_file_post = async (req: Request, res: Response) => {
  const pathName = path.join(__dirname, "../files");
  //@ts-ignore
  const file: ServerFile = req.files.file;
  file.id = uuidv4();

  const check = nodeDivisionPercentage(
    {
      nodeId: 1,
      availableStorage: 5368709120 /** 5 gb */,
    },
    {
      nodeId: 2,
      availableStorage: 10737418240 /** 10 gb */,
    },
    {
      nodeId: 3,
      availableStorage: 16106127360 /** 15 gb */,
    }
  );

  console.log(check);
  console.log(file);

  const fileChunksArr = splitFile(file, check);
  console.log(fileChunksArr);
  // fileChunksArr.forEach((chunk, i) => {
  //   fs.writeFile(
  //     `${__dirname}/../files/${chunk.fileId}-${i}.json`,
  //     JSON.stringify(chunk),
  //     (err) => {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         console.log("success");
  //       }
  //     }
  //   );
  // });
  // let filesArr = fs.readdirSync(`${__dirname}/../files`);
  // const chunkArr: any = [];
  // filesArr.forEach((file) => {
  //   const data = JSON.parse(fs.readFileSync(`${__dirname}/../files/${file}`).toString());
  //   chunkArr.push(Buffer.from(data.buffer));
  // });
  // console.log(chunkArr);
  // const fileConcat = Buffer.concat([chunkArr[0],chunkArr[1], chunkArr[2]]);
  // console.log(fileConcat);
  
  // fs.writeFileSync(`${__dirname}/../files/${file.name}`, fileConcat);
};

export default save_file_post;
