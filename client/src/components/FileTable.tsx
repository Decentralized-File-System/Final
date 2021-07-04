import React from "react";
import Table from "react-bootstrap/Table";
import { file } from "../types";
import File from "./File";
import { TableActions } from "./TableActions";

type fileTableProps = {
  files: file[];
  getFiles: Function;
  setFiles: React.Dispatch<React.SetStateAction<file[]>>;
};

function FileTable({ files, getFiles, setFiles }: fileTableProps) {
  return (
    <div className="fileTable-container">
      <TableActions files={files} setFiles={setFiles} />
      <Table striped bordered hover size="sm" className="file-Table">
        <thead>
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
  );
}

export default FileTable;
