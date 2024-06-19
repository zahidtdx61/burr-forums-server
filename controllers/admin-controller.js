const { StatusCodes } = require("http-status-codes");
const Announcement = require("../models/announcement");
const Tag = require("../models/tag");

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

module.exports = {
  addAnnouncement,
  addTag,
};
