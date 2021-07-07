import { useState } from "react";
import FileTable from "./FileTable";
import { Settings } from "./Settings";
import { useData } from "../context/AppDataContext";
import UploadNewFileDialog from "./UploadFileForm";
import CollapsibleTable from "./CollapsibleTable";
import AddNewTask from "./AddNewTask";
import { TeamManagement } from "./TeamManagement";
import Dashboard from "./Dashboard";

export const AdminDashboard = () => {
  const { currentPage } = useData();
  const [loaded, setLoaded] = useState(0);
  const [showBar, setShowBar] = useState(false);

  return (
    <div>
      {currentPage === "files" ? (
        <>
          <FileTable loaded={loaded} showBar={showBar} />
          <UploadNewFileDialog setLoaded={setLoaded} setShowBar={setShowBar} />
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
