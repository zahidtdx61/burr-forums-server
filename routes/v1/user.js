const express = require("express");
const { UserController, PostController } = require("../../controllers");
const { validateUserData, createJWT, verifyJWT } = require("../../middlewares");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API is working!",
    data: {},
    error: {},
  });
});

// user related routes
router.post("/register", validateUserData, createJWT, UserController.createUser);
router.get("/logout", UserController.logout);
router.get("/find/:id", verifyJWT, UserController.getUser);
router.get("/role", verifyJWT, UserController.getRole);

// post related routes
router.post("/add-post", verifyJWT, PostController.addPost);
router.get("/get-posts", verifyJWT, PostController.getPosts);
router.post("/add-comment/:id", verifyJWT, PostController.addComment);
router.delete("/delete-post/:id", verifyJWT, PostController.deletePost);

// comments
router.get("/comments/:id", verifyJWT, PostController.getComments);

module.exports = router;
