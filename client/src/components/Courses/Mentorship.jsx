import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const URL = import.meta.env.VITE_APP_BACKEND_URL;

const MentorshipForm = () => {
  const [mentor, setMentor] = useState("");
  const [mentee, setMentee] = useState("");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${URL}/mentorships`, { mentor, mentee, notes });
      navigate("/mentors-overview");
    } catch (error) {
      console.error("Error creating mentorship:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-4 p-4 border border-gray-200 rounded"
    >
      <h2 className="text-xl font-bold mb-4">Create Mentorship Connection</h2>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Mentor</label>
        <input
          type="text"
          value={mentor}
          onChange={(e) => setMentor(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Mentee</label>
        <input
          type="text"
          value={mentee}
          onChange={(e) => setMentee(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none"
      >
        Create
      </button>
    </form>
  );
};

export default MentorshipForm;
