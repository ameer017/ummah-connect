const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    articles: [String],
    videos: [String],
    audios: [String],
  },
  { _id: false }
);

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    instructor: { type: String, required: true },
    duration: { type: Number, required: true },
    coverImage: {
      type: String,
      required: true,
      default:
        "https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    content: {
      chapters: [chapterSchema],
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
