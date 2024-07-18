const User = require("../models/authModel");
const Mentorship = require("../models/mentorship");

const createMentor = async (req, res) => {
  try {
    const { userId, tag, expertise, interests, availableTimes } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      {
        tag,
        expertise,
        interests,
        availableTimes,
      },
      { new: true }
    );
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

const findMentors = async (req, res) => {
  try {
    const interests = req.params.interests.split(",");
    console.log('Finding mentors with interests:', interests);
    const mentors = await User.find({
      tag: "mentor",
      expertise: { $in: interests },
    });
    res.status(200).send(mentors);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

// Function to find mentees based on expertise
const findMentees = async (req, res) => {
  try {
    const expertise = req.params.expertise.split(",");
    console.log('Finding mentees with expertise:', expertise);
    const mentees = await User.find({
      tag: "mentee",
      interests: { $in: expertise },
    });
    res.status(200).send(mentees);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

const scheduleSession = async (req, res) => {
  try {
    const { mentorId, menteeId, sessionDate, topics } = req.body;
    const session = new Mentorship({ mentorId, menteeId, sessionDate, topics });
    await session.save();
    res.status(201).send(session);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  createMentor,
  findMentors,
  findMentees,
  scheduleSession,
};
