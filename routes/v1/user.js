const express = require("express");
const { UserController } = require("../../controllers");
const { validateUserData, createJWT } = require("../../middlewares");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API is working!",
    data: {},
    error: {},
  });
});


router.post("/register", validateUserData, createJWT, UserController.createUser);
router.get("/find/:id", UserController.getUser);
router.post("/add-post", UserController.addPost);

module.exports = router;
