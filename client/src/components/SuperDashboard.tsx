import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { BASE_URL } from "../Utils/Variables";
import { UserTab } from "./UserTab";

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
    <div>
      <h1>Super user</h1>
      {allUsers &&
        allUsers.map((user) => {
          return <UserTab user={user} />;
        })}
    </div>
  );
}
