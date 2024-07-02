const express = require("express");
const router = express.Router();
const {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  rsvpEvent,
} = require("../controllers/eventController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.route("/").post(protect, adminOnly, createEvent).get(getEvents);

router
  .route("/:id")
  .get(getEvent)
  .put(protect, adminOnly, updateEvent)
  .delete(protect, adminOnly, deleteEvent);

router.route("/:id/rsvp").post(protect, rsvpEvent);

module.exports = router;
