import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import AddButton from "./AddButton";
import { Chip } from "@material-ui/core";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { BASE_URL } from "../Utils/Variables";

const swal = withReactContent(Swal);

type addNewTaskProps = {
  getTasks: Function;
};

export default function AddNewTask({ getTasks }: addNewTaskProps) {
  /* This component creates the add new ticket functionallity, using material-ui dialog
  and a trigger AddButton */

  const { currentUser } = useAuth();
  const [open, setOpen] = React.useState(false);

  const newTask = {
    title: "",
    content: "",
    deadline: "",
    email: "",
    labels: "",
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const addTask = async () => {
    try {
      axios.post(`${BASE_URL}/task/new`, newTask, { withCredentials: true });
      const status = "Task has uploaded Successfully!";
      swal.fire({
        title: "✔",
        text: status,
        timer: 3000,
        showConfirmButton: true,
      });
      getTasks();
      setOpen(false);
    } catch (error) {
      console.log(error);
      const status = "It seems there's been an error with the server.";
      swal.fire({
        title: "Attention!",
        text: status,
        timer: 3000,
        showConfirmButton: true,
      });
      setOpen(false);
    }
  };

  return (
    <div>
      <AddButton handleClickOpen={handleClickOpen} />
      <Dialog
        open={open}
        onClose={closeDialog}
        aria-labelledby="form-dialog-title"
        fullWidth
        color="yellow"
      >
        <DialogTitle id="form-dialog-title">New Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill the details below. Note: fields marked with * are
            required!
          </DialogContentText>
          <TextField
            autoFocus
            id="name"
            label="title"
            margin="normal"
            helperText="Task title"
            onChange={(e) => {
              newTask.title = e.target.value;
            }}
            fullWidth
            required
          />
          <TextField
            autoFocus
            id="deadline"
            label="Deadline"
            margin="normal"
            helperText="Deadline"
            onChange={(e) => {
              newTask.deadline = e.target.value;
            }}
            fullWidth
            required
          />

          <TextField
            id="content"
            label="Content"
            margin="normal"
            helperText="Task content"
            onChange={(e) => {
              newTask.content = e.target.value;
            }}
            variant="outlined"
            rows="3"
            multiline
            fullWidth
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={addTask} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
