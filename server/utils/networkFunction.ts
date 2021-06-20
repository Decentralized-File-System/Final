import axios from "axios";
import { ChunkClass } from "./classes";
//@ts-ignore
import nodePorts from "../utils/ports.json";
const FormData = require("form-data");

export const uploadChunks = async (fileChunkArray: ChunkClass[]) => {
  try {
    const promiseArray = fileChunkArray.map((chunk, i) => {
      const buffer = Buffer.from(JSON.stringify(chunk));
      const form = new FormData();
      form.append("file", buffer);
      const formHeaders = form.getHeaders();
      console.log(formHeaders);
      // form.submit(
      //   `http://${nodePorts[i].host}:${nodePorts[i].port}/api/v1/file/upload-file`,
      //   //@ts-ignore
      //   (err, res) => {
      //     if (err) {
      //       console.log(err);
      //     } else {
      //       res.resume();
      //     }
      //   }
      // );
      // return axios.post(
      //   `http://${nodePorts[i].host}:${nodePorts[i].port}/api/v1/file/upload-file`,
      //   form,
      //   {
      //     headers: formHeaders,
      //   }
      // );
      return axios({
        method: "post",
        url: `http://${nodePorts[i].host}:${nodePorts[i].port}/api/v1/file/upload-file`,
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
