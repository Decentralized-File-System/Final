import { Router } from "express";
import { saveFilePost, downloadFile } from "../../controllers/fileController";
import fileUpload from "express-fileupload";
import busboy from "connect-busboy";

const router = Router();

// router.use(fileUpload());
router.use(
  busboy({
    highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
  })
);

router.post("/post-file", saveFilePost);
router.get("/get-file", downloadFile);

export default router;
