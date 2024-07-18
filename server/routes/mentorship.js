const express = require("express");
const {
  createMentor,
  findMentors,
  findMentees,
  scheduleSession,
} = require("../controllers/mentorshipController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/signup-mentorship", protect, createMentor);
router.post("/schedule-session", protect, scheduleSession);

router.get("/find-mentors/:interests?", protect, findMentors);
router.get("/find-mentees/:expertise?", protect, findMentees);

module.exports = router;
