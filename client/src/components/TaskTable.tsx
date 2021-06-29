import React from "react";
import { useState, useEffect } from "react";

export type task = {};

export const TaskTable = () => {
  const [tasks, setTasks] = useState([]);

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
