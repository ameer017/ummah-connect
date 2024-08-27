import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/feature/auth/authSlice";
import { toast } from "react-toastify";
import useRedirectLoggedOutUser from "../UseRedirect/UseRedirectLoggedOutUser";
import PageLoader from "../Loader/PageLoader";

const URL = import.meta.env.VITE_APP_BACKEND_URL;

const EventDetails = ({ userId }) => {
  useRedirectLoggedOutUser("/login");
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [event, setEvent] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [organizer, setOrganizer] = useState(null);
  const [ticketDetails, setTicketDetails] = useState({});
  const [userID, setUserID] = useState("");
  const [hasBooked, setHasBooked] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const { user } = useSelector((state) => state.auth);
  // console.log(user)

  useEffect(() => {
    if (user) {
      dispatch(getUser(userId));
      setUserID(user._id);
    }
  }, [dispatch, user, userId]);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        // Fetch event details
        const { data: eventData } = await axios.get(`${URL}/events/${id}`);
        setEvent(eventData);

        // Fetch organizer details
        const { data: organizerData } = await axios.get(
          `${URL}/events/organizer/${eventData.organizer._id}`
        );
        setOrganizer(organizerData);

        // Fetch ticket details
        const { data: ticketData } = await axios.get(`${URL}/events/${id}/ticket`);
        setTicketDetails(ticketData.tickets);
        // console.log(ticketData.tickets)

        // Debugging logs
        // console.log("Fetched eventData:", eventData);
        // console.log("Fetched user:", user);

        // Check if user has already booked this event
        if (user && user.bookedEvents && Array.isArray(user.bookedEvents)) {
          const eventId = String(eventData._id);  // Ensure event ID is a string
          // console.log("Event ID to check:", eventId);

          // Check if the event ID exists in bookedEvents
          const isBooked = user.bookedEvents.some(evId => {
            // console.log("Checking booked event ID:", evId);
            return String(evId) === eventId;
          });

          setHasBooked(isBooked);
          // console.log("Booking status:", isBooked);
        } else {
          setHasBooked(false);
          // console.log("No booked events or user not defined");
        }
      } catch (error) {
        // console.error("Error fetching event details:", error);
        setError("Failed to fetch event details");
      } finally {
        setFetching(false);
      }
    };

    fetchEventDetails();
  }, [id, user, dispatch]);

  useEffect(() => {
    if (ticketDetails.price) {
      setTotalPrice(ticketDetails.price * quantity);
    }
  }, [quantity, ticketDetails]);



  const buyTicketHandler = async () => {
    setLoading(true);
    setError("");

    try {
      const returnUrl = `${window.location.origin}/payment-success`;
      const { data } = await axios.post(`${URL}/events/buy-ticket/${id}`, {
        quantity,
        returnUrl,
      });

      const paymentLink = ticketDetails.paymentLink;
      console.log(paymentLink)
      if (paymentLink) {
        window.location.href = paymentLink;
      } else if (ticketDetails.price === 0) {
        navigate("/event-list");
        toast.success("Ticket purchased successfully!");
      } else {
        navigate("/event-list");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || error.message || "An error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <PageLoader />
      </div>
    );
  }

  const isOrganizer = organizer && userID === organizer._id;
  const isNotOrganizer = !isOrganizer;

  // Ensure tickets are available and the user has not booked already
  const ticketsAvailable = ticketDetails.quantity > 0 && !hasBooked;

  return (
    <div className="min-h-screen flex items-center justify-center  relative">
      <button
        className="absolute top-4 left-16 underline text-black px-4 py-2 rounded"
        onClick={() => navigate(-1)}
      >
        BACK
      </button>

      <div className=" p-8 rounded w-[350px] md:w-[800px] mt-[2rem]">
        <img
          src={event.photo}
          alt={event.title}
          className="rounded-lg w-[100%]"
          loading="lazy"
        />

        <div className="my-4 flex justify-between items-center">
          <div className="flex flex-col w-3/4">
            <p>
              <strong>Date:</strong> {new Date(event.date).toLocaleString()}
            </p>
            <div>
              <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
              <p className="text-gray-700 mb-4 w-[90%]">{event.subTitle}</p>
            </div>
          </div>

          {ticketsAvailable && isNotOrganizer && (
            <div className="px-2">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-[100%] px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  min="1"
                  max={ticketDetails.quantity || 1}
                />
              </div>

              <button
                onClick={buyTicketHandler}
                className="w-[100%] bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
                disabled={loading || ticketDetails.quantity <= 0}
              >
                {loading ? "Processing..." : `Buy Ticket # ${totalPrice}`}
              </button>
            </div>
          )}

          {isNotOrganizer && hasBooked && (
            <button
              className="text-black px-4 py-2 rounded cursor-not-allowed bg-green-100 flex items-center gap-2"
              disabled
            >
              Booked <IoMdCheckmarkCircle color="white" />
            </button>
          )}

          {!ticketsAvailable && !hasBooked && (
            <button
              className="bg-red-500 text-white py-2 px-4 rounded cursor-not-allowed"
              disabled
            >
              Sold Out
            </button>
          )}
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <div className="flex justify-between border rounded-lg items-center px-2 py-6">
          <div className="flex flex-col">
            <p className="mb-2 font-bold">Date and Time:</p>
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
          <p className="mt-6 font-bold">
            Available Seat: {ticketDetails.quantity}/{event.limit}
          </p>
        </div>

        <div className="border my-4 rounded-lg p-4">
          <h1 className="font-bold my-4">Tickets Metrics</h1>
          <div className="flex justify-between p-2">
            <p>Ticket Sold: {ticketDetails.sold}</p>
            <p>Ticket Remaining: {ticketDetails.quantity}</p>
          </div>
        </div>

        <div className="border my-4 rounded-lg p-4">
          <h1 className="font-bold my-4">Organized By:</h1>
          {organizer ? (
            <>
              <p>
                Name: {organizer.firstName} {organizer.lastName}
              </p>
            </>
          ) : (
            <p>Loading organizer details...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
