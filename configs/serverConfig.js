const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;
const YOUR_DOMAIN = process.env.YOUR_DOMAIN;

module.exports = {
  PORT,
  YOUR_DOMAIN,
};
