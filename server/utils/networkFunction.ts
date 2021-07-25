import axios from "axios";
import { ChunkClass } from "./classes";
import nodePorts from "./ports";
import fs from "fs-extra";
import path from "path";
import { chunk } from "../types";

const FormData = require("form-data");

export const uploadChunks = async (
  fileChunkArray: ChunkClass[]
): Promise<string> => {
  for (const chunk of fileChunkArray) {
    const form = new FormData();
    form.append("file", chunk.buffer);
    try {
      await axios({
        method: "post",
        url: `${
          nodePorts[chunk.nodeId - 1].url
        }/api/v1/file/upload-file?fileId=${chunk.fileId}&index=${chunk.index}`,
        data: form,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": "multipart/form-data;boundary=" + form.getBoundary(),
        },
      });
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  return "success";
};

export const downloadChunks = async (
  fileId: string,
  nodeId: number,
  orderIndex: number,
  tempId: string
) => {
  const chunksFolder = `${__dirname}/../chunks`;
  const node = nodePorts.filter((node: any) => node.id === nodeId)[0];
  const nodeURL = `${node.url}/api/v1/file/download-file?fileId=${fileId}&index=${orderIndex}`;
  try {
    const res = await axios.get(nodeURL);
    fs.writeFileSync(
      path.join(chunksFolder, `${tempId}=${String(orderIndex)}`),
      Buffer.from(res.data, "base64")
    );
  } catch (error) {
    throw Error(error.message);
  }
};

export const deleteChunks = async (chunkArray: chunk[]) => {
  const promiseArray = chunkArray.map((chunk) => {
    return axios.delete(
      `${nodePorts[chunk.nodeId - 1].url}/api/v1/file?fileId=${chunk.fileId}`
    );
  });
  try {
    await Promise.all(promiseArray);
    return "success";
  } catch (error) {
    throw new Error(error);
  }
};
