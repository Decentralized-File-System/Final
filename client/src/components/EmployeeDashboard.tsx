import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import File from "./File";
import Table from "react-bootstrap/Table";

export type file = {
  id: number;
  name: string;
  userId: number;
  teamId: string;
  type: string;
  size: string;
};

const mockFiles = [
  {
    id: 1,
    name: "Text.txt",
    userId: 1,
    teamId: "team 1",
    type: "text",
    size: "150kb",
  },
  {
    id: 2,
    name: "movie.mp4",
    userId: 1,
    teamId: "team 1",
    type: "mp4",
    size: "1.2gb",
  },
];

export const EmployeeDashboard = () => {
  const [files, setFiles] = useState<file[]>([]);
  //   const getFiles = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:3001/api/v1/file");
  //       setFiles(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  useEffect(() => {
    //   getFiles()
    setFiles(mockFiles);
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
    </div>
  );
};
