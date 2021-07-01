import React from "react";
import Table from "react-bootstrap/Table";
import { file } from "../types";
import File from "./File";

type fileTableProps = {
  files: file[];
  getFiles: Function;
};
const whiteRowStyle = {
  background: "white",
};

function FileTable({ files, getFiles }: fileTableProps) {
  return (
    <div className="fileTable-container">
      <div>
        <Table striped bordered hover size="sm" className="file-Table">
          <thead style={whiteRowStyle}>
            <tr>
              <th>#</th>
              <th>File Name</th>
              <th>User</th>
              <th>Size</th>
              <th>Extension</th>
              <th>Uploaded at</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            {files &&
              files.map((file: file, i: number) => (
                <File getFiles={getFiles} file={file} index={i} key={`${i}`} />
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default FileTable;
