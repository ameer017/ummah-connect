import React, { useEffect, useLayoutEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom"
import Sidebar from '../Sidebar/Sidebar';
import { getUser } from "../../redux/feature/auth/authSlice";
import useRedirectLoggedOutUser from "../UseRedirect/UseRedirectLoggedOutUser";
import PageLoader from "../Loader/PageLoader";

const URL = import.meta.env.VITE_APP_BACKEND_URL;

const BookedEvents = ({ userId }) => {
    useRedirectLoggedOutUser("/login");

    const [bookedEventsDetails, setBookedEventsDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const initialState = {
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        photo: user?.photo || "",
        role: user?.role || "",
    };

    const [profile, setProfile] = useState(initialState);

    useEffect(() => {
        dispatch(getUser(userId));
    }, [dispatch, userId]);

    useLayoutEffect(() => {
        if (user) {
            setProfile({
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                photo: user.photo,
            });
        }
    }, [user]);

    useEffect(() => {
        const fetchBookedEvents = async () => {
            try {
                const eventDetailsPromises = user.bookedEvents.map(eventId =>
                    axios.get(`${URL}/events/${eventId}`)
                );

                const eventDetailsResponses = await Promise.all(eventDetailsPromises);
                const eventDetails = eventDetailsResponses.map(response => response.data);

                setBookedEventsDetails(eventDetails);
            } catch (error) {
                setError('Failed to fetch booked event details.');
            } finally {
                setLoading(false);
            }
        };

        if (user?.bookedEvents?.length) {
            fetchBookedEvents();
        } else {
            setLoading(false);
        }
    }, [user]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <PageLoader />
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 text-center py-8">{error}</div>;
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                profile={profile}
                user={user}
            />

            <div
                className={`w-full bg-white p-4 flex justify-center ${isSidebarOpen ? "md:ml-1/4" : ""
                    }`}
            >

                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold text-center mb-8">Your Booked Events</h1>
                    {bookedEventsDetails.length > 0 ? (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {bookedEventsDetails.map(event => (
                                <Link to={`/event/${event._id}`}>

                                    <div key={event._id} className="bg-white shadow-lg rounded-lg p-6">
                                        <h2 className="text-2xl font-semibold mb-4">{event.title}</h2>
                                        <p className="text-gray-700 mb-2">{event.subTitle}</p>
                                        <p className="text-gray-500">Date: {new Date(event.date).toLocaleString()}</p>
                                        <p className="text-gray-500">Location: {event.location}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">You have no booked events.</p>
                    )}
                </div>
            </div>

        </div>
    );
};

export default BookedEvents;
