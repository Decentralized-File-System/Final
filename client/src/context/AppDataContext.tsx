import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { file, task } from "../types";
import { BASE_URL } from "../Utils/Variables";
import { useAuth } from "./AuthContext";

const appDataContext = createContext<any>({});

export function useData() {
  return useContext(appDataContext);
}

export const DataProvider: React.FC = ({ children }) => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState<file[]>([]);
  const [tasks, setTasks] = useState<task[]>([]);
  const [tasksError, setTasksError] = useState(false);
  const [filesError, setFilesError] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [statusesToChange, setStatusesToChange] = useState<any>([]);
  const [taskLoader, setTaskLoader] = useState(false);
  const [quote, setQuote] = useState<any>();
  const [pieChart, setPieChart] = useState({
    type: "pie",
    available: 0,
    inUse: 0,
  });
  const [pieData, setPieData] = useState<any>([]);

  const getTasks = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/task/all-tasks?teamId=${currentUser.teamId}`,
        { withCredentials: true }
      );
      setTasks(res.data);
    } catch (error) {
      setTasksError(true);
    }
  };

  const getFiles = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/file/files?teamId=${currentUser.teamId}`,
        { withCredentials: true }
      );
      setFiles(res.data);
    } catch (error) {
      setFilesError(true);
    }
  };

  const getDataNodesInfo = async () => {
    try {
      const res: any = await axios.get(`${BASE_URL}/data-nodes`, {
        withCredentials: true,
      });
      let available = 0;
      let totalStorage = 0;
      for (const dataNode of res.data) {
        available += Number(dataNode.availableStorage);
        totalStorage += Number(dataNode.totalStorage);
      }
      const inUse = totalStorage - available;
      setPieChart({
        type: "pie",
        available: available,
        inUse: inUse,
      });
      setPieData([
        { name: "available", value: available },
        { name: "in-use", value: inUse },
      ]);
    } catch (error) {
      throw Error(error);
    }
  };

  const getQuote = async () => {
    try {
      const randomQuoteId = Math.floor(Math.random() * 1000) + 1;
      const quote = await axios.get(`${BASE_URL}/quote?id=${randomQuoteId}`, {
        withCredentials: true,
      });
      setQuote(quote.data);
    } catch (error) {
      throw Error(error);
    }
  };

  useEffect(() => {
    try {
      if (currentUser) {
        getFiles();
        getTasks();
        getQuote();
        getDataNodesInfo();
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  }, [currentUser]);

  const updateStatuses = async () => {
    if (statusesToChange.length !== 0) {
      setTaskLoader(true);
      try {
        for (const newStatus of statusesToChange) {
          await axios.put(
            `${BASE_URL}/task/update-status?taskId=${newStatus.taskId}&status=${newStatus.newStatus}`,
            {},
            { withCredentials: true }
          );
        }
        setTaskLoader(false);
        setStatusesToChange([]);
      } catch (error) {
        setTaskLoader(false);
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
    taskLoader,
    quote,
    pieData,
    files,
    setFiles,
    getFiles,
    tasks,
    setTasks,
    getTasks,
    tasksError,
    filesError,
    getDataNodesInfo,
  };

  return (
    <appDataContext.Provider value={value}>
      {!loading && children}
    </appDataContext.Provider>
  );
};
