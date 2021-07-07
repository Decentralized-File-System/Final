import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import { useData } from "../context/AppDataContext";

const COLORS = ["#0088FE", "#fed161"];
const TAGS = ["Available", "In-use"];

const RADIAN = Math.PI / 180;
type renderCoustumLabelProps = {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
};

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: renderCoustumLabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function PieChartComp() {
  const { pieData } = useData();
  return (
    <div className="pie-chart-container">
      <h4>Disk Info</h4>
      <PieChart style={{ paddingTop: "0px" }} width={300} height={250}>
        <Pie
          data={pieData}
          cx={140}
          cy={120}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#FFBB28"
          dataKey="value"
        >
          {pieData.map((entry: any, index: number) => {
            if (entry.value === 0) {
              return <></>;
            } else {
              return (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              );
            }
          })}
        </Pie>
      </PieChart>
      <div className="tagsColor pie-chart-tags" style={{ display: "flex" }}>
        {TAGS.map((tag, i) => (
          <span style={{ marginRight: "2em", display: "flex" }}>
            <div
              style={{
                width: "20px",
                height: "20px",
                margin: "1rem",
                marginTop: "0px",
                border: "1px solid rgba(0, 0, 0, .2)",
                backgroundColor: `${COLORS[i]}`,
              }}
            ></div>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
