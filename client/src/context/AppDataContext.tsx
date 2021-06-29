import React, { createContext, useContext, useEffect, useState } from "react";

const appDataContext = createContext<any>({});

export function useData() {
  return useContext(appDataContext);
}

export const DataProvider: React.FC = ({ children }) => {
  const [currentPage, setCurrentPage] = useState("files");

  const value = {
    currentPage,
    setCurrentPage,
  };

  return (
    <appDataContext.Provider value={value}>{children}</appDataContext.Provider>
  );
};
