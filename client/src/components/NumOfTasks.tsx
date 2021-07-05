import React, { useState } from "react";
import { useEffect } from "react";
import { useData } from "../context/AppDataContext";

function NumOfTasks() {
  const { contextTasks } = useData();
  const [numOfTasks, setNumOfTasks] = useState(0);

  function animateValue(start: number, end: number, duration: number) {
    if (start === end) return;
    var range = end - start;
    var current = start;
    var increment = end > start ? 1 : -1;
    var stepTime = Math.abs(Math.floor(duration / range));
    var timer = setInterval(function () {
      current += increment;
      setNumOfTasks(current);
      if (current == end) {
        clearInterval(timer);
      }
    }, stepTime);
  }

  useEffect(() => {
    // animateValue(0, contextTasks.length, (contextTasks.length / 5) *1000);
    let duration = 0;
    if (contextTasks.length >= 0 && contextTasks.length <= 20) {
      duration = 1500;
    }
    if (contextTasks.length >= 20 && contextTasks.length <= 40) {
      duration = 3000;
    }
    if (contextTasks.length >= 40 && contextTasks.length <= 60) {
      duration = 4000;
    }
    if (contextTasks.length >= 60) {
      duration = 5000;
    }
    animateValue(0, contextTasks.length, duration);
  }, []);

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
