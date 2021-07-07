import React from "react";
import { user } from "../types";
import Switch from "@material-ui/core/Switch";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Utils/Variables";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../App.css";

const swal = withReactContent(Swal);

type userType = {
  user: user;
};

export const UserTab = ({ user }: userType) => {
  const [isAdmin, setIsAdmin] = useState(user.isAdmin);
  const switchHandler = async () => {
    try {
      const res = await axios.put(
        `${BASE_URL}/user/change-props?isAdmin=${!isAdmin}`,
        [user],
        {
          withCredentials: true,
        }
      );
      setIsAdmin(!isAdmin);
      swal.fire({
        title: "✔",
        text: res.data,
        timer: 3000,
        showConfirmButton: true,
      });
    } catch (error) {
      swal.fire({
        title: "Attention!",
        text: error.response.data.message,
        timer: 3000,
        showConfirmButton: true,
      });
    }
  };

  return (
    <tr>
      <th scope="row">{user.id}</th>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <Switch
          className="user-tab-switch"
          checked={isAdmin}
          onChange={switchHandler}
          color="primary"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </td>
    </tr>
  );
};
