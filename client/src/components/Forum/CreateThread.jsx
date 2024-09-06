import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useRedirectLoggedOutUser from "../UseRedirect/UseRedirectLoggedOutUser";
const URL = import.meta.env.VITE_APP_BACKEND_URL;

const CreateThread = () => {
  useRedirectLoggedOutUser("/login");

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [formValidMessage, setFormValidMessage] = useState("");
  const [formCompleted, setFormCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormValidMessage("");
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, content } = formData;

    if (!title || !content) {
      setFormValidMessage("Oops! All fields are required!");
      return;
    }

    setIsSubmitting(true);

    axios
      .post(`${URL}/discussion/thread`, formData)
      .then(function (response) {
        setIsSubmitting(false);
        setFormCompleted(true);
        navigate("/forum");
      })
      .catch(function (error) {
        setIsSubmitting(false);
        if (error.response && error.response.status === 400) {
          setFormValidMessage("Thread creation failed.");
        } else {
          setFormValidMessage("Server error, unable to process.");
        }
      });
  };

  return (
    <div className="max-w-lg mx-auto  p-8   rounded-lg">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Create New Thread</h1>
      {formValidMessage && (
        <p className="mb-4 text-red-600 text-sm font-medium">{formValidMessage}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:border-blue-400"
            placeholder="Enter the title here"
            required
          />
        </div>
        <div className="mb-5">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="content"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:border-blue-400"
            rows="6"
            placeholder="Write your content here..."
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`${
              isSubmitting ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
            } text-white font-bold py-2 px-6 rounded-lg shadow-md focus:outline-none focus:shadow-outline transition ease-in-out duration-200`}
          >
            {isSubmitting ? "Creating..." : "Create Thread"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateThread;
