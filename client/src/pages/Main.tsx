import React from "react";
import { AdminDashboard } from "../components/AdminDashboard";
import { EmployeeDashboard } from "../components/EmployeeDashboard";
import File from "../components/File";
import Header from "../components/Header";
import SuperDashboard from "../components/SuperDashboard";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/newSidebar";

export const Main = () => {
  const { currentUser } = useAuth();
  return (
    <div>
      <Header />
      {currentUser.isSuperAdmin ? (
        <>
          <SuperDashboard />
        </>
      ) : currentUser.isAdmin ? (
        <>
          <Sidebar />
          <AdminDashboard />
        </>
      ) : (
        <>
          <Sidebar />
          <EmployeeDashboard />
        </>
      )}
    </div>
  );
};
