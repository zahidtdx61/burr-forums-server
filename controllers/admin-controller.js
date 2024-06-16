const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");
const Announcement = require("../models/announcement");

const addAnnouncement = async (req, res) => {
  const { title, description, uid } = req.body;
  try {
    const user = await User.findOne({ uid: uid });
    if (!user || user.role !== "admin") {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "User not authorized",
        data: {},
        error: {},
      });
    }
    const { title, description } = req.body;
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

module.exports = {
  addAnnouncement,
};
