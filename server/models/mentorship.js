const mongoose = require("mongoose");

const mentorshipSchema = new mongoose.Schema({
  mentorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  menteeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sessionDate: {
    type: Date,
    required: true,
  },
  topics: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Mentorship = mongoose.model("Mentorship", mentorshipSchema);
module.exports = Mentorship;
