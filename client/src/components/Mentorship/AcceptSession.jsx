import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const URL = import.meta.env.VITE_APP_BACKEND_URL;

const AcceptSession = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await axios.get(
          `${URL}/mentorship/get-session/${sessionId}`
        );
        setSession(response.data);
      } catch (error) {
        toast.error("Error fetching session details");
      }
    };
    fetchSession();
  }, [sessionId]);

  const handleAction = async (status) => {
    try {
      await axios.post(`${URL}/mentorship/accept-session`, {
        sessionId,
        status,
      });
      toast.success(`Session ${status} successfully`);
      navigate("/mentors-overview");
    } catch (error) {
      toast.error("Error processing session");
    }
  };

  return (
    <div className="container mx-auto p-4 mt-6">
      {session ? (
        <div className="w-[300px] md:w-[600px] p-4 mx-auto bg-white shadow-md rounded-lg">
          <h1 className="text-2xl font-bold text-center mb-6">
            Session Details
          </h1>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(session.sessionDate).toLocaleString()}
          </p>
          <p>
            <strong>Topics:</strong> {session.topics.join(", ")}
          </p>
          <div className="flex justify-between gap-2 mt-4 flex-col md:flex-row">
            <button
              onClick={() => handleAction("accepted")}
              className="w-full bg-green-500 text-white py-2 px-4 rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Accept
            </button>
            <button
              onClick={() => handleAction("declined")}
              className="w-full bg-red-500 text-white py-2 px-4 rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Decline
            </button>
          </div>
        </div>
      ) : (
        <p>Loading session details...</p>
      )}
    </div>
  );
};

export default AcceptSession;
