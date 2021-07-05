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
  const [taskLoader, setTaskLoader] = useState(false);
  const [quote, setQuote] = useState<any>();
  const [contextTasks, setContextTasks] = useState<any>();
  const [pieChart, setPieChart] = useState({
    type: "pie",
    available: 0,
    inUse: 0,
  });
  const [pieData, setPieData] = useState<any>([]);

  const getDataNodesInfo = async () => {
    try {
      const res: any = await axios.get(`${BASE_URL}/data-nodes`, {
        withCredentials: true,
      });
      let available = 0;
      let totalStorage = 0;
      for (const dataNode of res.data) {
        console.log(dataNode);
        available += Number(dataNode.availableStorage);
        totalStorage += Number(dataNode.totalStorage);
      }
      console.log(totalStorage);
      console.log(available);
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
      console.log(error);
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
      console.log(error.message);
    }
  };
  useEffect(() => {
    getQuote();
    getDataNodesInfo();
  }, []);

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
    setContextTasks,
    contextTasks
  };

  return (
    <appDataContext.Provider value={value}>{children}</appDataContext.Provider>
  );
};
