const express = require("express");
const { UserController } = require("../../controllers");
const { validateUserData } = require("../../middlewares");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API is working!",
    data: {},
    error: {},
  });
});

router.post("/register", validateUserData, UserController.createUser);

module.exports = router;
