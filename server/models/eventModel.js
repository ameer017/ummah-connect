const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    photo: { type: String, default: "" },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    trending: { type: Boolean, default: false },
  },
  { timestamps: true }
);

eventSchema.virtual("isUpcoming").get(function () {
  return this.date > Date.now();
});

eventSchema.virtual("isPast").get(function () {
  return this.date <= Date.now();
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
