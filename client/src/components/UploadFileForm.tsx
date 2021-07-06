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
import { useData } from "../context/AppDataContext";

const swal = withReactContent(Swal);

export default function UploadNewFileDialog() {
  /* This component creates the add new ticket functionallity, using material-ui dialog
  and a trigger AddButton */
  const { getFiles } = useData();
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
    closeDialog();
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post(
        `http://localhost:3001/api/v1/file/post-file?size=${file.size}&type=${file.type}&teamId=${currentUser.teamId}&username=${currentUser.username}`,
        formData,
        { withCredentials: true }
      );
      const status = "File has uploaded Successfully!";
      swal.fire({
        title: "✔",
        text: status,
        timer: 3000,
        showConfirmButton: true,
      });
      getFiles();
      setFile(null);
    } catch (error) {
      const status = "It seems there's been an error with the server.";
      swal.fire({
        title: "Attention!",
        text: status,
        timer: 3000,
        showConfirmButton: true,
      });
      setOpen(false);
      setFile(null);
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
