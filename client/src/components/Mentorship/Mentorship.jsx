import React, { useEffect, useState } from "react";
import axios from "axios";
import useRedirectLoggedOutUser from "../UseRedirect/UseRedirectLoggedOutUser";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoginStatus,
  getUser,
  selectIsLoggedIn,
  selectUser,
} from "../../redux/feature/auth/authSlice";
const URL = import.meta.env.VITE_APP_BACKEND_URL;

const MentorshipSignUp = () => {
  useRedirectLoggedOutUser("/login");
  const [tag, setTag] = useState("mentee");
  const [expertise, setExpertise] = useState("");
  const [interests, setInterests] = useState("");
  const [availableTimes, setAvailableTimes] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(getLoginStatus());
    if (isLoggedIn && user === null) {
      dispatch(getUser());
    }
  }, [dispatch, isLoggedIn, user]);

  const handleSubmit = async () => {
    if (!user) {
      toast.error("User not found");
      return;
    }
    try {
      setLoading(true);
      await axios.post(`${URL}/mentorship/signup-mentorship`, {
        userId: user._id,
        tag,
        expertise: expertise.split(","),
        interests: interests.split(","),
        availableTimes: availableTimes.split(","),
      });
      toast.success(
        `${tag.charAt(0).toUpperCase() + tag.slice(1)} signed up successfully`
      );
      navigate("/mentors-overview");
    } catch (error) {
      setLoading(false);
      toast.error("Error signing up");
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-center mb-6">
        Mentorship Sign-Up
      </h1>
      <div className="w-[360px] md:w-[600px] p-2">
        <div className="mb-4">
          <label className="block text-gray-700">
            How Should We Identify You?
          </label>
          <select
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="mentor">Mentor</option>
            <option value="mentee">Mentee</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Expertise (comma separated)
          </label>
          <input
            type="text"
            value={expertise}
            onChange={(e) => setExpertise(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Interests (comma separated)
          </label>
          <input
            type="text"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Available Times (comma separated)
          </label>
          <input
            type="text"
            value={availableTimes}
            onChange={(e) => setAvailableTimes(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {loading ? "Signing you up..." : "Sign Up"}
        </button>
      </div>

      <p className="text-[15px] ">
        Already signed up?... Go to <Link to="/mentors-overview" className="text-blue-600 font-bold underline " >Overview</Link>
      </p>
    </div>
  );
};

export default MentorshipSignUp;
