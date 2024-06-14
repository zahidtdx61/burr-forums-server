const { Mongoose } = require("../configs");

const commentSchema = new Mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: Mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  postId: {
    type: Mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Post",
  },
  status: {
    type: String,
    required: true,
    default: "active",
  },
});

const Comment = Mongoose.model("Comment", commentSchema);
module.exports = Comment;
