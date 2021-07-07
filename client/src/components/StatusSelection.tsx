import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Chip } from "@material-ui/core";
import { useData } from "../context/AppDataContext";
import { task } from "../types";
import { useEffect } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

type propsType = {
  color: string | undefined;
  label: string;
  currentStatus: string;
  task: task;
};

export default function StatusSelection({
  color,
  label,
  currentStatus,
  task,
}: propsType) {
  const { setStatusesToChange, statusesToChange } = useData();
  const classes = useStyles();
  const [status, setStatus] = useState("");
  const statusArray = ["Not Started", "In Progress", "Done"].filter(
    (status) => status !== currentStatus && status !== "Not Started"
  );

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    //first check if the clicked value is "" (="NONE") to pull the task out
    if (event.target.value === "") {
      const statusesToChangeUpdate = statusesToChange.filter(
        (statusExist: any) => statusExist.taskId !== task.id
      );
      setStatusesToChange(statusesToChangeUpdate);
      setStatus(event.target.value as string);
      return;
    }

    //check if the task exist already and need to be updated
    const checkIfTaskExist = statusesToChange
      .map((taskToUpdate: any) => {
        return taskToUpdate.taskId;
      })
      .indexOf(task.id);
    if (checkIfTaskExist === -1) {
      setStatusesToChange((prev: any) => [
        ...prev,
        { taskId: task.id, newStatus: event.target.value },
      ]);
    } else {
      const taskToUpdate = statusesToChange;
      statusesToChange[checkIfTaskExist].newStatus = event.target.value;
      setStatusesToChange(statusesToChange);
    }
    setStatus(event.target.value as string);
  };

  useEffect(() => {
    if (statusesToChange.length === 0) {
      setStatus("");
    }
  }, [statusesToChange]);

  return (
    <div>
      <FormControl className={classes.formControl}>
        <Select
          value={status}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {statusArray.map((status, i) => (
            <MenuItem value={status}>
              <Chip
                color={status !== "Done" ? "primary" : "secondary"}
                label={status}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
