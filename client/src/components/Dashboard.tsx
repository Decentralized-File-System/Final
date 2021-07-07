import { useData } from "../context/AppDataContext";
import NumOfTasks from "./NumOfTasks";
import PieChartComp from "./PieChartComp";
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
