import React from "react";
import { AdminDashboard } from "../components/AdminDashboard";
import { EmployeeDashboard } from "../components/EmployeeDashboard";
import SuperDashboard from "../components/SuperDashboard";
import { useAuth } from "../context/AuthContext";

export const Main = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      {currentUser.isSuperAdmin ? (
        <SuperDashboard />
      ) : currentUser.isAdmin ? (
        <AdminDashboard />
      ) : (
        <EmployeeDashboard />
      )}
    </div>
  );
};
