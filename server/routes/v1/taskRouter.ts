const { Router } = require("express");
const router = Router();
import {
  addNewTask,
  deleteTask,
  getAllTasksOfTeam,
  updateTaskStatus,
} from "../../controllers/taskController";

router.get("/all-tasks", getAllTasksOfTeam);
router.get('/relevant')
router.post("/new", addNewTask);
router.put("/update-status", updateTaskStatus);
router.delete("/", deleteTask);

export default router;
