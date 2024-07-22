import React, { useState } from "react";
import axios from "axios";
import ChapterModal from "./ChapterModal";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const URL = import.meta.env.VITE_APP_BACKEND_URL;
const cloud_name = import.meta.env.VITE_APP_CLOUD_NAME;
const upload_preset = import.meta.env.VITE_APP_UPLOAD_PRESET;

const handleFileUpload = async (files, folder) => {
  const uploadedFiles = [];
  const uploadPromises = Array.from(files).map(async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", upload_preset);
    formData.append("folder", folder);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      uploadedFiles.push(response.data.secure_url);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  });

  await Promise.all(uploadPromises);
  return uploadedFiles;
};

const CreateCourseForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [instructor, setInstructor] = useState("");
  const [duration, setDuration] = useState("");
  const [chapters, setChapters] = useState([]);
  const [articles, setArticles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [audios, setAudios] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(null);

  const navigate = useNavigate()
  const handleChapterSave = (chapter) => {
    if (currentChapter === null) {
      setChapters([...chapters, chapter]);
    } else {
      const updatedChapters = chapters.map((ch, index) =>
        index === currentChapter ? chapter : ch
      );
      setChapters(updatedChapters);
    }
    setCurrentChapter(null);
  };

  const handleAddChapter = () => {
    setCurrentChapter(null);
    setIsModalOpen(true);
  };

  const handleEditChapter = (index) => {
    setCurrentChapter(index);
    setIsModalOpen(true);
  };

  const handleDeleteChapter = (index) => {
    setChapters(chapters.filter((_, idx) => idx !== index));
  };

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const articleUrls = await handleFileUpload(articles, "articles");
    const videoUrls = await handleFileUpload(videos, "videos");
    const audioUrls = await handleFileUpload(audios, "audios");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("instructor", instructor);
    formData.append("duration", duration);
    formData.append("chapters", JSON.stringify(chapters));
    formData.append("articles", JSON.stringify(articleUrls));
    formData.append("videos", JSON.stringify(videoUrls));
    formData.append("audios", JSON.stringify(audioUrls));

    try {
      const response = await axios.post(
        `${URL}/courses/create-course`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Course created:", response.data);
      toast.success("Created")
      navigate("/")
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center bg-white">
        <form onSubmit={handleSubmit} className=" w-[350px] md:w-[650px] p-4 ">
          <div className="flex gap-4">
            <div className="flex flex-col w-[49%] ">
              <label htmlFor="title" className="font-semibold">
                Course Title
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

            <div className="flex flex-col w-[49%] ">
              <label htmlFor="instructor" className="font-semibold">
                Instructor
              </label>
              <input
                type="text"
                id="instructor"
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
                className="border p-2 rounded"
                required
              />
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="description" className="font-semibold">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 rounded"
              rows="4"
              required
            />
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="duration" className="font-semibold">
              Duration (hours)
            </label>
            <input
              type="number"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="border p-2 rounded"
              required
            />
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="chapters" className="font-semibold">
              Chapters
            </label>
            {chapters.map((chapter, index) => (
              <div
                key={index}
                className="border p-4 mb-4 rounded flex items-center justify-between"
              >
                <h3 className="font-semibold text-lg">{chapter.title}</h3>
                {/* <p>{chapter.content}</p> */}

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleEditChapter(index)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Edit Chapter
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteChapter(index)}
                    className=" text-red-800 font-bold px-4 py-2 rounded"
                  >
                    <IoMdClose size={20} />
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddChapter}
              className="bg-blue-500 text-white px-4 py-2 rounded my-4"
            >
              Add Chapter
            </button>
          </div>
          <div className="flex flex-col mt-4">
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
          <div className="flex flex-col mt-4">
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
          <div className="flex flex-col mt-4">
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
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          >
            Create Course
          </button>
        </form>
        <ChapterModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleChapterSave}
          chapter={currentChapter !== null ? chapters[currentChapter] : null}
        />
      </div>
    </>
  );
};

export default CreateCourseForm;
