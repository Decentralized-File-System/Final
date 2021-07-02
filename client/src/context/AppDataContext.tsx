import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL } from "../Utils/Variables";

const appDataContext = createContext<any>({});

export function useData() {
  return useContext(appDataContext);
}

export const DataProvider: React.FC = ({ children }) => {
  const [currentPage, setCurrentPage] = useState("files");
  const [statusesToChange, setStatusesToChange] = useState<any>([]);

  const updateStatuses = async () => {
    console.log(statusesToChange);
    if (statusesToChange.length !== 0) {
      try {
        for (const newStatus of statusesToChange) {
          await axios.put(
            `${BASE_URL}/task/update-status?taskId=${newStatus.taskId}&status=${newStatus.newStatus}`,
            {},
            { withCredentials: true }
          );
        }
        setStatusesToChange([]);
      } catch (error) {
        setStatusesToChange([]);
        console.log(error.message);
      }
    }
  };

  const value = {
    currentPage,
    setCurrentPage,
    setStatusesToChange,
    statusesToChange,
    updateStatuses,
  };

  return (
    <appDataContext.Provider value={value}>{children}</appDataContext.Provider>
  );
};
