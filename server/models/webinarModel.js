const mongoose = require("mongoose");

const webinarSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    instructor: { type: String, required: true },
    date: { type: Date, required: true },
    url: { type: String, required: true },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

const Webinar = mongoose.model("Webinar", webinarSchema);
module.exports = Webinar;
