const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");

const createUser = async (req, res) => {
  const user = req.body;

  try {
    const existingUser = await User.findOne({ uid: user?.uid });
    if (existingUser) {
      return res.status(StatusCodes.CONFLICT).json({
        success: false,
        message: "User already exists",
        data: {},
        error: {},
      });
    }

    const newUser = await User.create(user);
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "User created successfully",
      data: newUser,
      error: {},
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "User not created",
      data: {},
      error: error.message,
    });
  }
};


module.exports = {
  createUser,
}