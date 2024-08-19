const mongoose = require("mongoose");

// Define the ticket schema
const ticketSchema = new mongoose.Schema(
  {
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    sold: { type: Number, default: 0 },
    paymentLink: { type: String, default: "" },
  },
  { timestamps: true }
);

// Define the event schema
const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subTitle: { type: String, required: true },
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
    tickets: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      required: true,
    },
    limit: { type: Number, required: true },
    hasBooked: {
      type: Boolean,
      default: false,
    },
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
const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = { Event, Ticket };
