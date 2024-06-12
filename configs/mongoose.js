const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const URL = `${process.env.MONGO_URL}/${process.env.MONGO_DB_NAME}`;

mongoose.connect(URL);

module.exports = mongoose;
