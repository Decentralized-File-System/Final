import { useState } from "react";
import FileTable from "./FileTable";
import { useData } from "../context/AppDataContext";
import UploadNewFileDialog from "./UploadFileForm";
import CollapsibleTable from "./CollapsibleTable";
import AddNewTask from "./AddNewTask";
import { Settings } from "./Settings";
import Dashboard from "./Dashboard";

export const EmployeeDashboard = () => {
  const { currentPage } = useData();
  const [loaded, setLoaded] = useState(0);
  const [showBar, setShowBar] = useState(false);

  return (
    <div id="employee-dashboard">
      {currentPage === "files" ? (
        <>
          <FileTable
            loaded={loaded}
            showBar={showBar}
            setLoaded={setLoaded}
            setShowBar={setShowBar}
          />
          <UploadNewFileDialog setLoaded={setLoaded} setShowBar={setShowBar} />
        </>
      ) : currentPage === "tasks" ? (
        <>
          <CollapsibleTable />
          <AddNewTask />
        </>
      ) : currentPage === "settings" ? (
        <Settings />
      ) : currentPage === "dashboard" ? (
        <Dashboard />
      ) : null}
    </div>
  );
};
