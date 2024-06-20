const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
const Tag = require("../models/tag");
const { get } = require("mongoose");

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

const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id).populate("userId");
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Post found",
      data: post,
      error: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Post not found",
      data: {},
      error: error.message,
    });
  }
};

const getPosts = async (req, res) => {
  const { search, sorted, page, size, tag, id } = req.query;
  // console.log({ search, sorted, page, size, tag, id });

  try {
    const user = await User.findOne({ uid: id });
    if (id) {
      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: "User not found",
          data: {},
          error: {},
        });
      }
    }

    let query = {};
    if (search && search !== "null") {
      query = { title: { $regex: new RegExp(search, "i") } };
    }
    if (tag && tag !== "null") {
      query = { ...query, tag };
    }

    let postQuery;
    if (sorted && sorted === "vote") {
      const pipeline = [
        { $match: query },
        {
          $addFields: {
            upvotes: { $ifNull: ["$upVotes", 0] },
            downvotes: { $ifNull: ["$downVotes", 0] },
            voteDifference: {
              $subtract: [
                { $ifNull: ["$upVotes", 0] },
                { $ifNull: ["$downVotes", 0] },
              ],
            },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: {
            path: "$user",
            preserveNullAndEmptyArrays: true,
          },
        },
        { $sort: { voteDifference: -1 } },
      ];

      postQuery = Post.aggregate(pipeline);
    } else {
      postQuery = Post.find(query).populate({
        path: "userId",
        model: "User",
        as: "user",
      });
      if (sorted && sorted !== "null") {
        postQuery = postQuery.sort({ [sorted]: -1 });
      }
    }

    if (size && page && size !== "null" && page !== "null") {
      const limit = parseInt(size);
      const skip = (parseInt(page) - 1) * limit;
      postQuery = postQuery.skip(skip).limit(limit);
    }

    let posts = await postQuery.exec();

    posts = posts.map((post) => {
      post = post.toObject();
      post.user = post.userId;
      delete post.userId;
      return post;
    });

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

const getComments = async (req, res) => {
  const { id } = req.params;

  try {
    const comments = await Comment.find({ postId: id }).populate("userId");
    const post = await Post.findById(id).populate("userId");

    post.comments = comments;

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Comments found",
      data: post,
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Comments not found",
      data: {},
      error: error.message,
    });
  }
};

const postCounter = async (req, res) => {
  const { uid } = req.body;
  const { sorted } = req.query;

  try {
    const user = await User.findOne({ uid });
    const posts = await Post.find({ userId: user._id }).sort({ [sorted]: -1 });

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Post count",
      data: posts,
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Post count not found",
      data: {},
      error: error.message,
    });
  }
};

const reportComment = async (req, res) => {
  const { id } = req.params;
  const { feedback } = req.body;

  try {
    const comment = await Comment.findByIdAndUpdate(id, {
      status: "reported",
      feedback,
    });
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Comment reported",
      data: comment,
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Comment not reported",
      data: {},
      error: error.message,
    });
  }
};

const getReportedComments = async (req, res) => {
  try {
    const comments = await Comment.find({ status: "reported" }).populate(
      "userId"
    );
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Reported comments found",
      data: comments,
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Reported comments not found",
      data: {},
      error: error.message,
    });
  }
};

const deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    const comment = await Comment.findByIdAndDelete(id);
    const post = await Post.findByIdAndUpdate(comment.postId, {
      $pull: { comments: id },
    });
    // console.log(comment, post);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Comment deleted successfully",
      data: {},
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Comment not deleted",
      data: {},
      error: error.message,
    });
  }
};

const getTags = async (req, res) => {
  try {
    const tags = await Tag.find({});
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Tags found",
      data: tags,
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Tags not found",
      data: {},
      error: error.message,
    });
  }
};

const vote = async (req, res) => {
  const { id } = req.params;
  const { uid, vote } = req.body;

  try {
    let post;
    if (vote === "up") {
      post = await Post.findByIdAndUpdate(id, {
        $inc: { upVotes: 1 },
      });
    } else {
      post = await Post.findByIdAndUpdate(id, {
        $inc: { downVotes: 1 },
      });
    }

    if (!post) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Post not found",
        data: {},
        error: {},
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Vote registered",
      data: post,
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Vote not registered",
      data: {},
      error: error.message,
    });
  }
};

module.exports = {
  addPost,
  getPost,
  getPosts,
  deletePost,
  addComment,
  getComments,
  reportComment,
  postCounter,
  getReportedComments,
  deleteComment,
  getTags,
  vote,
};
