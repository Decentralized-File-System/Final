const { Router } = require("express");
const router = Router();
import { getAllTasksOfTeam } from "../../controllers/taskController";

router.get("/", getAllTasksOfTeam);

export default router;
