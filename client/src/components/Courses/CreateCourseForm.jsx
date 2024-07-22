import React, { useState } from 'react';
import axios from 'axios';

const CreateCourseForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [instructor, setInstructor] = useState('');
  const [duration, setDuration] = useState('');
  const [articles, setArticles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [audios, setAudios] = useState([]);
  const [chapters, setChapters] = useState([{ title: '', content: '' }]);

  const handleFileChange = (e, setFiles) => {
    setFiles([...e.target.files]);
  };

  const handleChapterChange = (index, field, value) => {
    const newChapters = [...chapters];
    newChapters[index][field] = value;
    setChapters(newChapters);
  };

  const addChapter = () => {
    setChapters([...chapters, { title: '', content: '' }]);
  };

  const removeChapter = (index) => {
    setChapters(chapters.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('content', content);
    formData.append('instructor', instructor);
    formData.append('duration', duration);

    articles.forEach((file) => formData.append('articles', file));
    videos.forEach((file) => formData.append('videos', file));
    audios.forEach((file) => formData.append('audios', file));

    chapters.forEach((chapter, index) => {
      formData.append(`chapters[${index}].title`, chapter.title);
      formData.append(`chapters[${index}].content`, chapter.content);
    });

    try {
      const response = await axios.post('/api/courses', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Course created:', response.data);
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-6">Create a New Course</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-700 mb-2" htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded px-4 py-2"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 mb-2" htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded px-4 py-2"
              required
            ></textarea>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 mb-2" htmlFor="content">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border rounded px-4 py-2"
              required
            ></textarea>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 mb-2" htmlFor="instructor">Instructor</label>
            <input
              type="text"
              id="instructor"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              className="w-full border rounded px-4 py-2"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 mb-2" htmlFor="duration">Duration (hours)</label>
            <input
              type="number"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full border rounded px-4 py-2"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 mb-2" htmlFor="articles">Upload Articles (PDF, PPT, DOC, etc.)</label>
            <input
              type="file"
              id="articles"
              multiple
              onChange={(e) => handleFileChange(e, setArticles)}
              className="w-full border rounded px-4 py-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 mb-2" htmlFor="videos">Upload Videos (MP4, MOV, etc.)</label>
            <input
              type="file"
              id="videos"
              multiple
              onChange={(e) => handleFileChange(e, setVideos)}
              className="w-full border rounded px-4 py-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 mb-2" htmlFor="audios">Upload Audios (MP3, WAV, etc.)</label>
            <input
              type="file"
              id="audios"
              multiple
              onChange={(e) => handleFileChange(e, setAudios)}
              className="w-full border rounded px-4 py-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 mb-2">Chapters</label>
            {chapters.map((chapter, index) => (
              <div key={index} className="mb-4 border rounded p-4 bg-gray-50">
                <div className="flex flex-col mb-2">
                  <label className="text-gray-700 mb-1">Chapter Title</label>
                  <input
                    type="text"
                    value={chapter.title}
                    onChange={(e) => handleChapterChange(index, 'title', e.target.value)}
                    className="w-full border rounded px-4 py-2"
                  />
                </div>
                <div className="flex flex-col mb-2">
                  <label className="text-gray-700 mb-1">Chapter Content</label>
                  <textarea
                    value={chapter.content}
                    onChange={(e) => handleChapterChange(index, 'content', e.target.value)}
                    className="w-full border rounded px-4 py-2"
                  ></textarea>
                </div>
                <button
                  type="button"
                  onClick={() => removeChapter(index)}
                  className="text-red-500 hover:underline"
                >
                  Remove Chapter
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addChapter}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Add Chapter
            </button>
          </div>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Create Course
        </button>
      </form>
    </div>
  );
};

export default CreateCourseForm;
