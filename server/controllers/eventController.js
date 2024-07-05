const Event = require("../models/eventModel");
const { check, validationResult } = require("express-validator");

const validateCreateEvent = [
  check("title").not().isEmpty().withMessage("Title is required"),
  check("description").not().isEmpty().withMessage("Description is required"),
  check("date").isISO8601().toDate().withMessage("Valid date is required"),
  check("location").not().isEmpty().withMessage("Location is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Create an event
const createEvent = async (req, res) => {
  const { title, description, date, location, trending, photo } = req.body;
  try {
    const event = new Event({
      title,
      description,
      date,
      location,
      organizer: req.user._id,
      trending: trending || false,
      photo,
    });
    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("organizer", "name")
      .populate("attendees", "name");
    res.json(events);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get single event
const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("organizer", "name")
      .populate("attendees", "name");
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an event
const updateEvent = async (req, res) => {
  const { title, description, date, location } = req.body;
  try {
    const event = await Event.findById(req.params.id);
    if (event) {
      event.title = title || event.title;
      event.description = description || event.description;
      event.date = date || event.date;
      event.location = location || event.location;

      const updatedEvent = await event.save();
      res.json(updatedEvent);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an event
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event) {
      await event.deleteOne();
      res.json({ message: "Event removed" });
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// RSVP to an event
const rsvpEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event) {
      if (!event.attendees.includes(req.user._id)) {
        event.attendees.push(req.user._id);
        await event.save();
        res.json({ message: "RSVP successful" });
      } else {
        res.status(400).json({ message: "Already RSVPed" });
      }
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch upcoming events
const upcomingEvents = async (req, res) => {
  try {
    const upcomingEvents = await Event.find()
      .where("date")
      .gt(Date.now())
      .exec();
    res.status(200).json(upcomingEvents);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Fetch past events
const pastEvents = async (req, res) => {
  try {
    const pastEvents = await Event.find().where("date").lte(Date.now()).exec();
    res.status(200).json(pastEvents);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Fetch trending events
const trendingEvents = async (req, res) => {
  try {
    console.log("Fetching trending events...");
    const trendingEvents = await Event.find({ trending: true }).exec();
    console.log("Trending events found:", trendingEvents);
    res.status(200).json(trendingEvents);
  } catch (error) {
    console.error("Error fetching trending events:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  rsvpEvent,
  upcomingEvents,
  pastEvents,
  trendingEvents,
  validateCreateEvent,
};
