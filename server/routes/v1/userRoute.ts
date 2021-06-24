const { Router } = require("express");
const router = Router();
const { signUp_post, login_post } = require("../../controllers/usersController");

router.post("/signup", signUp_post);
router.post("/login", login_post);

export default router;
