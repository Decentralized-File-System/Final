import { Request, Response, Router } from "express";
// @ts-ignore
import { User } from "../../models";
import fileRoute from "./fileRoute";
const router = Router();

const unknownEndpoint = (req: Request, res: Response) => {
  res.status(404).send({ error: "unknown endpoint" });
};

router.get("/test", async (req, res) => {
  const user = await User.findAll({});
  console.log(user);

  res.send("hello");
});

router.use("/file", fileRoute);
router.use(unknownEndpoint);

export default router;
