const mongoose = require("mongoose");

const forumSchema = new mongoose.Schema({});

const Forum = mongoose.model("Forum", forumSchema);
module.exports = Forum;
