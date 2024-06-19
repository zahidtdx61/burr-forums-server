const zod = require("zod");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { SecretsConfig } = require("../configs");
const User = require("../models/user");

const validateUserData = (req, res, next) => {
  const schema = zod.object({
    name: zod.string().min(1),
    email: zod.string().email(),
    uid: zod.string().min(1),
    image: zod.string().min(1),
  });

  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    const errorMessages = JSON.parse(error);
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: errorMessages[0].message,
      data: {},
      error: error.errors,
    });
  }
};

const createJWT = (req, res, next) => {
  const { uid } = req.body;
  const token = jwt.sign({ uid }, SecretsConfig.JWT_SECRET, {
    expiresIn: "365d",
  });
  req.body.token = token;
  next();
};

const verifyJWT = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    console.log("No token found");
    return res.status(StatusCodes.UNAUTHORIZED).send({
      status: "error",
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, SecretsConfig.JWT_SECRET);
    req.body.uid = decoded.uid;

    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).send({
      status: "error",
      message: "Unauthorized",
    });
  }
};

const verifyAdmin = async (req, res, next) => {
  const { uid } = req.body;
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

    req.body.user = user;

    next();
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "User not found",
      data: {},
      error: error.message,
    });
  }
};

module.exports = {
  validateUserData,
  createJWT,
  verifyJWT,
  verifyAdmin,
};
