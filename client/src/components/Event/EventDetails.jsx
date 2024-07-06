import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { AdminLink } from "../Protect/HiddenLink";
const URL = import.meta.env.VITE_APP_BACKEND_URL;

const EventDetails = ({ userId }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasBooked, setHasBooked] = useState(false);
  const [organizer, setOrganizer] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await axios.get(`${URL}/events/${id}`);
        setEvent(data);
        console.log(data);

        if (data.organizer && data.organizer._id) {
          const organizerData = await axios.get(
            `${URL}/events/organizer/${data.organizer._id}`
          );
          setOrganizer(organizerData.data);
          console.log(organizerData.data);
        }

      
        // Check if the user has already booked a ticket
        const userResponse = await axios.get(`${URL}/auth/get-user/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const user = userResponse.data._id;
        // console.log(user)
        const hasBookedTicket = data.attendees.includes(user);
        setHasBooked(hasBookedTicket);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch event details");
      }
    };

    fetchEvent();
  }, [id]);

  const buyTicketHandler = async () => {
    setLoading(true);
    setError("");

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      await axios.post(`${URL}/events/buy-ticket/${id}`, { quantity }, config);

      setLoading(false);
      alert("Ticket purchased successfully!");
      setHasBooked(true); // Update the state to reflect the booking
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative">
      <button
        className="absolute top-4 left-4 underline text-black px-4 py-2 rounded"
        onClick={() => navigate(-1)}
      >
        BACK
      </button>

      <div className="bg-white p-8 rounded w-[350px] md:w-[800px] mt-[10rem] ">
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
            <p className="text-gray-700 mb-4">{event.subTitle}</p>
          </div>

          {!hasBooked && event.tickets?.quantity > 0 && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  min="1"
                  max={event.tickets?.quantity || 1}
                />
              </div>

              <button
                onClick={buyTicketHandler}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
                disabled={loading || event.tickets?.quantity <= 0}
              >
                {loading ? "Processing..." : "Buy Ticket"}
              </button>
            </>
          )}

          {hasBooked && (
            <button
              className="w-full bg-gray-500 text-white py-2 px-4 rounded cursor-not-allowed"
              disabled
            >
              Booked
            </button>
          )}

          {event.tickets?.quantity <= 0 && (
            <button
              className="w-full bg-red-500 text-white py-2 px-4 rounded cursor-not-allowed"
              disabled
            >
              Sold Out
            </button>
          )}
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        <div className="flex justify-between border rounded-lg items-center p-2">
          <div className="flex flex-col">
            <p className=" mb-2 font-bold">Date and Time:</p>
            {new Date(event.date).toLocaleString()}
          </div>
          <div className="flex flex-col">
            <p className="font-bold">Location:</p>
            {event.location}
          </div>
        </div>

        <div className="border my-4 rounded-lg p-4">
          <h1 className="font-bold my-4">About this event</h1>

          <p>{event.description}</p>
        </div>
        {/* <AdminLink>
          <div className="border my-4 rounded-lg p-4">
            <h1 className="font-bold my-4">Tickets Metrics</h1>

            <p>{event.description}</p>
          </div>
        </AdminLink> */}

        <div className="border my-4 rounded-lg p-4">
          <h1 className="font-bold my-4">Organized By:</h1>

          <p>
            {organizer ? (
              <>
                <p>Name: {organizer.firstName}</p>
                <p>Interests: {organizer.interests}</p>
              </>
            ) : (
              <p>Loading organizer details...</p>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
