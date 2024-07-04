import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./Modal";
import useRedirectLoggedOutUser from "../UseRedirect/UseRedirectLoggedOutUser";
import { MdAdd } from "react-icons/md";
import { TiMinus } from "react-icons/ti";

const URL = import.meta.env.VITE_APP_BACKEND_URL;

const ContentCategories = () => {
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
        console.log(response.data)
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
      console.log(response.data);
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div
            key={category._id}
            className="p-4 border rounded-lg cursor-pointer hover:bg-gray-100"
            onClick={() => handleCategoryClick(category)}
          >
            {category.type}
          </div>
        ))}
      </div>

      <button
        className="bg-green-500 text-white px-4 py-2 rounded-md mt-6 hover:bg-green-600"
        onClick={() => setIsFormVisible(!isFormVisible)}
      >
        {isFormVisible ? (
          <TiMinus color="red" size={20} />
        ) : (
          <MdAdd color="white" size={20} />
        )}
      </button>

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

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <h2 className="text-2xl font-bold mb-4">
            Content in {selectedCategory.type}
          </h2>
          <div className="flex flex-col space-y-2">
            {contents.map((content) => (
              <div key={content._id} className="border p-4 rounded-md">
                <h3 className="text-xl font-bold">{content.title}</h3>
                <p>{content.description}</p>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ContentCategories;
