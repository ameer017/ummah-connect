import React, { useState } from "react";
import axios from "axios";
import useRedirectLoggedOutUser from "../UseRedirect/UseRedirectLoggedOutUser";
const URL = import.meta.env.VITE_APP_BACKEND_URL;

const MentorshipSignUp = () => {
    useRedirectLoggedOutUser("/login")
  const [tag, setTag] = useState("mentee");
  const [expertise, setExpertise] = useState([]);
  const [interests, setInterests] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);

  const handleSubmit = async () => {
    try {
      await axios.post(`${URL}/mentorship/signup-mentorship`, {
        tag,
        expertise,
        interests,
        availableTimes,
      });
      alert("Signed up successfully");
    } catch (error) {
      alert("Error signing up");
    }
  };

  return (
    <div>
      <h1>Mentorship Sign-Up</h1>
      <select value={tag} onChange={(e) => setTag(e.target.value)}>
        <option value="mentor">Mentor</option>
        <option value="mentee">Mentee</option>
      </select>
      {/* Add input fields for expertise, interests, and available times */}
      <button onClick={handleSubmit}>Sign Up</button>
    </div>
  );
};

export default MentorshipSignUp;
