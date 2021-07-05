const { Router } = require("express");
const router = Router();
import {
  addNewTask,
  deleteTask,
  getAllTasksOfTeam,
  updateTaskStatus,
  getRelevant,
  getFinished,
  getRangeOfDate,
  taskByNameGet,
} from "../../controllers/taskController";

router.get("/all-tasks", getAllTasksOfTeam);
router.get("/relevant", getRelevant);
router.get("/finished", getFinished);
router.get("/range", getRangeOfDate);
router.post("/new", addNewTask);
router.put("/update-status", updateTaskStatus);
router.delete("/", deleteTask);
router.get("/task-by-name", taskByNameGet);

export default router;
