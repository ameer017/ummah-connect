import React, { useEffect, useState } from 'react';
const URL = import.meta.env.VITE_APP_BACKEND_URL;

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch(`${URL}/api/events`);
      const data = await response.json();
      setEvents(data);
    };

    fetchEvents();
  }, []);

  const handleRSVP = async (eventId) => {
    try {
      const response = await fetch(`${URL}/events/${eventId}/rsvp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        },
      });
      if (response.ok) {
        alert('RSVP successful!');
        // Optionally, update the event list to reflect the new RSVP status
      } else {
        alert('Failed to RSVP. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>
      <ul className="space-y-4">
        {events.map(event => (
          <li key={event._id} className="p-4 border rounded shadow-md">
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p>{event.description}</p>
            <p className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
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
  );
};

export default EventList;
