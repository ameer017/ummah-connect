const User = require("../models/authModel");
const Mentorship = require("../models/mentorship");
const { sendEmail } = require("../utils");

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
    const interests = req.params.interests
      ? req.params.interests.split(",")
      : [];
    const query = { tag: "mentor" };
    if (interests.length > 0) {
      query.expertise = { $in: interests };
    }
    const mentors = await User.find(query);
    res.status(200).send(mentors);
  } catch (error) {
    res.status(400).send(error);
  }
};

const findMentees = async (req, res) => {
  try {
    const expertise = req.params.expertise
      ? req.params.expertise.split(",")
      : [];
    const query = { tag: "mentee" };
    if (expertise.length > 0) {
      query.interests = { $in: expertise };
    }
    const mentees = await User.find(query);
    res.status(200).send(mentees);
  } catch (error) {
    res.status(400).send(error);
  }
};

const scheduleSession = async (req, res) => {
  try {
    const { mentorId, menteeId, sessionDate, topics } = req.body;

    const session = new Mentorship({
      mentorId,
      menteeId,
      sessionDate,
      topics,
      status: "pending",
    });

    await session.save();

    // Fetch mentor and mentee details
    const mentor = await User.findById(mentorId);
    const mentee = await User.findById(menteeId);

    // Send confirmation emails
    const mentorEmailOptions = {
      from: process.env.EMAIL_USER,
      to: mentor.emailAddress,
      subject: "New Session Request",
      text: `You have a new session request from ${mentee.firstName} ${mentee.lastName} on ${sessionDate}. Please accept or decline the session using the following link: ${process.env.FRONTEND_URL}/accept-session/${session._id}`
    };

    const menteeEmailOptions = {
      from: process.env.EMAIL_USER,
      to: mentee.emailAddress,
      subject: "Session Request Sent",
      text: `Your session request with ${mentor.firstName} ${mentor.lastName} on ${sessionDate} has been sent. You will be notified once the mentor accepts or declines the request.`
    };

    await sendEmail(mentorEmailOptions);
    await sendEmail(menteeEmailOptions);

    res.status(201).send(session);
  } catch (error) {
    res.status(400).send(error);
  }
};

const acceptSession = async (req, res) => {
  try {
    const { sessionId, status } = req.body; 

    const session = await Mentorship.findById(sessionId);
    if (!session) return res.status(404).send("Session not found");

    session.status = status;
    await session.save();

    // Fetch mentor and mentee details
    const mentor = await User.findById(session.mentorId);
    const mentee = await User.findById(session.menteeId);

    // Send notification emails
    const mentorEmailOptions = {
      from: process.env.EMAIL_USER,
      to: mentor.emailAddress,
      subject: `Session ${status}`,
      text: `You have ${status} the session with ${mentee.firstName} ${mentee.lastName} on ${session.sessionDate}.`
    };

    const menteeEmailOptions = {
      from: process.env.EMAIL_USER,
      to: mentee.emailAddress,
      subject: `Session ${status}`,
      text: `The mentor has ${status} your session request on ${session.sessionDate}.`
    };

    await sendEmail(mentorEmailOptions);
    await sendEmail(menteeEmailOptions);

    if (status === "accepted") {
      mentor.availableTimes = mentor.availableTimes.filter(time => time !== session.sessionDate);
      mentee.availableTimes = mentee.availableTimes.filter(time => time !== session.sessionDate);
      await mentor.save();
      await mentee.save();
    }

    res.status(200).send(session);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await Mentorship.findById(sessionId)
      .populate("mentorId", "firstName lastName email")
      .populate("menteeId", "firstName lastName email");
    
    if (!session) {
      return res.status(404).send("Session not found");
    }

    res.status(200).send(session);
  } catch (error) {
    res.status(400).send(error);
  }
};


module.exports = {
  createMentor,
  findMentors,
  findMentees,
  scheduleSession,
  acceptSession,
getSession};
