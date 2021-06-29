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

const swal = withReactContent(Swal);

export default function AddNewTask() {
  /* This component creates the add new ticket functionallity, using material-ui dialog
  and a trigger AddButton */

  const { currentUser } = useAuth();
  const [open, setOpen] = React.useState(false);

  const newTicket = {
    title: "",
    content: "",
    email: "",
    labels: "",
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const addTask = async () => {};

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
              newTicket.title = e.target.value;
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
              newTicket.content = e.target.value;
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
