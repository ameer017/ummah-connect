import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const URL = import.meta.env.VITE_APP_BACKEND_URL;

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch(`${URL}/events`);
      const data = await response.json();
      setEvents(data);
    };

    fetchEvents();
  }, []);

  const handleRSVP = async (eventId) => {
    try {
      const response = await fetch(`${URL}/events/${eventId}/rsvp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        alert("RSVP successful!");
        // Optionally, update the event list to reflect the new RSVP status
      } else {
        alert("Failed to RSVP. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-1/4 bg-gray-200 p-4 flex flex-col space-y-2">
        <p className=" text-[20px] ">Events Overview</p>

        <Link
          to="/create-event"
          className="text-blue-500 hover:text-blue-700 text-[18px] "
        >
          Create Event
        </Link>

        {/* <Link
          to="/report-thread"
          className="text-blue-500 hover:text-blue-700 text-[18px] "
        >
          Reports
        </Link> */}
      </div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event._id} className="p-4 border rounded shadow-md">
              <Link
                to={`/event/${event._id}`}
                className="text-xl font-semibold text-blue-500 hover:underline"
              >
                {event.title}
              </Link>
              <p>{event.description}</p>
              <p className="text-sm text-gray-500">
                {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">{event.location}</p>
              <button
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => handleRSVP(event._id)}
              >
                RSVP
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EventList;
