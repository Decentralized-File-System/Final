import axios from "axios";
import { ChunkClass } from "./classes";
//@ts-ignore
import nodePorts from "../utils/ports.json";

export const uploadChunks = async (fileChunkArray: ChunkClass[]) => {
  try {
    const promiseArray = fileChunkArray.map((chunk, i) => {
      return axios.post(
        `http://${nodePorts[i].host}:${nodePorts[i].port}/api/v1/file/upload-file`,
        { data: chunk }
      );
    });

    await Promise.all(promiseArray);

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
