const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");
const Post = require("../models/post");

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
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "User created successfully",
      data: newUser,
      error: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "User not created",
      data: {},
      error: error.message,
    });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ uid: id });
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "User not found",
        data: {},
        error: {},
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "User found",
      data: user,
      error: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "User not found",
      data: {},
      error: error.message,
    });
  }
};

const addPost = async (req, res) => {
  const { uid } = req.body;
  const content = req.body;

  try {
    const user = await User.findOne({ uid: uid });
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "User not found",
        data: {},
        error: {},
      });
    }

    const newPost = await Post.create({
      ...content,
      userId: user._id,
    });

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Post created successfully",
      data: newPost,
      error: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Post not created",
      data: {},
      error: error.message,
    });
  }
};

module.exports = {
  createUser,
  getUser,
  addPost,
};
