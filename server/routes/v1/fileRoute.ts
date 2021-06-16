import { Router } from "express";
import save_file_post from "../../controllers/fileController";
import fileUpload from 'express-fileupload';
const router = Router();

router.use(fileUpload());

router.post("/post-file", save_file_post);

export default router;
