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

  const [formValidMessage, setFormValidMessage] = useState();
  const [formCompleted, setFormCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormValidMessage("");
    const { name, value } = e.target;
    console.log(e.target.value);

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
        console.log(response.data);
        console.log(formData);
        setIsSubmitting(false);
        setFormCompleted(true);
        navigate("/forum");
      })
      .catch(function (error) {
        setIsSubmitting(false);
        if (error.response && error.response.status == 400) {
          setFormValidMessage("Not! created!");
        } else {
          setFormValidMessage(
            "Server error, unable to process"
          );
        }
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Create New Thread</h1>
      {formValidMessage && (
        <p className="mb-4 text-red-500">{formValidMessage}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="content"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="5"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Thread
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateThread;
