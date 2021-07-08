import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import AddButton from "./AddButton";
import { Chip } from "@material-ui/core";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useData } from "../context/AppDataContext";

const swal = withReactContent(Swal);

export type fileTableType = {
  setLoaded: Function;
  setShowBar: Function;
};

export default function UploadNewFileDialog({
  setLoaded,
  setShowBar,
}: fileTableType) {
  /* This component creates the add new ticket functionallity, using material-ui dialog
  and a trigger AddButton */
  const { getFiles, getDataNodesInfo } = useData();
  const { currentUser } = useAuth();
  const [file, setFile] = useState<any>(null);
  const [open, setOpen] = React.useState(false);
  const [fileDescription, setFileDescription] = useState("");

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
    setShowBar(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      await axios.post(
        `http://localhost:3001/api/v1/file/post-file?size=${file.size}&type=${file.type}&teamId=${currentUser.teamId}&username=${currentUser.name}&description=${fileDescription}`,
        formData,
        {
          withCredentials: true,
          onUploadProgress: (progress) => {
            setLoaded((progress.loaded / progress.total) * 100);
          },
        }
      );
      const status = "File has uploaded Successfully!";
      swal.fire({
        title: "✔",
        text: status,
        timer: 3000,
        showConfirmButton: true,
      });
      getDataNodesInfo();
      setLoaded(0);
      setShowBar(false);
      getFiles();
      setFile(null);
    } catch (error) {
      swal.fire({
        title: "Attention!",
        text: error.response.data.message,
        timer: 3000,
        showConfirmButton: true,
      });
      setShowBar(false);
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
          <TextField
            id="content"
            label="File description..."
            margin="normal"
            helperText="File description (150 characters)"
            onChange={(e) => {
              setFileDescription(e.target.value);
            }}
            inputProps={{ maxLength: 150 }}
            variant="outlined"
            rows="3"
            multiline
            fullWidth
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
