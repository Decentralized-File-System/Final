import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import FileActions from "./FileActions";
import { useAuth } from "../context/AuthContext";
import FileTable from "./FileTable";
import { TaskTable } from "./TaskTable";
import { useData } from "../context/AppDataContext";
export type file = {
  id: number;
  name: string;
  userId: number;
  teamId: string;
  type: string;
  size: number;
  createdAt: Date;
};

export const EmployeeDashboard = () => {
  const { currentPage } = useData();
  const [files, setFiles] = useState<file[]>([]);
  const { currentUser } = useAuth();
  const getFiles = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/api/v1/file/files?teamId=${currentUser.teamId}`,
        { withCredentials: true }
      );
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
      <FileTable files={files} />
      <FileActions />
      <TaskTable />
    </div>
  );
};
