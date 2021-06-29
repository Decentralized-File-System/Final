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
import { task } from "../types";
import { useEffect } from "react";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

type propsRowType = {
  task: task;
};

function Row({ task }: propsRowType) {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  useEffect(() => {
    console.log(task);
  }, [task]);

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
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
        <TableCell>{task.status}</TableCell>
        <TableCell>{new Date(task.createdAt).toDateString()}</TableCell>
        <TableCell>{new Date(task.updatedAt).toDateString()}</TableCell>
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
};

export default function CollapsibleTable({ tasks }: propsType) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bolder" }}>Content</TableCell>
            <TableCell style={{ fontWeight: "bolder" }}>Title</TableCell>
            <TableCell style={{ fontWeight: "bolder" }}>Username</TableCell>
            <TableCell style={{ fontWeight: "bolder" }}>Status</TableCell>
            <TableCell style={{ fontWeight: "bolder" }}>Uploaded at</TableCell>
            <TableCell style={{ fontWeight: "bolder" }}>Updated at</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks &&
            tasks.map((task, i) => <Row key={`${i} task`} task={task} />)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
