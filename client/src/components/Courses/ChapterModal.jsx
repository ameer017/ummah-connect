import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ChapterModal = ({ isOpen, onClose, onSave, chapter }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [articles, setArticles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [audios, setAudios] = useState([]);

  useEffect(() => {
    if (chapter) {
      setTitle(chapter.title);
      setContent(chapter.content);
      setArticles(chapter.articles || []);
      setVideos(chapter.videos || []);
      setAudios(chapter.audios || []);
    }
  }, [chapter]);

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    switch (name) {
      case "articles":
        setArticles(files);
        break;
      case "videos":
        setVideos(files);
        break;
      case "audios":
        setAudios(files);
        break;
      default:
        break;
    }
  };

  const handleSave = () => {
    onSave({
      title,
      content,
      articles,
      videos,
      audios,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg w-[90%] max-w-[500px]">
        <h2 className="text-xl font-bold mb-4">
          {chapter ? "Edit" : "Add"} Chapter
        </h2>
        <div className="flex flex-col mb-4">
          <label htmlFor="title" className="font-semibold">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded"
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="content" className="font-semibold">
            Content
          </label>
          <ReactQuill
            id="content"
            value={content}
            onChange={(value) => setContent(value)}
            className="border p-2 rounded h-[300px] overflow-y-auto "
            modules={{
              toolbar: [
                [{ header: "1" }, { header: "2" }],
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link"],
                ["clean"],
              ],
            }}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="articles" className="font-semibold">
            Upload Articles
          </label>
          <input
            type="file"
            id="articles"
            name="articles"
            multiple
            onChange={handleFileChange}
            className="border p-2 rounded"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="videos" className="font-semibold">
            Upload Videos
          </label>
          <input
            type="file"
            id="videos"
            name="videos"
            multiple
            onChange={handleFileChange}
            className="border p-2 rounded"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="audios" className="font-semibold">
            Upload Audios
          </label>
          <input
            type="file"
            id="audios"
            name="audios"
            multiple
            onChange={handleFileChange}
            className="border p-2 rounded"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChapterModal;
