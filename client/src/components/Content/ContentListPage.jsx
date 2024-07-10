import React, { useEffect, useLayoutEffect, useState } from "react";
import Modal from "./Modal";
import useRedirectLoggedOutUser from "../UseRedirect/UseRedirectLoggedOutUser";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { getUser } from "../../redux/feature/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineViewGridAdd } from "react-icons/hi";

const URL = import.meta.env.VITE_APP_BACKEND_URL;

const ContentListPage = ({ userId }) => {
  useRedirectLoggedOutUser("/login");
  const [selectedContent, setSelectedContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editableContent, setEditableContent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [contents, setContents] = useState([]);
  const navigate = useNavigate();

  const handleContentClick = (content) => {
    setSelectedContent(content);
    setEditableContent({ ...content });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedContent(null);
    setEditableContent(null);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableContent((prevContent) => ({ ...prevContent, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${URL}/content/content/${editableContent._id}`,
        editableContent
      );
      // console.log("Content saved:", response.data);
      setIsEditing(false);
      navigate("/content-list");
    } catch (error) {
      console.error("Error saving content:", error.response.data);
    }
  };

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const response = await axios.get(`${URL}/content/contents`);
        setContents(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching contents:", error);
      }
    };

    fetchContents();
  }, []);

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
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold mb-6">Explore Islamic Content</h1>
            <button className="bg-blue-800 rounded-full py-2 px-4 text-white ">
              <Link to="/create-content" className="flex items-center gap-2">
                <HiOutlineViewGridAdd size={20} />
                Create New
              </Link>
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {contents.map((content) => (
              <div
                key={content.id}
                className="p-4 border rounded-lg cursor-pointer hover:bg-gray-100"
                onClick={() => handleContentClick(content)}
              >
                <h2 className="text-xl font-bold">{content.title}</h2>
                <p className="text-gray-600">{content.type}</p>
                <p className="text-gray-600">{content.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          {isEditing ? (
            <div className="flex flex-col space-y-2">
              <h2 className="text-2xl font-bold mb-4">Edit Content</h2>
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  value={editableContent.title}
                  onChange={handleInputChange}
                  className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 mt-1"
                />
              </label>
              <label>
                Description:
                <textarea
                  name="description"
                  value={editableContent.description}
                  onChange={handleInputChange}
                  className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 mt-1 h-[150px] "
                />
              </label>

              <button
                onClick={handleSave}
                className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              <h2 className="text-2xl font-bold mb-4">
                {selectedContent.title}
              </h2>
              <p>{selectedContent.description}</p>

              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600"
              >
                Edit
              </button>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default ContentListPage;
