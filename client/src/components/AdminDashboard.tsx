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
import Dashboard from "./Dashboard";

export const AdminDashboard = () => {
  const { currentPage } = useData();
  const { currentUser } = useAuth();
  return (
    <div>
      {currentPage === "files" ? (
        <>
          <FileTable />
          <UploadNewFileDialog />
        </>
      ) : currentPage === "tasks" ? (
        <>
          <CollapsibleTable />
          <AddNewTask />
        </>
      ) : currentPage === "settings" ? (
        <Settings />
      ) : currentPage === "teamManagement" ? (
        <TeamManagement />
      ) : currentPage === "dashboard" ? (
        <Dashboard />
      ) : null}
    </div>
  );
};
