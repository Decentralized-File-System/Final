const { Router } = require("express");
const router = Router();
const { get_random_quote } = require("../../controllers/quotesControllers");

router.get("/", get_random_quote);
export default router;
