import { Request, Response } from "express";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { ServerFile, nodeDataType } from "../types";
import fs from "fs";
import {
  splitFile,
  nodeDivisionPercentage as nodeDivisionPercentage,
  concatArrayOfChunks,
} from "../utils/functions";
import {
  getAllNodesData,
  addChunk,
  addFile,
  updateDataNodes,
  getChunks,
} from "../utils/DBqueries";
import { uploadChunks, downloadChunks } from "../utils/networkFunction";
import { ChunkClass } from "../utils/classes";

export const saveFilePost = async (req: Request, res: Response) => {
  const pathName = path.join(__dirname, "../files");
  //@ts-ignore
  const file: ServerFile = req.files.file;
  file.id = uuidv4();

  const nodesCurrentStatus = await getAllNodesData();

  const nodesArray = nodesCurrentStatus.map((node: nodeDataType) => ({
    nodeId: node.id,
    availableStorage: node.availableStorage,
  }));

  const dataNodesAvailablePercentage = nodeDivisionPercentage(nodesArray);
  const fileChunksArr = splitFile(file, dataNodesAvailablePercentage);

  const response = await uploadChunks(fileChunksArr);

  if (response.message === "success") {
    try {
      await addFile(file, "test");
      await addChunk(fileChunksArr);
      await updateDataNodes(fileChunksArr);
      res.status(200).send("success");
    } catch (error) {
      return res.status(500).send("fail");
    }
  } else {
    res.status(500).send("fail");
  }
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
  //   const data = JSON.parse(
  //     fs.readFileSync(`${__dirname}/../files/${file}`).toString()
  //   );
  //   chunkArr.push(Buffer.from(data.buffer));
  // });
  // console.log(chunkArr);
  // const fileConcat = Buffer.concat([chunkArr[0], chunkArr[1], chunkArr[2]]);
  // console.log(fileConcat);

  // fs.writeFileSync(`${__dirname}/../files/${file.name}`, fileConcat);
};

export const downloadFile = async (req: Request, res: Response) => {
  const { fileId } = req.query;
  try {
    const chunkArray = await getChunks(String(fileId));
    const chunkPromiseArray = chunkArray.map((chunk: any) => {
      return downloadChunks(String(fileId), chunk.nodeId);
    });

    const downloadedChunksArray = await Promise.all(chunkPromiseArray);

    downloadedChunksArray.sort((a: any, b: any) => {
      return a.index - b.index;
    });

    // console.log(downloadedChunksArray);
    const file = concatArrayOfChunks(downloadedChunksArray);
    fs.writeFileSync(`${__dirname}/password.txt`, file);
    console.log(file);
    res.status(200).json(file);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
