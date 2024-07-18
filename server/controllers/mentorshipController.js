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
    await user.save();
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

const findMentors = async (req, res) => {
  try {
    const interests = req.params.interests.split(",");
    const mentors = await User.find({
      role: "mentor",
      expertise: { $in: interests },
    });
    res.status(200).send(mentors);
  } catch (error) {
    res.status(400).send(error);
  }
};

const findMentees = async (req, res) => {
  try {
    const expertise = req.params.expertise.split(",");
    const mentees = await User.find({
      role: "mentee",
      interests: { $in: expertise },
    });
    res.status(200).send(mentees);
  } catch (error) {
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
