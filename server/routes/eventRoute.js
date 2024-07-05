const express = require("express");
const router = express.Router();
const {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  rsvpEvent,
  validateCreateEvent,
  upcomingEvents,
  pastEvents,
  trendingEvents,
} = require("../controllers/eventController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router
  .route("/")
  .post(protect, adminOnly, validateCreateEvent, createEvent)
  .get(getEvents);

router.get("/upcoming", upcomingEvents);
router.get("/past", pastEvents);
router.get("/trending-events", trendingEvents);

router
  .route("/:id")
  .get(getEvent)
  .put(protect, adminOnly, updateEvent)
  .delete(protect, adminOnly, deleteEvent);

router.route("/:id/rsvp").post(protect, rsvpEvent);

module.exports = router;
