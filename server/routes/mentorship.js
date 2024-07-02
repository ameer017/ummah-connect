const express = require("express");
const router = express.Router();
const {
  createMentorship,
  getMentorships,
  getMentorship,
  updateMentorship,
  deleteMentorship,
} = require("../controllers/mentorshipController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, createMentorship).get(protect, getMentorships);

router
  .route("/:id")
  .get(protect, getMentorship)
  .put(protect, updateMentorship)
  .delete(protect, deleteMentorship);

module.exports = router;
