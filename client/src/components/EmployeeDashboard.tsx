import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import File from "./File";
import Table from "react-bootstrap/Table";
import FileActions from "./FileActions";

export type file = {
  id: number;
  name: string;
  userId: number;
  teamId: string;
  type: string;
  size: number;
};

export const EmployeeDashboard = () => {
  const [files, setFiles] = useState<file[]>([]);
  const getFiles = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/v1/file/files");
      console.log(res.data);
      setFiles(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFiles();
  }, []);

  return (
    <div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody></tbody>
      </Table>
      {files.map((file: file) => (
        <File file={file} />
      ))}
      <FileActions />
    </div>
  );
};
