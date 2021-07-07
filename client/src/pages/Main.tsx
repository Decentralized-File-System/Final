import React from "react";
import { AdminDashboard } from "../components/AdminDashboard";
import { EmployeeDashboard } from "../components/EmployeeDashboard";
import SuperDashboard from "../components/SuperDashboard";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/NewSidebar";

export const Main = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      {currentUser.isSuperAdmin ? (
        <>
          <Sidebar />
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
