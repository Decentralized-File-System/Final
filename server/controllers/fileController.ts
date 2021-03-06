import { Request, Response } from "express";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { ServerFile, nodeDataType } from "../types";
import fs, { readFileSync, writeFileSync } from "fs-extra";
import {
  splitFile,
  nodeDivisionPercentage as nodeDivisionPercentage,
  concatArrayOfChunks,
  storagePerNode,
} from "../utils/functions";
import {
  getAllNodesData,
  addChunk,
  addFile,
  updateDataNodes,
  getChunks,
  getFilesByTeamId,
  getFileById,
  dataNodeStorageAfterDelete,
  deleteFileAndChunks,
  getFileByName,
} from "../DBQueries/fileQueries";
import {
  uploadChunks,
  downloadChunks,
  deleteChunks,
} from "../utils/networkFunction";
import { ChunkClass } from "../utils/classes";

const mainPath = path.join(__dirname, "../main");
const chunkPath = path.join(__dirname, "../chunks");
fs.ensureDir(mainPath);

export const saveFilePost = async (req: Request, res: Response) => {
  req.pipe(req.busboy); // Pipe it trough busboy
  const fileSize: number = Number(req.query.size);
  const fileType: string = String(req.query.type);
  const teamId: string = String(req.query.teamId);
  const username: string = String(req.query.username);
  const description: string = String(req.query.description);
  console.log(description);
  req.busboy.on("file", (fieldName, file, filename) => {
    console.log(`Upload of '${filename}' started`);

    // Create a write stream of the new file
    const fStream = fs.createWriteStream(path.join(mainPath, filename));

    // Pipe it trough
    file.pipe(fStream);

    // On finish of the upload
    fStream.on("close", async () => {
      console.log(`Upload of '${filename}' finished`);

      //Getting all nodes
      const nodesCurrentStatus = await getAllNodesData();
      const nodesArray = nodesCurrentStatus.map((node: nodeDataType) => ({
        nodeId: node.id,
        availableStorage: node.availableStorage,
      }));

      //getting available percent for each node
      const dataNodesAvailablePercentage = nodeDivisionPercentage(nodesArray);
      const storagePerNodeArr = storagePerNode(
        fileSize,
        dataNodesAvailablePercentage
      );

      const highWaterMark = fileSize > 2097152 ? 2097152 : 1;
      const readStream = fs.createReadStream(path.join(mainPath, filename), {
        highWaterMark: highWaterMark,
      });
      let bufferBulk: Buffer[] = [];
      const bufferBulkArray: any = [];
      let index = 0;
      console.log("reading started");

      readStream.on("data", (chunk: Buffer) => {
        if (
          bufferBulk.length * highWaterMark <
          storagePerNodeArr[index].storage
        ) {
          bufferBulk.push(chunk);
        } else {
          bufferBulkArray.push(bufferBulk);
          bufferBulk = [chunk];
          index += 1;
        }
      });

      //After finishing reading the file
      readStream.on("end", async () => {
        bufferBulkArray.push(bufferBulk);

        const dataBaseFileInfo = {
          name: filename,
          type: fileType,
          size: fileSize,
          description: description,
          id: uuidv4(),
        };

        const fileChunkArray = bufferBulkArray.map(
          (buffer: Buffer[], i: number) => {
            return new ChunkClass(
              Buffer.concat(buffer),
              i + 1,
              dataBaseFileInfo.id,
              storagePerNodeArr[i].nodeId
            );
          }
        );

        //Uploading chunks to data nodes
        const response = await uploadChunks(fileChunkArray);

        try {
          //Deleting file
          await fs.unlink(path.join(mainPath, filename));
          console.log("File successfully deleted");
        } catch (error) {
          console.log(error);
          console.error("Failed to delete file");
        }

        //If uploading chunks was successful updating the DB
        if (response === "success") {
          try {
            await addFile(dataBaseFileInfo, username, teamId);
            await addChunk(fileChunkArray);
            await updateDataNodes(fileChunkArray);
            res.status(200).json({ message: "success" });
          } catch (error) {
            console.log(error);
            return res
              .status(500)
              .json({ message: "Failed to update database" });
          }
        } else {
          return res.status(500).json({ message: "Failed to upload chunks" });
        }
      });
    });

    fStream.on("error", (err) => {
      fs.unlinkSync(path.join(mainPath, filename));
      console.log(err);
      return res.status(500).json({ message: "Stream error" });
    });
  });
};

//Downloading chunks from data nodes-----------------------------------------------
export const downloadFile = async (req: Request, res: Response) => {
  const { fileId, fileName } = req.query;
  const tempId = uuidv4();
  const chunksFolderPath = `${__dirname}/../chunks`;
  let bufferArray: any = [];

  try {
    //getting chunks info from DB
    const chunkArray = await getChunks(String(fileId));
    const promiseArr = chunkArray.map((chunk: any) => {
      return downloadChunks(
        String(fileId),
        chunk.nodeId,
        chunk.orderIndex,
        tempId
      );
    });
    await Promise.all(promiseArr);

    const chunksFiles = fs.readdirSync(chunksFolderPath);

    const promiseArray = chunksFiles
      .map((file) => {
        if (file.includes(tempId)) {
          return fs.readFile(path.join(chunksFolderPath, file));
        }
      })
      .filter((file) => file !== undefined);

    try {
      // Getting all chunks buffers from local server
      bufferArray = await Promise.all(promiseArray);

      //Concat to one buffer
      bufferArray = Buffer.concat(bufferArray);
      fs.writeFileSync(
        `${__dirname}/../main/${tempId}=${fileName}`,
        bufferArray
      );
      console.log("write file success");
      const chunkFileDir = fs.readdirSync(chunkPath);
      console.log("Read dir success");

      //Deleting chunks from local server
      const chunkPromise = chunkFileDir
        .map((chunk) => {
          if (chunk.includes(tempId)) {
            return fs.unlink(path.join(chunkPath, chunk));
          }
        })
        .filter((chunk) => chunk !== undefined);

      await Promise.all(chunkPromise);
      console.log("Deleted chunks successfully");
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Failed to download file" });
    }
    return res
      .status(200)
      .download(path.join(mainPath, `${tempId}=${String(fileName)}`), (err) => {
        if (err) {
          throw err;
        } else {
          //Deleting file from local server
          fs.unlink(
            path.join(mainPath, `${tempId}=${String(fileName)}`),
            (err) => {
              if (err) {
                throw err;
              }
            }
          );
        }
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to download file" });
  }
};

//Get all files of a specific team-----------------------------------------
export const filesGet = async (req: Request, res: Response) => {
  const { teamId }: any = req.query;
  if (!teamId) {
    return res.status(401).json({ message: "Bad request" });
  }
  try {
    const fileArray = await getFilesByTeamId(teamId);
    return res.status(200).json(fileArray);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to get files" });
  }
};

//Get all files of a specific team and name-----------------------------------------
export const fileByNameGet = async (req: Request, res: Response) => {
  const { text, teamId }: any = req.query;
  if (!teamId) {
    return res.status(401).json({ message: "Bad request" });
  }
  try {
    const fileArray = await getFileByName(text, teamId);
    return res.status(200).json(fileArray);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to get files" });
  }
};

//Remove specific file-----------------------------------------------------
export const deleteFile = async (req: Request, res: Response) => {
  const { fileId }: any = req.query;
  const chunks = await getChunks(fileId);
  try {
    await dataNodeStorageAfterDelete(chunks);
    await deleteFileAndChunks(fileId);
    await deleteChunks(chunks);
    return res.status(200).json({ message: "Success deleting file" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error deleting file" });
  }
};
