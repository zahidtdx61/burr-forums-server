const { Mongoose } = require("../configs");

const announcementSchema = new Mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Announcement = Mongoose.model("Announcement", announcementSchema);

module.exports = Announcement;
