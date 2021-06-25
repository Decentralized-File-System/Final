import axios from "axios";
import { ChunkClass } from "./classes";
//@ts-ignore
import nodePorts from "../utils/ports.json";
import fs from "fs-extra";
import path from "path";

const FormData = require("form-data");

export const uploadChunks = async (
  fileChunkArray: ChunkClass[]
): Promise<string> => {
  // const promiseArray = fileChunkArray.map((chunk, i) => {
  //   console.log("chunk sent");
  //   console.log(chunk.buffer.byteLength);
  //   console.log(
  //     `http://${nodePorts[chunk.nodeId - 1].host}:${
  //       nodePorts[chunk.nodeId - 1].port
  //     }/api/v1/file/upload-file?fileId=${chunk.fileId}&index=${chunk.index}`
  //   );
  //   const form = new FormData();
  //   form.append("file", chunk.buffer);
  //   return axios({
  //     method: "post",
  //     url: `http://${nodePorts[chunk.nodeId - 1].host}:${
  //       nodePorts[chunk.nodeId - 1].port
  //     }/api/v1/file/upload-file?fileId=${chunk.fileId}&index=${chunk.index}`,
  //     data: form,
  //     maxContentLength: Infinity,
  //     maxBodyLength: Infinity,
  //     headers: {
  //       "Content-Type": "multipart/form-data;boundary=" + form.getBoundary(),
  //     },
  //   });
  // });
  // try {
  //   await Promise.all(promiseArray);
  // } catch (error) {
  //   return { message: error.message };
  // }

  // return { message: "success" };

  for (const chunk of fileChunkArray) {
    console.log("chunk sent");
    console.log(chunk.buffer.byteLength);
    console.log(
      `http://${nodePorts[chunk.nodeId - 1].host}:${
        nodePorts[chunk.nodeId - 1].port
      }/api/v1/file/upload-file?fileId=${chunk.fileId}&index=${chunk.index}`
    );
    const form = new FormData();
    form.append("file", chunk.buffer);
    try {
      await axios({
        method: "post",
        url: `http://${nodePorts[chunk.nodeId - 1].host}:${
          nodePorts[chunk.nodeId - 1].port
        }/api/v1/file/upload-file?fileId=${chunk.fileId}&index=${chunk.index}`,
        data: form,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": "multipart/form-data;boundary=" + form.getBoundary(),
        },
      });
    } catch (error) {
      console.log("return error");
      return error.message;
    }
  }
  console.log("return success");

  return "success";
};

export const downloadChunks = async (
  fileId: string,
  nodeId: number,
  orderIndex: number
) => {
  const chunksFolder = `${__dirname}/../chunks`;
  const node = nodePorts.filter((node: any) => node.id === nodeId)[0];
  const nodeURL = `http://${node.host}:${node.port}/api/v1/file/download-file?fileId=${fileId}&index=${orderIndex}`;
  try {
    const res = await axios.get(nodeURL);
    fs.writeFile(
      path.join(chunksFolder, String(orderIndex)),
      Buffer.from(res.data, "base64"),
      (err) => {
        if (err) {
          throw new Error("Failed to download" + err.message);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
