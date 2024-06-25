import React, { useState } from "react";
import Modal from "./Modal";

const staticContent = [
  {
    id: 1,
    title: "Understanding Quran",
    type: "article",
    url: "#",
    description: "Description of Understanding Quran",
  },
  {
    id: 2,
    title: "Basics of Fiqh",
    type: "video",
    url: "#",
    description: "Description of Basics of Fiqh",
  },
  {
    id: 3,
    title: "Hadith Compilation",
    type: "audio",
    url: "#",
    description: "Description of Hadith Compilation",
  },
  {
    id: 4,
    title: "Islamic Creed",
    type: "article",
    url: "#",
    description: "Description of Islamic Creed",
  },
  {
    id: 5,
    title: "Life of the Prophet",
    type: "video",
    url: "#",
    description: "Description of Life of the Prophet",
  },
  {
    id: 6,
    title: "Invitation to Islam",
    type: "article",
    url: "#",
    description: "Description of Invitation to Islam",
  },
];

const ContentListPage = () => {
  const [selectedContent, setSelectedContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editableContent, setEditableContent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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

  const handleSave = () => {
    // Here, you would normally send the updated content to the backend
    console.log("Content saved:", editableContent);
    setSelectedContent(editableContent);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Content List</h1>
      <div className="grid grid-cols-1 gap-4">
        {staticContent.map((content) => (
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
                  className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 mt-1"
                />
              </label>
              <label>
                URL:
                <input
                  type="url"
                  name="url"
                  value={editableContent.url}
                  onChange={handleInputChange}
                  className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 mt-1"
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
              <a
                href={selectedContent.url}
                className="text-blue-500 hover:underline mt-4 block"
              >
                View {selectedContent.type}
              </a>
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
