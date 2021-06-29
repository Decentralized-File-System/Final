import React from "react";
import Table from "react-bootstrap/Table";
import { file } from "../types";
import File from "./File";

type fileTableProps = {
  files: file[];
};

function FileTable({ files }: fileTableProps) {
  return (
    <div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>File Name</th>
            <th>User Name</th>
            <th>Size</th>
            <th>Extension</th>
            <th>Uploaded at</th>
          </tr>
        </thead>
        <tbody>
          {files &&
            files.map((file: file, i: number) => (
              <File file={file} index={i} key={`${i}`} />
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default FileTable;
