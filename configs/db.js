const mongoose = require("mongoose");
require("dotenv").config();

const connectedToAdb = mongoose.connect(process.env.mongourl);

module.exports = connectedToAdb;