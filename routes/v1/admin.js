const express = require("express");
const { verifyJWT } = require("../../middlewares");
const { AdminController, PostController } = require("../../controllers");
const router = express.Router();

router.post("/add-announcement", verifyJWT, AdminController.addAnnouncement);
router.get("/reported-comments", verifyJWT, PostController.getReportedComments);
router.delete("/delete-comment/:id", verifyJWT, PostController.deleteComment);

module.exports = router;