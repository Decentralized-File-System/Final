import { useState } from "react";
import { file } from "../types";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { BASE_URL } from "../Utils/Variables";
import { useAuth } from "../context/AuthContext";
import DeleteDialog from "./DeleteDialog";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { bytesToSize } from "../Utils/function";
import Typography from "@material-ui/core/Typography";

const swal = withReactContent(Swal);

type fileType = {
  file: file;
  index: number;
};

const File = ({ file, index }: fileType) => {
  const [descriptionDivShown, setDescriptionDivShown] = useState(false);
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
      swal.fire({
        title: "Attention!",
        text: "Failed to download file",
        timer: 3000,
        showConfirmButton: true,
      });
    }
  };

  return (
    <>
      <tr className="file-tr">
        <td>{index + 1}</td>
        <td>
          {file.name}{" "}
          {file.description ? (
            <span
              id="description-question-mark"
              onMouseEnter={() => setDescriptionDivShown(true)}
              onMouseLeave={() => setDescriptionDivShown(false)}
              style={{ float: "right" }}
            >
              ❔
            </span>
          ) : null}
        </td>
        <td>{file.userId}</td>
        <td>{bytesToSize(String(file.size))}</td>
        <td>{file.type.split("/")[1]}</td>
        <td>{new Date(file.createdAt).toDateString()}</td>
        <td className="td-class">
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Button onClick={downloadHandler} variant="outline-success">
              Download
            </Button>
            {currentUser.isAdmin || currentUser.name === file.userId ? (
              <DeleteDialog file={file} />
            ) : null}
          </div>
        </td>
      </tr>
      {descriptionDivShown ? (
        <div className="file-description-div-container">
          <Typography className="file-description-div">
            {file.description}
          </Typography>
        </div>
      ) : null}
    </>
  );
};

export default File;
