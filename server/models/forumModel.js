const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const replySchema = new Schema({
  thread: { type: Schema.Types.ObjectId, ref: "Thread", required: true },
  content: { type: String, required: true },

  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const threadSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const reportSchema = new Schema({
  type: { type: String, enum: ["thread", "reply"], required: true },
  itemId: { type: Schema.Types.ObjectId, required: true },
  reportedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  reason: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "resolved", "dismissed"],
    default: "pending",
  },

  createdAt: { type: Date, default: Date.now },
  resolvedBy: { type: Schema.Types.ObjectId, ref: "User" },
  resolvedAt: { type: Date },
});

const Thread = mongoose.model("Thread", threadSchema);
const Reply = mongoose.model("Reply", replySchema);
const Report = mongoose.model("Report", reportSchema);

module.exports = { Thread, Reply, Report };
