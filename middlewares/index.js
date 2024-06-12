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

module.exports = {
  validateUserData,
}
