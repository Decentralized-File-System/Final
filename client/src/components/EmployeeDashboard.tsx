import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import FileTable from "./FileTable";
import { useData } from "../context/AppDataContext";
import { BASE_URL } from "../Utils/Variables";
import { file, task } from "../types";
import UploadNewFileDialog from "./UploadFileForm";
import CollapsibleTable from "./CollapsibleTable";
import AddNewTask from "./AddNewTask";
import { Settings } from "./Settings";

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
    console.log("Setting new task");
    setTasks(res.data);
  };

  const getFiles = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/file/files?teamId=${currentUser.teamId}`,
        { withCredentials: true }
      );
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
          <FileTable files={files} getFiles={getFiles} setFiles={setFiles} />
          <UploadNewFileDialog getFiles={getFiles} />
        </>
      ) : currentPage === "tasks" ? (
        <>
          <CollapsibleTable
            getTasks={getTasks}
            tasks={tasks}
            setTasks={setTasks}
          />
          <AddNewTask getTasks={getTasks} />
        </>
      ) : currentPage === "settings" ? (
        <Settings />
      ) : null}
    </div>
  );
};
