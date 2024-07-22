const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { _id: false }
);

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    instructor: { type: String, required: true },
    duration: { type: Number, required: true },
    coverImage: { type: String, required: true },
    content: {
      chapters: [chapterSchema],
      articles: [String],
      videos: [String],
      audios: [String],
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
