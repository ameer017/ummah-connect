const express = require("express");
const router = express.Router();
const discussionController = require("../controllers/discussionController");
const { protect } = require("../middleware/authMiddleware");

// Thread routes
router.post("/thread", protect, discussionController.createThread);
router.put("/threads/:id", protect, discussionController.updateThread);
router.delete("/threads/:id", protect, discussionController.deleteThread);
router.get("/all-threads", protect, discussionController.getAllThreads);
router.get("/threads/:id", protect, discussionController.getThreadById);

// Reply routes
router.post(
  "/threads/:threadId/replies",
  protect,
  discussionController.createReply
);
router.put("/replies/:id", protect, discussionController.updateReply);
router.delete("/replies/:id", protect, discussionController.deleteReply);
router.get(
  "/threads/:threadId/replies",
  protect,
  discussionController.getRepliesByThreadId
);

// Report routes
router.post("/report", protect, discussionController.createReport);
router.get("/reports", protect, discussionController.getAllReports);
router.put("/reports/:id", protect, discussionController.updateReportStatus);

module.exports = router;
