const { Router } = require("express");
const router = Router();
import {
  addFolder,
  getContentOfFolder,
  deleteFolder,
  getFolderRoute,
} from "../../controllers/folderController";

router.get("/content", getContentOfFolder);
router.get("/route", getFolderRoute);
router.post("/add", addFolder);
router.delete("/", deleteFolder);

export default router;
