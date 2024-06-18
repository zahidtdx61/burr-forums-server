const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  JWT_SECRET: process.env.ACCESS_TOKEN_SECRET,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
};
