const { Router } = require("express");
const router = Router();
import {
  addNewTask,
  getAllTasksOfTeam,
  updateTaskStatus,
} from "../../controllers/taskController";

router.get("/all-tasks", getAllTasksOfTeam);
router.post("/new", addNewTask);
router.put("/update-status", updateTaskStatus);

export default router;
