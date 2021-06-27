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

/**
 * GET request from superAdmin for all users (for super admin only)
 * GET request for all users where teamId = null, isSuperAdmin = false, isAdmin = false
 * PUT request from admin user, get the prop to change and changes accordingly
 * PUT request CHANGE PASSWORD
 */

export default router;
