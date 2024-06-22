import React, { useState } from "react";
import axios from "axios";

const CreateContent = () => {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    
    description: "",
    topics: "",
    categoryId: "",
    submittedBy: "",
  });

  const [selectedTopics, setSelectedTopics] = useState([]);
  const availableTopics = [
    "Quran and Tafsir",
    "Fiqh (Islamic Jurisprudence)",
    "Hadith",
    "Aqeedah (Creed and Belief)",
    "Seerah (Biography of the Prophet Muhammad)",
    "Da'wah (Invitation to Islam)",
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTopicChange = (e) => {
    const { value, checked } = e.target;
    setSelectedTopics((prevTopics) =>
      checked ? [...prevTopics, value] : prevTopics.filter((topic) => topic !== value)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
  };

  return (
    <div className="h-[100vh] border bg-[#ececec] flex items-center justify-center">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-[300px] md:w-[500px] bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Create Content
          </h2>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                required
              >
                <option value="" disabled>
                  Select type
                </option>
                <option value="article">Article</option>
                <option value="video">Video</option>
                <option value="audio">Audio</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Topics</label>
              <select
                name="topics"
                value={formData.topics}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                required
              >
                <option value="" disabled>
                  Select topic
                </option>

                <option value="Quran and Tafsir">Quran and Tafsir</option>
                <option value="Fiqh (Islamic Jurisprudence)">
                  Fiqh (Islamic Jurisprudence)
                </option>
                <option value="Hadith">Hadith</option>
                <option value="Aqeedah (Creed and Belief)">
                  Aqeedah (Creed and Belief)
                </option>
                <option value="Seerah (Biography of the Prophet Muhammad)">
                  Seerah (Biography of the Prophet Muhammad)
                </option>
                <option value="Da'wah (Invitation to Islam)">
                  Da'wah (Invitation to Islam)
                </option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Category ID</label>
              <input
                type="text"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Submitted By</label>
              <input
                type="text"
                name="submittedBy"
                value={formData.submittedBy}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Create Content
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateContent;
