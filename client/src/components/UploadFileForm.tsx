import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AddButton from "./AddButton";
import { Chip } from "@material-ui/core";
import { useAuth } from "../context/AuthContext";

const swal = withReactContent(Swal);

export default function UploadNewFileDialog() {
  /* This component creates the add new ticket functionallity, using material-ui dialog
  and a trigger AddButton */

  const { currentUser } = useAuth();
  const [file, setFile] = useState<any>(null);
  const [open, setOpen] = React.useState(false);

  const newTicket = {
    title: "",
    content: "",
    email: "",
    labels: "",
  };

  const handleDelete = () => {
    setFile(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const uploadFile = async () => {
    if (file === null) {
      return;
    }
    console.log(currentUser)
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post(
        `http://localhost:3001/api/v1/file/post-file?size=${file.size}&type=${file.type}&teamId=${currentUser.teamId}&email=${currentUser.email}`,
        formData,
        { withCredentials: true }
      );
      console.log(res.data);
      const status = "File has uploaded Successfully!";
      swal.fire({
        title: "✔",
        text: status,
        timer: 5000,
        showConfirmButton: true,
      });
    } catch (error) {
      console.log(error);
      const status = "File has uploaded Successfully!";
      swal.fire({
        title: "Attention!",
        text: "it seems there's been an with the server. Oof :(",
        timer: 5000,
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
        <DialogTitle id="form-dialog-title">New File</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill the details below. Note: fields marked with * are
            required!
          </DialogContentText>
          <TextField
            id="content"
            label="File description"
            margin="normal"
            helperText="File description"
            onChange={(e) => {
              newTicket.content = e.target.value;
            }}
            variant="outlined"
            rows="3"
            multiline
            fullWidth
            required
          />
          <Button variant="contained" component="label">
            Choose file
            <input
              onChange={(e) => e.target.files && setFile(e.target.files[0])}
              type="file"
              hidden
            />
          </Button>
          {file ? (
            <Chip onDelete={handleDelete} color="primary" label={file.name} />
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={uploadFile} color="primary">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
