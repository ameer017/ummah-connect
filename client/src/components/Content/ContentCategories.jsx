import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import useRedirectLoggedOutUser from "../UseRedirect/UseRedirectLoggedOutUser";
import { MdAdd } from "react-icons/md";
import { TiMinus } from "react-icons/ti";
import { getUser } from "../../redux/feature/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowRoundForward } from "react-icons/io";
import Sidebar from "../Sidebar/Sidebar";
import { Link } from "react-router-dom";
import { AdminLink } from "../Protect/HiddenLink";

const URL = import.meta.env.VITE_APP_BACKEND_URL;

const ContentCategories = ({ userId }) => {
  useRedirectLoggedOutUser("/login");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ type: "", description: "" });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [contents, setContents] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${URL}/content/categories`);
        setCategories(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const fetchContentByCategory = async (categoryId) => {
    try {
      const response = await axios.get(`${URL}/content/category/${categoryId}`);
      setContents(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
    fetchContentByCategory(category._id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${URL}/content/create-category`,
        newCategory
      );
      setCategories([...categories, response.data]);
      setNewCategory({ type: "", description: "" });
      setIsFormVisible(false);
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

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
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        profile={profile}
        user={user}
      />
      <div
        className={`w-full p-4 flex justify-center ${
          isSidebarOpen ? "md:ml-1/4" : ""
        }`}
      >
        <div className="flex flex-col items-left  w-full md:w-5/6 p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold mb-6">Explore Islamic Content</h1>
            <AdminLink>
              <button
                className="bg-blue-800 rounded-full py-2 px-4 text-white "
                onClick={() => setIsFormVisible(!isFormVisible)}
              >
                {isFormVisible ? (
                  <TiMinus color="red" size={20} />
                ) : (
                  <MdAdd color="white" size={20} />
                )}
              </button>
            </AdminLink>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((category) => (
              <div
                key={category._id}
                className="p-4 border rounded-lg cursor-pointer hover:bg-gray-100 flex  flex-col justify-center"
                onClick={() => handleCategoryClick(category)}
              >
                <h1 className="font-bold">{category.type}</h1>
                <p>{category.type}</p>

                <Link
                  to={`/content/${category._id}`}
                  className="border-y py-2 mt-2 flex  justify-between items-center hover:underline"
                >
                  {category.type === "Article"
                    ? "View All Articles"
                    : category.type === "Audio"
                    ? "View All Audios"
                    : category.type === "Video"
                    ? "View All Videos"
                    : "Unknown Category"}

                  <IoIosArrowRoundForward size={20} />
                </Link>
              </div>
            ))}
          </div>
          {isFormVisible && (
            <form className="mt-6" onSubmit={handleCategorySubmit}>
              <h2 className="text-2xl font-bold mb-4">Add New Category</h2>
              <div className="mb-4">
                <label className="block text-gray-700">Category Type</label>
                <input
                  type="text"
                  name="type"
                  value={newCategory.type}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={newCategory.description}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Add Category
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentCategories;
