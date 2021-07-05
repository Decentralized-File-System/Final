const { Router } = require("express");
const router = Router();
const {getDataNodesInfo} = require("../../controllers/dataNodesControlles");

router.get("/",getDataNodesInfo);

export default router;
