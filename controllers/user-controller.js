const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");
const Post = require("../models/post");

const createUser = async (req, res) => {
  const user = req.body;

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  };

  try {
    const existingUser = await User.findOne({ uid: user?.uid });
    const { token } = req.body;

    if (existingUser) {
      return res
        .cookie("token", token, cookieOptions)
        .status(StatusCodes.OK)
        .json({
          success: true,
          message: "User tokenized successfully",
          data: {},
          error: {},
        });
    }

    const newUser = await User.create(user);
    return res
      .cookie("token", token, cookieOptions)
      .status(StatusCodes.CREATED)
      .json({
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

const logout = async (req, res) => {
  return res
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 0,
    })
    .send({
      success: true,
      message: "User logged out",
      data: {},
      error: {},
    });
};

module.exports = {
  createUser,
  getUser,
  addPost,
  logout,
};
