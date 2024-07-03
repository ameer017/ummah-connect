import React, { useEffect, useState } from "react";
import axios from "axios";
const URL = import.meta.env.VITE_APP_BACKEND_URL;


const MentorshipList = () => {
  const [mentorships, setMentorships] = useState([]);

  useEffect(() => {
    fetchMentorships();
  }, []);

  const fetchMentorships = async () => {
    try {
      const response = await axios.get(`${URL}/mentorships`); 
      setMentorships(response.data);
    } catch (error) {
      console.error("Error fetching mentorships:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Mentorship Connections</h2>
      <ul>
        {mentorships.map((mentorship) => (
          <li
            key={mentorship._id}
            className="border border-gray-200 rounded p-4 mb-2"
          >
            <p>
              <strong>Mentor:</strong> {mentorship.mentor.name}
            </p>
            <p>
              <strong>Mentee:</strong> {mentorship.mentee.name}
            </p>
            <p>
              <strong>Status:</strong> {mentorship.status}
            </p>
            <p>
              <strong>Notes:</strong> {mentorship.notes}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MentorshipList;
