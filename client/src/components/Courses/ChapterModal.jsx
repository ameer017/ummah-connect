import React, { useState } from 'react';

const ChapterModal = ({ isOpen, onClose, onSave, chapter }) => {
  const [title, setTitle] = useState(chapter ? chapter.title : '');
  const [content, setContent] = useState(chapter ? chapter.content : '');

  const handleSave = () => {
    onSave({ title, content });
    onClose();
  };

  return (
    isOpen ? (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded shadow-lg w-1/2">
          <h2 className="text-xl font-semibold mb-4">{chapter ? 'Edit Chapter' : 'Add Chapter'}</h2>
          <div className="flex flex-col mb-4">
            <label htmlFor="chapter-title" className="font-semibold">Chapter Title</label>
            <input
              type="text"
              id="chapter-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 rounded"
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="chapter-content" className="font-semibold">Chapter Content</label>
            <textarea
              id="chapter-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border p-2 rounded"
              rows="4"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    ) : null
  );
};

export default ChapterModal;
