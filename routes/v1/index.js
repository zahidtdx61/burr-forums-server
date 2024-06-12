const express = require("express");
const { StatusCodes } = require("http-status-codes");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(StatusCodes.OK).json({
    success: true,
    message: "API is working!",
    data: {},
    error: {},
  });
});

module.exports = router;
