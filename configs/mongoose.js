const mongoose = require("mongoose");
const db = mongoose;
const dotenv = require("dotenv");

dotenv.config();

const URL = `${process.env.MONGO_URL}/${process.env.MONGO_DB_NAME}`;

db.connect(URL);

module.exports = db;
