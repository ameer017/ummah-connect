const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
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
    enrolledAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
module.exports = Enrollment;
