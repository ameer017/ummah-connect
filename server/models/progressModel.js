const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    progress: { type: Number, required: true, default: 0 }, // progress percentage
    completed: { type: Boolean, default: false },
    certificateUrl: { type: String, default: "" },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

const Progress = mongoose.model("Progress", progressSchema);
module.exports = Progress;
