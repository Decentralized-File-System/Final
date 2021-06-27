import checkUser from "../../middlewares/authMiddleware";

const { Router } = require("express");
const router = Router();
const {
  signUp_post,
  login_post,
  token_get,
  users_get,
  change_props_put,
} = require("../../controllers/usersController");

router.post("/signup", signUp_post);
router.post("/login", login_post);
router.get("/token", checkUser, token_get);
router.get("/employees", checkUser, users_get);
router.put("/change-props", checkUser, change_props_put);

export default router;
