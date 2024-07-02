import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const URL = import.meta.env.VITE_APP_BACKEND_URL;


const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({});

  useEffect(() => {
    const fetchEvent = async () => {
      const { data } = await axios.get(`${URL}/events/${id}`);
      setEvent(data);
    };

    fetchEvent();
  }, [id]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
        <p className="text-gray-700 mb-4">{event.description}</p>
        <p className="text-gray-600 mb-2">
          <strong>Date:</strong> {new Date(event.date).toLocaleString()}
        </p>
        <p className="text-gray-600">
          <strong>Location:</strong> {event.location}
        </p>
      </div>
    </div>
  );
};

export default EventDetails;
