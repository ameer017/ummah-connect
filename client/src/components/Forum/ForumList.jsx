import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { getUser } from "../../redux/feature/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import useRedirectLoggedOutUser from "../UseRedirect/UseRedirectLoggedOutUser";
import Sidebar from "../Sidebar/Sidebar";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { AdminLink } from "../Protect/HiddenLink";

const URL = import.meta.env.VITE_APP_BACKEND_URL;

const ForumList = ({ userId }) => {
  useRedirectLoggedOutUser("/login");

  const [threads, setThreads] = useState([]);
  const [search, setSearch] = useState("");
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
    const fetchThreads = async () => {
      try {
        const response = await axios.get(`${URL}/discussion/all-threads`);
        setThreads(response.data);
      } catch (error) {
        console.error("Error fetching threads:", error);
      }
    };

    fetchThreads();
  }, []);

  const filteredData = threads.filter((thread) =>
    thread.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        profile={profile}
        user={user}
      />

      <div
        className={`w-full bg-white p-4 flex justify-center ${
          isSidebarOpen ? "md:ml-1/4" : ""
        }`}
      >
        <div className="flex flex-col items-left  w-full md:w-5/6 p-4">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <h1 className="font-bold text-3xl">Forum Overview</h1>
              <AdminLink>
                <button className="bg-blue-800 rounded-full py-2 px-4 text-white ">
                  <Link to="/create-event" className="flex items-center gap-2">
                    <HiOutlineViewGridAdd size={20} />
                    Create New
                  </Link>
                </button>
              </AdminLink>
            </div>
            <div className="border my-4 rounded-lg">
              <input
                type="search"
                name=""
                id=""
                className="border w-[100%] p-2"
                placeholder="Search for specific threads or topics"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="p-6 rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredData.length > 0 ? (
                filteredData.map((thread) => (
                  <Link
                    to={`/threads/${thread._id}`}
                    className="w-full bg-white p-4 border rounded-lg cursor-pointer"
                  >
                    <p className="mt-4">{thread.title}</p>
                    <p className="mt-4">
                      {thread.content.length > 150
                        ? `${thread.content.substring(0, 150)}...`
                        : thread.content}
                    </p>
                    {/* <p className="border-y py-2 mt-2">Latest Activity:</p> */}
                  </Link>
                ))
              ) : (
                <p>Oops! No threads found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumList;
