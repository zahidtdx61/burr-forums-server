const express = require("express");
const { verifyJWT } = require("../../middlewares");
const { AdminController } = require("../../controllers");
const router = express.Router();

router.post("/add-announcement", verifyJWT, AdminController.addAnnouncement);

module.exports = router;