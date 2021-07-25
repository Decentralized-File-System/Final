import { Router, Request, Response, NextFunction } from "express";
import {
  saveFilePost,
  downloadFile,
  filesGet,
  deleteFile,
  fileByNameGet,
} from "../../controllers/fileController";
import busboy from "connect-busboy";

const router = Router();

router.use(
  busboy({
    highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
  })
);

router.post("/post-file", saveFilePost);
router.get("/download-file", downloadFile);
router.get("/files", filesGet);
router.get("/file-by-name", fileByNameGet);
router.delete("/", deleteFile);

export default router;
