import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/feature/auth/authSlice";

const URL = import.meta.env.VITE_APP_BACKEND_URL;

const ScheduleSession = () => {
  const { id } = useParams();
  const user = useSelector(selectUser);
  const [person, setPerson] = useState(null);
  const [sessionDate, setSessionDate] = useState("");
  const [topics, setTopics] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPersonDetails = async () => {
      try {
        const response = await axios.get(`${URL}/auth/get-user/${id}`);
        if (!response.data.available) {
          toast.error("This user is not available for scheduling.");
          navigate(-1); 
          return;
        }
        setPerson(response.data);
        setAvailableTimes(response.data.availableTimes || []);
      } catch (error) {
        toast.error("Error fetching details");
      }
    };
    fetchPersonDetails();
  }, [id]);

  const handleSubmit = async () => {
    try {
      await axios.post(`${URL}/mentorship/schedule-session`, {
        mentorId: user.tag === "mentee" ? id : user._id,
        menteeId: user.tag === "mentee" ? user._id : id,
        sessionDate,
        topics: topics.split(","),
      });
      toast.success("Session scheduled successfully");
      navigate("/mentors-overview");
    } catch (error) {
      toast.error("Error scheduling session");
    }
  };

  return (
    <div className="container mx-auto p-4 mt-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Schedule a Session
      </h1>
      {person ? (
        <div className="w-[360px] md:w-[600px] p-4 mx-auto bg-white shadow-md rounded-lg">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">
              {person.firstName} {person.lastName}
            </h2>
            <p className="text-gray-700">
              {user.tag === "mentee" ? "Expertise" : "Interests"}:{" "}
              {person.expertise.join(", ")}
            </p>
            <p className="text-gray-700">Available Times:</p>
            <input
              type="text"
              value={availableTimes.join(", ")}
              onChange={(e) => setAvailableTimes(e.target.value.split(","))}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Session Date</label>
            <input
              type="date"
              value={sessionDate}
              onChange={(e) => setSessionDate(e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              Topics (comma separated)
            </label>
            <input
              type="text"
              placeholder="what are you looking forward to learn"
              value={topics}
              onChange={(e) => setTopics(e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Schedule Session
          </button>
        </div>
      ) : (
        <p>Loading details...</p>
      )}
    </div>
  );
};

export default ScheduleSession;
