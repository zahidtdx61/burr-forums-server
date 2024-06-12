const { Mongoose } = require("../configs");

const postSchema = new Mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  upVotes: {
    type: Number,
    default: 0,
  },
  downVotes: {
    type: Number,
    default: 0,
  },
  userId: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comments: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const Post = Mongoose.model("Post", postSchema);

module.exports = Post;
