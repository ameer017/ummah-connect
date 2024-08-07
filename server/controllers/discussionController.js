const User = require("../models/authModel");
const { Thread, Reply, Report } = require("../models/forumModel");
const sendEmail = require("../utils/sendEmail");

exports.createThread = async (req, res) => {
  try {
    const { title, content } = req.body;
    const createdBy = req.user._id;

    const newThread = new Thread({ title, content, createdBy });
    const savedThread = await newThread.save();
    res.status(201).json(savedThread);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateThread = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedThread = await Thread.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedThread) {
      return res.status(404).json({ message: "Thread not found" });
    }

    res.status(200).json(updatedThread);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteThread = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedThread = await Thread.findByIdAndDelete(id);
    if (!deletedThread) {
      return res.status(404).json({ message: "Thread not found" });
    }

    res.status(200).json({ message: "Thread deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllThreads = async (req, res) => {
  try {
    const threads = await Thread.find().populate("createdBy");
    // console.log(threads);
    res.status(200).json(threads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getThreadById = async (req, res) => {
  try {
    const { id } = req.params;
    const thread = await Thread.findById(id).populate("createdBy");

    if (!thread) {
      return res.status(404).json({ message: "Thread not found" });
    }

    const replies = await Reply.find({ thread: id }).populate("createdBy");

    res.status(200).json({ thread, replies });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createReply = async (req, res) => {
  try {
    const { threadId: id } = req.params;
    const { content } = req.body;
    const createdBy = req.user._id;

    const reply = new Reply({
      thread: id,
      content,
      createdBy,
    });

    const savedReply = await reply.save();
    res.status(201).json(savedReply);
  } catch (error) {
    // console.log(error)
    res.status(500).json({ message: error.message });
  }
};

exports.updateReply = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const reply = await Reply.findById(id);
    if (!reply) {
      return res.status(404).json({ message: "Reply not found" });
    }

    reply.content = content;
    reply.updatedAt = Date.now();

    const updatedReply = await reply.save();
    res.status(200).json(updatedReply);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteReply = async (req, res) => {
  try {
    const { id } = req.params;

    const reply = await Reply.findById(id);
    if (!reply) {
      return res.status(404).json({ message: "Reply not found" });
    }

    await reply.deleteOne();
    res.status(200).json({ message: "Reply deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRepliesByThreadId = async (req, res) => {
  try {
    const { threadId } = req.params;
    const replies = await Reply.find({ thread: threadId }).populate(
      "createdBy"
    );

    if (!replies) {
      return res.status(404).json({ message: "Replies not found" });
    }

    res.status(200).json(replies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getReplies = async (req, res) => {
  const replies = await Reply.find().sort("-createdAt");
  if (!replies) {
    res.status(500);
    throw new Error("Something went wrong");
  }
  res.status(200).json(replies);
};

exports.createReport = async (req, res) => {
  try {
    const { type, itemId, reason } = req.body;
    const reportedBy = req.user._id;

    const newReport = new Report({ type, itemId, reason, reportedBy });
    const savedReport = await newReport.save();
    res.status(201).json(savedReport);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.find().populate("reportedBy");
    res.status(200).json({ reports });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateReportStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const resolvedBy = req.user._id;

    const updatedReport = await Report.findByIdAndUpdate(
      id,
      { status, resolvedBy, resolvedAt: Date.now() },
      { new: true }
    );
    if (!updatedReport) {
      return res.status(404).json({ message: "Report not found" });
    }

    if (status === "approved") {
      const thread = await Thread.findById(updatedReport.itemId);
      await Thread.findByIdAndDelete(updatedReport.itemId);
    }

    res.status(200).json(updatedReport);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
