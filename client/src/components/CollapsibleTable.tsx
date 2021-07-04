import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import StatusSelection from "./StatusSelection";
import Button from "@material-ui/core/Button";
import { task } from "../types";
import { useEffect } from "react";
import { Chip } from "@material-ui/core";
import { useState } from "react";
import { useData } from "../context/AppDataContext";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

type propsRowType = {
  task: task;
  index: number;
};

const getNumberOfDays = (start: Date, end: Date) => {
  const date1 = new Date(start);
  const date2 = new Date(end);

  // One day in milliseconds
  const oneDay = 1000 * 60 * 60 * 24;

  // Calculating the time difference between two dates
  const diffInTime = date2.getTime() - date1.getTime();

  // Calculating the no. of days between two dates
  const diffInDays = Math.round(diffInTime / oneDay);

  return diffInDays;
};

const percentColors = [
  { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
  { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
  { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } },
];

const getColorForPercentage = (pct: number) => {
  for (var i = 1; i < percentColors.length - 1; i++) {
    if (pct < percentColors[i].pct) {
      break;
    }
  }
  var lower = percentColors[i - 1];
  var upper = percentColors[i];
  var range = upper.pct - lower.pct;
  var rangePct = (pct - lower.pct) / range;
  var pctLower = 1 - rangePct;
  var pctUpper = rangePct;
  var color = {
    r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
    g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
    b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper),
  };
  return "rgb(" + [color.r, color.g, color.b].join(",") + ")";
  // or output as hex if preferred
};

function Row({ task, index }: propsRowType) {
  const [open, setOpen] = React.useState(false);
  const [daysDifference, setDaysDifference] = useState<number>(
    getNumberOfDays(new Date(), task.deadline)
  );

  const statusColor =
    task.status === "Done"
      ? "secondary"
      : task.status === "In Progress"
      ? "primary"
      : undefined;

  const daysPercent = (daysDifference > 10 ? 10 : daysDifference) / 10;

  const daysPercentColor = getColorForPercentage(daysPercent);

  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow
        className={`${classes.root} ${index % 2 === 0 ? "grey-row" : ""}`}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {task.title}
        </TableCell>
        <TableCell>{task.userName}</TableCell>
        <TableCell>
          <Chip color={statusColor} label={task.status} />
        </TableCell>
        <TableCell>{new Date(task.createdAt).toDateString()}</TableCell>
        <TableCell>
          <div
            className="deadline-div"
            style={{ borderColor: `${daysPercentColor}` }}
          >
            {new Date(task.deadline).toDateString()}
          </div>
        </TableCell>
        <TableCell>
          {task.status !== "Done" ? (
            <>
              <StatusSelection
                task={task}
                currentStatus={task.status}
                color={statusColor}
                label={task.status}
              />
            </>
          ) : null}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Content
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow></TableRow>
                </TableHead>
                <TableBody>{task.content}</TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

type propsType = {
  tasks: task[];
  getTasks: Function;
};

export default function CollapsibleTable({ tasks, getTasks }: propsType) {
  const { updateStatuses, statusesToChange } = useData();
  const changeStatusHandler = () => {
    updateStatuses();
  };
  useEffect(() => {
    if (statusesToChange.length === 0) {
      getTasks();
    }
  }, [statusesToChange]);
  return (
    <div className="tasks-div-container">
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bolder" }}>Content</TableCell>
              <TableCell style={{ fontWeight: "bolder" }}>Title</TableCell>
              <TableCell style={{ fontWeight: "bolder" }}>Username</TableCell>
              <TableCell style={{ fontWeight: "bolder" }}>Status</TableCell>
              <TableCell style={{ fontWeight: "bolder" }}>
                Uploaded at
              </TableCell>
              <TableCell style={{ fontWeight: "bolder" }}>
                Deadline at
              </TableCell>
              <TableCell style={{ fontWeight: "bolder" }}>
                Change Status -
                <Button
                  onClick={changeStatusHandler}
                  variant="contained"
                  style={{ display: "inline" }}
                >
                  Submit
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks &&
              tasks.map((task, i) => (
                <Row key={`${i} task`} task={task} index={i} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
