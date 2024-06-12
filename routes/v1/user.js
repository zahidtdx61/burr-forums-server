const express = require("express");
const { UserController } = require("../../controllers");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API is working!",
    data: {},
    error: {},
  });
});

router.post("/register", UserController.createUser);

module.exports = router;
