import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { BASE_URL } from "../Utils/Variables";
import { UserTab } from "./UserTab";
import { user } from "../types";
import { useData } from "../context/AppDataContext";
import { Settings } from "./Settings";
import Dashboard from "./Dashboard";

export default function SuperDashboard() {
  const { currentUser } = useAuth();
  const { currentPage } = useData();
  const [allUsers, setAllUsers] = useState<user[]>();
  const [errorDiv, setErrorDiv] = useState("");

  const getUsers = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/user/employees`,
        { user: currentUser },
        {
          withCredentials: true,
        }
      );
      setAllUsers(res.data.usersArray);
    } catch (error) {
      setErrorDiv(error.response.data.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="super-admin-div">
      {currentPage === "settings" ? (
        <Settings />
      ) : currentPage === "teamManagement" ? (
        <div className="super-admin-div-card">
          <h1 id="admin-management-title">Admin Management</h1>
          <div className="error-div">{errorDiv}</div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Set Admin</th>
              </tr>
            </thead>
            <tbody>
              {allUsers &&
                allUsers.map((user, i) => {
                  return <UserTab key={`${i} user`} user={user} />;
                })}
            </tbody>
          </table>
        </div>
      ) : currentPage === "dashboard" ? (
        <Dashboard />
      ) : null}
    </div>
  );
}
