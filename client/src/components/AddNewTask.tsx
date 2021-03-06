import { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import AddButton from "./AddButton";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { BASE_URL } from "../Utils/Variables";
import Grid from "@material-ui/core/Grid";
import BounceLoader from "react-spinners/BounceLoader";
import "date-fns";
//@ts-ignore
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { useData } from "../context/AppDataContext";

const swal = withReactContent(Swal);

export default function AddNewTask() {
  const { getTasks } = useData();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    content: "",
    teamId: currentUser.teamId,
    deadline: new Date(),
    userName: currentUser.name,
  });

  const handleDateChange = (date: Date | null) => {
    if (date !== null) {
      setSelectedDate(date);
      newTask.deadline = new Date(date);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const addTask = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${BASE_URL}/task/new`,
        { task: newTask },
        { withCredentials: true }
      );
      const status = "Task has uploaded Successfully!";
      swal.fire({
        title: "✔",
        text: status,
        timer: 3000,
        showConfirmButton: true,
      });
      getTasks();
      setOpen(false);
      setLoading(false);
    } catch (error) {
      swal.fire({
        title: "Attention!",
        text: error.response.data.message,
        timer: 3000,
        showConfirmButton: true,
      });
      setOpen(false);
      setLoading(false);
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
              setNewTask(newTask);
            }}
            fullWidth
            required
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Deadline *"
                format="MM/dd/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <TextField
            id="content"
            label="Content"
            margin="normal"
            helperText="Task content"
            onChange={(e) => {
              newTask.content = e.target.value;
              setNewTask(newTask);
            }}
            variant="outlined"
            rows="3"
            multiline
            fullWidth
            required
          />
        </DialogContent>
        <DialogActions>
          {!loading ? (
            <>
              <Button onClick={closeDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={addTask} color="primary">
                Add
              </Button>
            </>
          ) : (
            <BounceLoader color={"#5C94D9"} size={40} />
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
