import checkUser from "../../middlewares/authMiddleware";

const { Router } = require("express");
const router = Router();
const {
  signUp_post,
  login_post,
  token_get,
} = require("../../controllers/usersController");

router.post("/signup", signUp_post);
router.post("/login", login_post);
router.get("/token", checkUser, token_get);

export default router;
