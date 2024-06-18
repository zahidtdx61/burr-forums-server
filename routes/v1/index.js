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

router.use("/admin", require("./admin"));
router.use("/user", require("./user"));
router.use("/payment", require("./payment"));

module.exports = router;
