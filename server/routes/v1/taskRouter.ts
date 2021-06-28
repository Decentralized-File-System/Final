const { Router } = require("express");
const router = Router();
import {
  addNewTask,
  getAllTasksOfTeam,
} from "../../controllers/taskController";

router.get("/all-tasks", getAllTasksOfTeam);
router.post("/new", addNewTask);

export default router;
