import React from "react";
import { file } from "../types";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { BASE_URL } from "../Utils/Variables";
import { useAuth } from "../context/AuthContext";
import DeleteDialog from "./DeleteDialog";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { bytesToSize } from "../Utils/function";

const swal = withReactContent(Swal);

type fileType = {
  file: file;
  index: number;
  getFiles: Function;
};
const whiteRowStyle = {
  background: "white",
};
const grayRowStyle = {
  background: "#f2f2f2",
};

const File = ({ file, index, getFiles }: fileType) => {
  const { currentUser } = useAuth();
  const downloadHandler = async () => {
    try {
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
    <>
      {index % 2 === 0 ? (
        <tr style={grayRowStyle}>
          <td>{index + 1}</td>
          <td>{file.name}</td>
          <td>{file.userId}</td>
          <td>{bytesToSize(String(file.size))}</td>
          <td>{file.type}</td>
          <td>{new Date(file.createdAt).toDateString()}</td>
          <td className="td-class">
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Button onClick={downloadHandler} variant="outline-success">
                Download
              </Button>
              {currentUser.isAdmin || currentUser.email === file.userId ? (
                <DeleteDialog file={file} getFiles={getFiles} />
              ) : null}
            </div>
          </td>
        </tr>
      ) : (
        <tr style={whiteRowStyle}>
          <td>{index + 1}</td>
          <td>{file.name}</td>
          <td>{file.userId}</td>
          <td>{bytesToSize(String(file.size))}</td>
          <td>{file.type}</td>
          <td>{new Date(file.createdAt).toDateString()}</td>
          <td className="td-class">
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Button onClick={downloadHandler} variant="outline-success">
                Download
              </Button>
              {currentUser.isAdmin || currentUser.email === file.userId ? (
                <DeleteDialog file={file} getFiles={getFiles} />
              ) : null}
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default File;
