const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    instructor: { type: String, required: true },
    duration: { type: Number, required: true },
    articles: [{ type: String }],
    videos: [{ type: String }],
    audios: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
