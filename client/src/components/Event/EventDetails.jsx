import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
const URL = import.meta.env.VITE_APP_BACKEND_URL;

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({});

  useEffect(() => {
    const fetchEvent = async () => {
      const { data } = await axios.get(`${URL}/events/${id}`);
      setEvent(data);
    };

    fetchEvent();
  }, [id]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative">
      <button
        className="absolute top-4 left-4 underline text-black px-4 py-2 rounded"
        onClick={() => navigate(-1)}
      >
        BACK
      </button>

      <div className="bg-white p-8 rounded max-w-md border">
        <img
          src={
            event.photo ||
            "https://images.pexels.com/photos/2291592/pexels-photo-2291592.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
          alt={event.title}
          className="rounded-lg w-[100%] "
        />

        <div className="my-4">
          <p>
            <strong>Date:</strong> {new Date(event.date).toLocaleString()}
          </p>
          <div>
            <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
            <p className="text-gray-700 mb-4">{event.description}</p>
          </div>
        </div>

        <div className="flex justify-between border rounded-lg items-center p-2">
          <div className="flex flex-col">
            <p className="text-gray-600 mb-2">Date and Time:</p>
            {new Date(event.date).toLocaleString()}
          </div>
          <div className="flex flex-col">
            <p className="text-gray-600">Location:</p>
            {event.location}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
