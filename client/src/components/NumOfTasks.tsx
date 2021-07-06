import React, { useState } from "react";
import { useEffect } from "react";
import { useData } from "../context/AppDataContext";

function NumOfTasks() {
  const { tasks } = useData();
  const [numOfTasks, setNumOfTasks] = useState(0);

  function animateValue(start: number, end: number, duration: number) {
    if (start === end) return;
    let range = end - start;
    let current = start;
    let increment = end > start ? 1 : -1;
    let stepTime = Math.abs(Math.floor(duration / range));
    let timer = setInterval(function () {
      current += increment;
      setNumOfTasks(current);
      if (current === end) {
        clearInterval(timer);
      }
    }, stepTime);
  }

  useEffect(() => {
    let duration = 0;
    if (tasks.length >= 0 && tasks.length <= 20) {
      duration = 1500;
    }
    if (tasks.length >= 20 && tasks.length <= 40) {
      duration = 3000;
    }
    if (tasks.length >= 40 && tasks.length <= 60) {
      duration = 4000;
    }
    if (tasks.length >= 60) {
      duration = 5000;
    }
    animateValue(0, tasks.length, duration);
  }, [tasks]);

  return (
    <>
      <div>
        <h4 className="roboto-font">Number of Tasks</h4>
        <div className="num-of-tasks">{numOfTasks}</div>
      </div>
    </>
  );
}

export default NumOfTasks;
