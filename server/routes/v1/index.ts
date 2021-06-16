import { Request, Response, Router } from "express";
import fileRoute from "./fileRoute";
const router = Router();

const unknownEndpoint = (req: Request, res: Response) => {
  res.status(404).send({ error: "unknown endpoint" });
};

router.use("/file", fileRoute);
router.use(unknownEndpoint);

export default router;
