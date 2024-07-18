import React, { useState } from "react";
import axios from "axios";
import useRedirectLoggedOutUser from "../UseRedirect/UseRedirectLoggedOutUser";
const URL = import.meta.env.VITE_APP_BACKEND_URL;

const ScheduleSession = ({ mentorId, menteeId }) => {
  useRedirectLoggedOutUser("/login");
  const [sessionDate, setSessionDate] = useState("");
  const [topics, setTopics] = useState([]);

  const handleSubmit = async () => {
    try {
      await axios.post(`${URL}/mentorship/schedule-session`, {
        mentorId,
        menteeId,
        sessionDate,
        topics,
      });
      alert("Session scheduled successfully");
    } catch (error) {
      alert("Error scheduling session");
    }
  };

  return (
    <div>
      <h1>Schedule Mentorship Session</h1>
      <input
        type="datetime-local"
        value={sessionDate}
        onChange={(e) => setSessionDate(e.target.value)}
      />
      <textarea
        value={topics}
        onChange={(e) => setTopics(e.target.value.split(","))}
      ></textarea>
      <button onClick={handleSubmit}>Schedule</button>
    </div>
  );
};

export default ScheduleSession;
