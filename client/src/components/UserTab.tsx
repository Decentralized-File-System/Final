import React from "react";
import { user } from "./SuperDashboard";
import Switch from "@material-ui/core/Switch";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Utils/Variables";
import "../App.css";

type userType = {
  user: user;
};

export const UserTab = ({ user }: userType) => {
  const [isAdmin, setIsAdmin] = useState(user.isAdmin);
  const switchHandler = async () => {
    // await axios.put(`${BASE_URL}/user`, [user]);
    setIsAdmin(!isAdmin);
  };

  return (
    <div className="user-tab">
      <div className="user-tab-id">{user.id}</div>
      <div className="user-tab-name">{user.name}</div>
      <div className="user-tab-email">{user.email}</div>
      <Switch
        className="user-tab-switch"
        checked={isAdmin}
        onChange={switchHandler}
        color="primary"
        inputProps={{ "aria-label": "primary checkbox" }}
      />
    </div>
  );
};
