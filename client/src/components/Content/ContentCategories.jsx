import React, { useState } from "react";
import Modal from "./Modal";

const staticCategories = [
  { id: 1, name: "Quran and Tafsir" },
  { id: 2, name: "Fiqh (Islamic Jurisprudence)" },
  { id: 3, name: "Hadith" },
  { id: 4, name: "Aqeedah (Creed and Belief)" },
  { id: 5, name: "Seerah (Biography of the Prophet Muhammad)" },
  { id: 6, name: "Da'wah (Invitation to Islam)" },
];

const staticContent = [
  {
    id: 1,
    title: "Understanding Quran",
    category: "Quran and Tafsir",
    type: "article",
    url: "#",
  },
  {
    id: 2,
    title: "Basics of Fiqh",
    category: "Fiqh (Islamic Jurisprudence)",
    type: "video",
    url: "#",
  },
  {
    id: 3,
    title: "Hadith Compilation",
    category: "Hadith",
    type: "audio",
    url: "#",
  },
  {
    id: 4,
    title: "Islamic Creed",
    category: "Aqeedah (Creed and Belief)",
    type: "article",
    url: "#",
  },
  {
    id: 5,
    title: "Life of the Prophet",
    category: "Seerah (Biography of the Prophet Muhammad)",
    type: "video",
    url: "#",
  },
  {
    id: 6,
    title: "Invitation to Islam",
    category: "Da'wah (Invitation to Islam)",
    type: "article",
    url: "#",
  },
];

const ContentCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {staticCategories.map((category) => (
          <div
            key={category.id}
            className="p-4 border rounded-lg cursor-pointer hover:bg-gray-100"
            onClick={() => handleCategoryClick(category.name)}
          >
            {category.name}
          </div>
        ))}
      </div>

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <h2 className="text-2xl font-bold mb-4">
            Content in {selectedCategory}
          </h2>
          <div className="flex flex-col space-y-2">
            {staticContent
              .filter((content) => content.category === selectedCategory)
              .map((content) => (
                <a
                  key={content.id}
                  href={content.url}
                  className="text-blue-500 hover:underline"
                >
                  {content.title} ({content.type})
                </a>
              ))}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ContentCategories;
