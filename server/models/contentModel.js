const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({});

const Content = mongoose.model("Content", contentSchema);
module.exports = Content;
