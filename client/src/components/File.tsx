import React from "react";
import { file } from "../types";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { BASE_URL } from "../Utils/Variables";

type fileType = {
  file: file;
  index: number;
};

const File = ({ file, index }: fileType) => {
  const downloadHandler = async () => {
    try {
      console.log("download")
      const res = await axios.get(
        `${BASE_URL}/file/download-file?fileId=${file.id}&&fileName=${file.name}`,
        { responseType: "blob", withCredentials: true }
      );
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", file.name);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{file.name}</td>
      <td>{file.userId}</td>
      <td>{file.size}</td>
      <td>{file.type}</td>
      <td>{new Date(file.createdAt).toDateString()}</td>
      <td>
        <Button onClick={downloadHandler} variant="outline-success">
          Download
        </Button>
      </td>
    </tr>
  );
};

export default File;
