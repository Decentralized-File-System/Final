import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { BASE_URL } from "../Utils/Variables";
import { UserTab } from "./UserTab";
import Clock from "./Clock";

export type user = {
  id: string;
  name: string;
  teamId: string | null;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  email: string;
};

export default function SuperDashboard() {
  const { currentUser } = useAuth();
  const [allUsers, setAllUsers] = useState<user[]>();

  const getUsers = async () => {
    if (currentUser) {
      const res = await axios.post(
        `${BASE_URL}/user/employees`,
        { user: currentUser },
        {
          withCredentials: true,
        }
      );
      setAllUsers(res.data.usersArray);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="super-admin-div">
      <h1 id="admin-management-title">Admin Management</h1>
      <div className="super-admin-users-div"></div>
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
  );
}
