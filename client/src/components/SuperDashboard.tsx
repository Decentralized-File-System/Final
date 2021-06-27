import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { UserTab } from "./UserTab";

export type user = {
  id: string;
  name: string;
  teamId: string | null;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  email: string;
};

const mockUsers = [
  {
    id: "1",
    name: "ophir",
    teamId: null,
    isAdmin: false,
    isSuperAdmin: false,
    email: "ophir@ophir.com",
  },
  {
    id: "2",
    name: "dvir",
    teamId: null,
    isAdmin: true,
    isSuperAdmin: false,
    email: "ophir@ophir.com",
  },
  {
    id: "3",
    name: "omer",
    teamId: null,
    isAdmin: false,
    isSuperAdmin: false,
    email: "omer@ophir.com",
  },
  {
    id: "4",
    name: "eran",
    teamId: null,
    isAdmin: false,
    isSuperAdmin: false,
    email: "eran@ophir.com",
  },
  {
    id: "5",
    name: "david",
    teamId: null,
    isAdmin: false,
    isSuperAdmin: false,
    email: "david@ophir.com",
  },
];

export default function SuperDashboard() {
  const [allUsers, setAllUsers] = useState<user[]>();

  useEffect(() => {
    setAllUsers(mockUsers);
  }, []);

  return (
    <div>
      <h1>Super user</h1>
      {allUsers
        ? allUsers.map((user) => {
            return <UserTab user={user} />;
          })
        : null}
    </div>
  );
}
