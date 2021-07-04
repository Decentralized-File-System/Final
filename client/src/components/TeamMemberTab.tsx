import React from "react";
import { user } from "../types";
import "../App.css";
import Button from "react-bootstrap/esm/Button";

type userType = {
  user: user;
  index: number;
  removeMember?: Function;
  addMember?: Function;
};

export const TeamMemberTab = ({
  user,
  index,
  removeMember,
  addMember,
}: userType) => {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <Button
          onClick={
            removeMember
              ? () => removeMember(user)
              : addMember
              ? () => addMember(user)
              : () => {}
          }
        >
          {removeMember ? "Remove" : "Add"}
        </Button>
      </td>
    </tr>
  );
};
