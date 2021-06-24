import { Request, Response, Router } from "express";
import checkUser from "../../middlewares/authMiddleware";
import fileRoute from "./fileRoute";
import userRoute from "./userRoute";
const router = Router();

const unknownEndpoint = (req: Request, res: Response) => {
  res.status(404).send({ error: "unknown endpoint" });
};

router.use("/file", checkUser, fileRoute);
router.use("/user", userRoute);
router.use(unknownEndpoint);

export default router;
