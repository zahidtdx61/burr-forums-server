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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = Mongoose.model("User", userSchema);

module.exports = User;
