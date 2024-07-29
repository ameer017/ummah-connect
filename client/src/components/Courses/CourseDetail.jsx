import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const URL = import.meta.env.VITE_APP_BACKEND_URL;

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState([]);
  const [chapter, setChapter] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const response = await axios.get(`${URL}/courses/${id}`);
        setCourse(response.data);
        setChapter(response.data.content.chapters);
      } catch (error) {
        toast.error("Failed to fetch!");
      }
    };

    fetchCourseDetail();
  }, []);

  return (
    <div className="min-h-screen flex  justify-center bg-white relative">
      <button
        className="absolute top-4 left-4 underline text-black px-4 py-2 rounded"
        onClick={() => navigate(-1)}
      >
        BACK
      </button>

      <div className="bg-white p-8 rounded w-[350px] md:w-[800px] my-[50px] ">
        <div className="p-4">
          <h1 className="text-[45px] ">{course.title}.</h1>
          <div className="flex justify-between">
            <p className="text-sm ">By : {course.instructor}.</p>
            <p className="text-sm underline">
              Duration : {course.duration} hour/s.
            </p>
          </div>
          <p className="text-xl my-4">{course.description}.</p>

          {chapter.map((item) => (
            <div>
              <h1 className="font-bold my-2 text-xl">{item.title}</h1>
              <h1>{item.content}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
