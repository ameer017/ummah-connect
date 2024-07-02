const Mentorship = require("../models/mentorship");

// Create a mentorship connection
const createMentorship = async (req, res) => {
  const { mentor, mentee, notes } = req.body;
  try {
    const mentorship = new Mentorship({
      mentor,
      mentee,
      notes,
    });
    const createdMentorship = await mentorship.save();
    res.status(201).json(createdMentorship);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all mentorship connections
const getMentorships = async (req, res) => {
  try {
    const mentorships = await Mentorship.find()
      .populate("mentor", "name")
      .populate("mentee", "name");
    res.json(mentorships);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single mentorship connection
const getMentorship = async (req, res) => {
  try {
    const mentorship = await Mentorship.findById(req.params.id)
      .populate("mentor", "name")
      .populate("mentee", "name");
    if (mentorship) {
      res.json(mentorship);
    } else {
      res.status(404).json({ message: "Mentorship not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a mentorship connection
const updateMentorship = async (req, res) => {
  const { status, startDate, endDate, notes } = req.body;
  try {
    const mentorship = await Mentorship.findById(req.params.id);
    if (mentorship) {
      mentorship.status = status || mentorship.status;
      mentorship.startDate = startDate || mentorship.startDate;
      mentorship.endDate = endDate || mentorship.endDate;
      mentorship.notes = notes || mentorship.notes;

      const updatedMentorship = await mentorship.save();
      res.json(updatedMentorship);
    } else {
      res.status(404).json({ message: "Mentorship not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a mentorship connection
const deleteMentorship = async (req, res) => {
  try {
    const mentorship = await Mentorship.findById(req.params.id);
    if (mentorship) {
      await mentorship.remove();
      res.json({ message: "Mentorship removed" });
    } else {
      res.status(404).json({ message: "Mentorship not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createMentorship,
  getMentorships,
  getMentorship,
  updateMentorship,
  deleteMentorship,
};
