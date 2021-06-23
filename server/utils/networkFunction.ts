import axios from "axios";
import { ChunkClass } from "./classes";
//@ts-ignore
import nodePorts from "../utils/ports.json";
const FormData = require("form-data");

export const uploadChunks = async (fileChunkArray: ChunkClass[]) => {
  try {
    const promiseArray = fileChunkArray.map((chunk, i) => {
      const form = new FormData();
      form.append("file", chunk.buffer);
      return axios({
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
    });
    try {
      await Promise.all(promiseArray);
    } catch (error) {
      console.log(error);
    }

    return { message: "success" };
  } catch (error) {
    return { message: error };
  }
};

export const downloadChunks = async (fileId: string, nodeId: number) => {
  const node = nodePorts.filter((node: any) => node.id === nodeId)[0];
  const nodeURL = `http://${node.host}:${node.port}/api/v1/file/download-file?fileId=${fileId}`;
  const res = await axios.get(nodeURL);
  return res.data;
};
