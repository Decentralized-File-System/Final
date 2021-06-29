import React from "react";
import { task } from "../types";

type propsType = {
  tasks: task[];
};

export const TaskTable = ({ tasks }: propsType) => {
  return (
    <div>
      <h1>Task table</h1>
      <table className="table">
        <thead>
          <th>title</th>
          <th>content</th>
          <th></th>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
};
