import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import FileActions from "./FileActions";
import { useAuth } from "../context/AuthContext";
import FileTable from "./FileTable";
import { TaskTable } from "./TaskTable";
import { useData } from "../context/AppDataContext";
import { BASE_URL } from "../Utils/Variables";
import { file, task } from "../types";

export const EmployeeDashboard = () => {
  const { currentPage } = useData();
  const [files, setFiles] = useState<file[]>([]);
  const [tasks, setTasks] = useState<task[]>([]);
  const { currentUser } = useAuth();

  const getTasks = async () => {
    const res = await axios.get(
      `${BASE_URL}/task/all-tasks?teamId=${currentUser.teamId}`,
      { withCredentials: true }
    );
    setTasks(res.data);
  };

  const getFiles = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/file/files?teamId=${currentUser.teamId}`,
        { withCredentials: true }
      );
      console.log(res.data);
      setFiles(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTasks();
    getFiles();
  }, []);

  return (
    <div>
      {currentPage === "files" ? (
        <>
          <FileTable files={files} />
          <FileActions />
        </>
      ) : currentPage === "tasks" ? (
        <TaskTable tasks={tasks} />
      ) : null}
    </div>
  );
};
