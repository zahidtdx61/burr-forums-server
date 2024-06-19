const { Mongoose } = require("../configs");

const userSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
    default: "https://i.postimg.cc/fL19sCM8/user-3.png",
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
  status: {
    type: String,
    required: true,
    default: "active",
  },
  badge: {
    type: String,
    required: true,
    default: "bronze",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = Mongoose.model("User", userSchema);

module.exports = User;
