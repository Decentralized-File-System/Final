const { Router } = require("express");
const router = Router();
import {
  addFolder,
  getContentOfFolder,
} from "../../controllers/folderController";

router.post("/add", addFolder);
router.get("/content", getContentOfFolder);

export default router;
