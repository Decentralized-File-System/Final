import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useData } from "../context/AppDataContext";
import { quote } from "../types";
import { BASE_URL } from "../Utils/Variables";
import NumOfTasks from "./NumOfTasks";
import PieChartComp from "./PieChartComp"
import Quote from "./Quote";

function Dashboard() {
  const { quote } = useData();  

  return (
    <div className="dashboard-container">
      {quote ? <Quote quote={quote} /> : null}
      <div className="dashboard-items-container">
      <PieChartComp />
      <NumOfTasks />
      </div>
    </div>
  );
}

export default Dashboard;
