const { StatusCodes } = require("http-status-codes");
const Announcement = require("../models/announcement");
const Tag = require("../models/tag");
const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");

const addAnnouncement = async (req, res) => {
  const { title, description, user } = req.body;
  try {
    const announcement = await Announcement.create({
      title,
      description,
      userId: user._id,
    });

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Announcement created successfully",
      data: announcement,
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Announcement not created",
      data: {},
      error: error.message,
    });
  }
};

const addTag = async (req, res) => {
  const { value, label } = req.body;

  try {
    const tag = await Tag.create({
      value,
      label,
    });

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Tag created successfully",
      data: tag,
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Tag not created",
      data: {},
      error: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    const posts = await Post.find({});
    const comments = await Comment.find({});
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "All users",
      data: {
        userCount: users.length,
        postCount: posts.length,
        commentCount: comments.length,
      },
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Users not found",
      data: {},
      error: error.message,
    });
  }
};

module.exports = {
  addAnnouncement,
  addTag,
  getAllUsers,
};
