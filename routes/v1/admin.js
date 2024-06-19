const express = require("express");
const { verifyJWT, verifyAdmin } = require("../../middlewares");
const { AdminController, PostController } = require("../../controllers");
const router = express.Router();

router.post("/add-announcement", verifyJWT, verifyAdmin, AdminController.addAnnouncement);
router.get("/reported-comments", verifyJWT, verifyAdmin, PostController.getReportedComments);
router.delete("/delete-comment/:id", verifyJWT, verifyAdmin, PostController.deleteComment);

module.exports = router;