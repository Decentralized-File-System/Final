import { Router } from "express";
import save_file_post from "../../controllers/fileController";
const router = Router();
import multer from "multer";

const upload = multer();

router.post("/post-file", upload.single("file"), save_file_post);

export default router;
