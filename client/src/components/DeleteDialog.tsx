import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "react-bootstrap/Button";
import { file } from "../types";
import axios from "axios";
import { BASE_URL } from "../Utils/Variables";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useData } from "../context/AppDataContext";

const swal = withReactContent(Swal);

type DeleteDialogProps = {
  file: file;
};

export default function DeleteDialog({ file }: DeleteDialogProps) {
  const { getFiles } = useData();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteHandler = async () => {
    handleClose();
    try {
      const res = await axios.delete(`${BASE_URL}/file?fileId=${file.id}`, {
        withCredentials: true,
      });
      const status = "File has deleted Successfully!";
      swal.fire({
        title: "success",
        text: status,
        timer: 3000,
        showConfirmButton: true,
      });
      getFiles();
    } catch (error) {
      const status = "There was a problem, the file did not deleted.";
      swal.fire({
        title: "Sorry",
        text: status,
        timer: 3000,
        showConfirmButton: true,
      });
    }
  };

  return (
    <div>
      <Button
        variant="outline-warning"
        color="primary"
        onClick={handleClickOpen}
        style={{ outline: "none", boxShadow: "none" }}
      >
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Warning"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this file?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={deleteHandler} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
