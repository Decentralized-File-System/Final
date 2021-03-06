import { Request, Response, Router } from "express";
import checkUser from "../../middlewares/authMiddleware";
import fileRoute from "./fileRoute";
import userRoute from "./userRoute";
import taskRouter from "./taskRouter";
import folderRouter from "./folderRoute";
import quotesRoute from "./quotesRoute";
import dataNodesRoute from "./dataNodesRoute";
const router = Router();

router.use("/file", checkUser, fileRoute);
router.use("/task", checkUser, taskRouter);
router.use("/folder", folderRouter);
router.use("/data-nodes", checkUser, dataNodesRoute);
router.use("/quote", checkUser, quotesRoute);
router.use("/user", userRoute);

export default router;
