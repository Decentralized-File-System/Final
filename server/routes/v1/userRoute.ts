import checkUser from "../../middlewares/authMiddleware";

const { Router } = require("express");
const router = Router();
const {
  signUp_post,
  login_post,
  token_get,
  users_get,
  change_props_put,
  logout_get
} = require("../../controllers/usersController");

router.post("/signup", signUp_post);
router.post("/login", login_post);
router.get("/logout", logout_get);
router.get("/token", checkUser, token_get);
router.post("/employees", checkUser, users_get);
router.put("/change-props", checkUser, change_props_put);

export default router;
