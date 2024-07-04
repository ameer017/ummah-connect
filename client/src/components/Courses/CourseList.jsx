import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import useRedirectLoggedOutUser from "../UseRedirect/UseRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/feature/auth/authSlice";
import { GrOverview, GrNotes } from "react-icons/gr";
import { IoBookOutline } from "react-icons/io5";
import { MdOutlineEventAvailable, MdForum } from "react-icons/md";
import { FaFacebookF, FaInstagram, FaLinkedin, FaPen } from "react-icons/fa";
import { BiMessageSquareEdit } from "react-icons/bi";
import { BsTwitterX } from "react-icons/bs";
import EditProfileModal from "../../pages/profile/EditProfileModal";
import Notification from "../Notification/Notification";
import axios from "axios";
import { IoIosArrowRoundForward } from "react-icons/io";
import { MdEventNote } from "react-icons/md";
const URL = import.meta.env.VITE_APP_BACKEND_URL;

const CourseList = ({ userId }) => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const { isLoading, isLoggedIn, isSuccess, message, user } = useSelector(
    (state) => state.auth
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const isActive = (path) =>
    location.pathname === path
      ? "text-neutral-900 bg-neutral-200 rounded-lg "
      : "";

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const initialState = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    username: user?.username || "",
    emailAddress: user?.emailAddress || "",
    phone: user?.phone || "",
    gender: user?.gender || "",
    isVerified: user?.isVerified || false,
    photo: user?.photo || "",
    role: user?.role || "",
    interests: user?.interests || "",
    location: user?.location || "",
    profession: user?.profession || "",
    facebook: user?.socialMediaLinks.facebook || "",
    linkedIn: user?.socialMediaLinks.linkedin || "",
    instagram: user?.socialMediaLinks.instagram || "",
    x: user?.socialMediaLinks.twitter || "",
  };
  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch]);

  useLayoutEffect(() => {
    if (user) {
      setProfile({
        ...profile,
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress,
        phone: user.phone,
        username: user.username,
        gender: user.gender,
        role: user.role,
        isVerified: user.isVerified,
        photo: user.photo,
        interests: user.interests,
        location: user.location,
        profession: user.profession,
        facebook: user?.socialMediaLinks.facebook,
        linkedIn: user?.socialMediaLinks.linkedin,
        instagram: user?.socialMediaLinks.instagram,
        x: user?.socialMediaLinks.twitter,
      });
    }
  }, [user]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await axios.get(`${URL}/discussion/all-threads`);
        setThreads(response.data);
        // console.log(response.data)
      } catch (error) {
        console.error("Error fetching threads:", error);
      }
    };

    fetchThreads();
  }, []);

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch(`${URL}/events`);
      const data = await response.json();
      setEvents(data);
    };

    fetchEvents();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {isSidebarOpen && (
        <div className="fixed inset-0 md:relative md:w-1/4 bg-white p-4 flex flex-col space-y-2 z-20 border-r border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[20px] my-3">
              <img
                src={imagePreview === null ? user?.photo : imagePreview}
                alt=""
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              />
              <div>
                <p className="text-[18px]">
                  {profile.firstName} {profile.lastName}
                </p>
                <p className="text-[18px] text-neutral-400">
                  {profile.profession}
                </p>
              </div>
            </div>
            <button
              className="p-2 bg-white text-white border rounded-full"
              onClick={toggleSidebar}
            >
              <IoIosArrowBack size={25} color="black" />
            </button>
          </div>

          <Link
            className={`flex gap-[10px] p-3 mt-3 items-center text-gray-400 ${isActive(
              "/course-list"
            )}`}
            to="/course-list"
          >
            <GrOverview size={25} /> <p className="text-[17px]">Overview</p>
          </Link>
          <Link
            className={`flex gap-[10px] p-3 mt-3 items-center text-gray-400 ${isActive(
              "/my-courses"
            )}`}
            to="/my-courses"
          >
            <IoBookOutline size={25} />{" "}
            <p className="text-[17px]">My Courses</p>
          </Link>
          <Link
            className={`flex gap-[10px] p-3 mt-3 items-center text-gray-400 ${isActive(
              "/my-events"
            )}`}
            to="/my-events"
          >
            <MdOutlineEventAvailable size={25} />{" "}
            <p className="text-[17px]">My Events</p>
          </Link>
          <Link
            className={`flex gap-[10px] p-3 mt-3 items-center text-gray-400 ${isActive(
              "/forum"
            )}`}
            to="/forum"
          >
            <MdForum size={25} /> <p className="text-[17px]">Forum</p>
          </Link>
          <Link
            className={`flex gap-[10px] p-3 mt-3 items-center text-gray-400 ${isActive(
              "/content"
            )}`}
            to="/content"
          >
            <GrNotes size={25} /> <p className="text-[17px]">Content</p>
          </Link>
        </div>
      )}

      {!isSidebarOpen && (
        <button
          className="p-2 bg-white fixed top-40 left-0 z-10 mt-2 mr-2 border rounded-full"
          onClick={toggleSidebar}
        >
          <IoIosArrowForward size={25} color="black" />
        </button>
      )}

      <div
        className={`w-full bg-white p-4 flex justify-center ${
          isSidebarOpen ? "md:ml-1/4" : ""
        }`}
      >
        <div className="flex flex-col items-left justify-center w-full md:w-5/6 p-4">
          {!profile.isVerified && <Notification />}
          <div className="p-4">
            <h1 className="font-normal text-3xl">General Overview</h1>
            <p className="text-neutral-400">
              General Overview: A Snapshot of Your Information, Activities, and
              Achievements
            </p>
          </div>
          <div className="p-4">
            <p>Profile Overview</p>
            <div className="border p-6 rounded-lg">
              <img
                src={imagePreview === null ? user?.photo : imagePreview}
                alt=""
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              />
              <div>
                <p>Name and Basic Info</p>
                <p className="text-[15px] text-neutral-400 mt-2">
                  Name: {profile.firstName} {profile.lastName}
                </p>
                <p className="text-[15px] text-neutral-400">
                  Email: {profile.emailAddress}
                </p>
                <p className="text-[15px] text-neutral-400">
                  Interest: {profile.interests}
                </p>
              </div>
              <div
                className="flex items-center justify-center gap-2 rounded-lg border bg-neutral-100 w-[100px] my-4 p-3 cursor-pointer"
                onClick={openModal}
              >
                <BiMessageSquareEdit
                  size={15}
                  color="black"
                  title="Edit Profile"
                />
                <p>Edit Profile</p>
              </div>
              <div className="flex gap-4">
                <a href={profile.facebook}>
                  <FaFacebookF size={20} color="blue" />
                </a>
                <a href={profile.instagram}>
                  <FaInstagram size={20} color="#d62976" />
                </a>
                <a href={profile.linkedIn}>
                  <FaLinkedin size={20} color="#0077B5" />
                </a>
                <a href={profile.x}>
                  <BsTwitterX size={20} color="#121212" />
                </a>
              </div>
            </div>
          </div>
          <div className="p-4">
            <h1>Upcoming Events</h1>
            <div className="border p-6 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="w-4/4 bg-white p-4 border rounded-lg cursor-pointer">
                {events?.length > 0 ? (
                  <ul>
                    {events.map((event) => (
                      <li key={event._id}>
                        <p>
                        <MdEventNote size={15} />
                        </p>
                        <p className="mt-4">{event.title}</p>
                        <p className="text-gray-700">
                          {event.description.length > 50
                            ? `${event.description.substring(0, 50)}...`
                            : event.description}
                        </p>
                        <div className="flex items-center gap-4 my-3 ">

                        <p className="text-sm text-gray-500">
                          {new Date(event.date).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-500">
                          Location: {event.location}
                        </p>
                        </div>
                        <button
                          className="mt-2 px-4 py-2 text-black border rounded hover:bg-blue-700 hover:text-white"
                          onClick={() => handleRSVP(event._id)}
                        >
                          Manage RSVP
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No threads available.</p>
                )}
              </div>
            </div>
          </div>
          <div className="p-4">
            <h1>Recent Forum Activity</h1>
            <div className="border p-6 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="w-4/4 bg-white p-4 border rounded-lg cursor-pointer">
                {threads?.length > 0 ? (
                  <ul>
                    {threads?.map((thread) => (
                      <li key={thread._id} className="mb-4">
                        <p className="mt-4">{thread.title}</p>
                        <p className="text-gray-700">
                          {thread.content.length > 50
                            ? `${thread.content.substring(0, 50)}...`
                            : thread.content}
                        </p>
                        <Link
                          to={`/threads/${thread._id}`}
                          className="text-[12px] font-semibold text-black hover:underline flex items-center mt-4"
                        >
                          <IoIosArrowRoundForward size={14} /> View Thread
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No threads available.</p>
                )}
              </div>
            </div>
          </div>
          <div className="border p-4">mmm</div>
        </div>
      </div>

      <EditProfileModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default CourseList;
