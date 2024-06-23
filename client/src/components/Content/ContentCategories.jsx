import React, { useState, useEffect } from "react";
import axios from "axios";

const ContentCategories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryContent, setCategoryContent] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = async (category) => {
    try {
      const response = await axios.get(`/api/content?category=${category._id}`);
      setCategoryContent(response.data);
      setSelectedCategory(category);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching category content:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCategory(null);
    setCategoryContent([]);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div
            key={category._id}
            className="p-4 border rounded-lg cursor-pointer hover:bg-gray-200"
            onClick={() => handleCategoryClick(category)}
          >
            <h2 className="text-lg font-semibold">{category.type}</h2>
            <p>{category.description}</p>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-2/3 lg:w-1/2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {selectedCategory.type} Content
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-red-500 font-bold text-xl"
              >
                &times;
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {categoryContent.map((content) => (
                <div
                  key={content._id}
                  className="p-2 border-b cursor-pointer hover:bg-gray-100"
                  onClick={() =>
                    (window.location.href = `/content/${content._id}`)
                  }
                >
                  <h3 className="text-lg font-semibold">{content.title}</h3>
                  <p>{content.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentCategories;
