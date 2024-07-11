import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AdminLink } from "../Protect/HiddenLink";
import { toast } from "react-toastify";
import useRedirectLoggedOutUser from "../UseRedirect/UseRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/feature/auth/authSlice";
import Sidebar from "../Sidebar/Sidebar";

const URL = import.meta.env.VITE_APP_BACKEND_URL;

const Article = ({ userId }) => {
  useRedirectLoggedOutUser("/login");
  const { id } = useParams();

  
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [content, setContent] = useState([]);
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [submitted, setSubmitted] = useState("");

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch, userId]);

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
    const fetchContent = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${URL}/content/category/${id}`);
        setType(response.data[0].type);
        setContent(response.data);
        setSubmitted(response.data[0].submittedBy);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch content:", error);
        setError("Failed to fetch");
        setLoading(false);
      }
    };
    fetchContent();
  }, [id]);

  const filteredData = content.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Loading!!!</p>;
  if (error) return <p>Failed to fetch!!!</p>;
  if (!content) return <p>No content found for this categoryLink!!!</p>;

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

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
        <div className="flex flex-col items-left w-full md:w-5/6 p-4">
          <div className="p-4">
            <div className="flex items-center justify-between flex-col ">
              <h1 className="font-bold text-3xl uppercase text-left w-[100%]">
                {type}s
              </h1>

              <div className="border my-4 rounded-lg w-[100%]">
                <input
                  type="search"
                  className="border w-[100%] p-2"
                  placeholder="Search for specific threads or topics"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="border p-4 rounded-lg">
              <div className="p-6 rounded-lg space-y-4">
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <div className="border-b pb-4 mb-4">
                      <Link to={`/content/single/${item._id}`} key={item.id}>
                        <div className="flex items-center gap-2">
                          <img
                            src={submitted.photo}
                            alt={submitted.username}
                            className="w-[25px] rounded-full"
                          />
                          <p className="text-[15px]">
                            {submitted.firstName} {submitted.lastName}
                          </p>
                        </div>
                        <div className="p-2">
                          <p className="text-[20px]">{item.title}</p>
                          <p className="text-[15px]">{item.description}</p>
                          <div className="mt-4">
                            <p>{formatDate(item.createdAt)}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <p>Oops! No threads found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
