import { Router } from "express";
import { saveFilePost, downloadFile } from "../../controllers/fileController";
import fileUpload from "express-fileupload";
const router = Router();

router.use(fileUpload());

router.post("/post-file", saveFilePost);
router.get("/get-file", downloadFile);

export default router;
