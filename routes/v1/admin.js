const express = require("express");
const { verifyJWT, verifyAdmin } = require("../../middlewares");
const { AdminController, PostController } = require("../../controllers");
const router = express.Router();

router.post("/add-announcement", verifyJWT, verifyAdmin, AdminController.addAnnouncement);
router.get("/reported-comments", verifyJWT, verifyAdmin, PostController.getReportedComments);
router.post("/add-tag", verifyJWT, verifyAdmin, AdminController.addTag);
router.delete("/delete-comment/:id", verifyJWT, verifyAdmin, PostController.deleteComment);
router.get("/all-users-data", verifyJWT, verifyAdmin, AdminController.getAllUsersData);
router.get("/all-users", verifyJWT, AdminController.getAllUsers);

module.exports = router;