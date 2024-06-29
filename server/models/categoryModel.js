const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  type: { type: String, enum: ["Article", "Video", "Audio"], required: true },
  description: { type: String },
  contents: [{ type: Schema.Types.ObjectId, ref: "Content" }],

});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
