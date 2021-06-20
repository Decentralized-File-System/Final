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
