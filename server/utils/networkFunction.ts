import axios from "axios";
import { Chunk } from "./classes";
//@ts-ignore
import nodePorts from "../utils/ports.json";

export const uploadChunks = async (fileChunkArray: Chunk[]) => {
  try {
    const promiseArray = fileChunkArray.map((chunk, i) => {
      return axios.post(
        `http://${nodePorts[i].host}:${nodePorts[i].port}/api/v1/file/upload-file`,
        { data: chunk }
      );
    });

    await Promise.all(promiseArray);
    console.log("success");
  } catch (error) {
    console.log(error);
  }
};
