import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import FileTable from "./FileTable";
import { Settings } from "./Settings";
import { useData } from "../context/AppDataContext";
import { BASE_URL } from "../Utils/Variables";
import { file, task } from "../types";
import UploadNewFileDialog from "./UploadFileForm";
import CollapsibleTable from "./CollapsibleTable";
import AddNewTask from "./AddNewTask";
import { TeamManagement } from "./TeamManagement";

export const AdminDashboard = () => {
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
          <FileTable files={files} getFiles={getFiles} />
          <UploadNewFileDialog getFiles={getFiles} />
        </>
      ) : currentPage === "tasks" ? (
        <>
          <CollapsibleTable tasks={tasks} />
          <AddNewTask />
        </>
      ) : currentPage === "settings" ? (
        <Settings />
      ) : currentPage === "teamManagement" ? (
        <TeamManagement />
      ) : null}
    </div>
  );
};
