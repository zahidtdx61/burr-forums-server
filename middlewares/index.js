const zod = require("zod");
const { StatusCodes } = require("http-status-codes");

const validateUserData = (req, res, next) => {
  const schema = zod.object({
    name: zod.string().min(1),
    email: zod.string().email(),
    uid: zod.string().min(1),
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

module.exports = {
  validateUserData,
  createJWT,
  verifyJWT,
}
