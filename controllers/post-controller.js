const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");

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

const getPosts = async (req, res) => {
  const { uid } = req.body;

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

    const posts = await Post.find({ userId: user._id });
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Posts found",
      data: posts,
      error: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Posts not found",
      data: {},
      error: error.message,
    });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ uid: req.body.uid });
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "User not found",
        data: {},
        error: {},
      });
    }

    const post = await Post.findOne({ _id: id });
    if (!post) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Post not found",
        data: {},
        error: {},
      });
    }

    if (!post.userId.equals(user._id)) {
      // console.log({ id, "post.userId": post.userId, "user._id": user._id });
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "You are not authorized to delete this post",
        data: {},
        error: {},
      });
    }

    await Post.findByIdAndDelete(id);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Post deleted successfully",
      data: {},
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Post not found",
      data: {},
      error: error.message,
    });
  }
};

const addComment = async (req, res) => {
  const { id } = req.params;
  const { uid, comment } = req.body;
  console.log({ id, uid, comment });

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

    const post = await Post.findById(id);
    if (!post) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Post not found",
        data: {},
        error: {},
      });
    }

    const newComment = await Comment.create({
      comment,
      userId: user._id,
      postId: post._id,
    });

    await Post.findByIdAndUpdate(id, {
      $push: { comments: newComment._id },
    });

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Comment created successfully",
      data: newComment,
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Comment not created",
      data: {},
      error: error.message,
    });
  }
};

module.exports = {
  addPost,
  getPosts,
  deletePost,
  addComment,
};