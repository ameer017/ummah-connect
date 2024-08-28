import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/feature/auth/authSlice";

const URL = import.meta.env.VITE_APP_BACKEND_URL;

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState({ progress: 0, completed: false });
  const [userId, setUserId] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && user._id) {
      dispatch(getUser(user._id));
      setUserId(user._id);
    }
  }, [dispatch, user]);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${URL}/courses/${id}`);
        setCourse(response.data);
        setChapters(response.data.chapters);

        const progressResponse = await axios.get(
          `${URL}/progress/${userId}/${id}`
        );
        setProgress(progressResponse.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("Failed to fetch!");
      }
    };

    fetchCourseDetail();
  }, [id, userId]);

  const handleNextChapter = async () => {
    if (currentChapterIndex < chapters.length - 1) {
      const newChapterIndex = currentChapterIndex + 1;
      setCurrentChapterIndex(newChapterIndex);

      try {
        const progressPercentage = Math.round(
          ((newChapterIndex + 1) / chapters.length) * 100
        );
        await axios.post(`${URL}/progress/update`, {
          userId,
          courseId: id,
          progress: progressPercentage,
          completed: newChapterIndex === chapters.length - 1,
        });
        setProgress({
          progress: progressPercentage,
          completed: newChapterIndex === chapters.length - 1,
        });
      } catch (error) {
        toast.error("Failed to update progress!");
      }
    }
  };

  const handlePreviousChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(currentChapterIndex - 1);
    }
  };

  if (loading) return <p className="text-center">Loading!!!</p>;

  if (!course) return <p>No course available</p>;

  return (
    <div className="min-h-screen flex justify-center bg-white relative">
      <button
        className="absolute top-4 left-4 underline text-black px-4 py-2 rounded"
        onClick={() => navigate(-1)}
      >
        BACK
      </button>

      <div className="bg-white p-8 rounded w-[350px] md:w-[800px] my-[50px]">
        <div className="p-4">
          <h1 className="text-[45px]">{course.title}.</h1>
          <div className="flex justify-between">
            <p className="text-sm">By : {course.instructor}.</p>
            <p className="text-sm underline">
              Duration : {course.duration} hour(s).
            </p>
          </div>
          <p className="text-xl my-4">{course.description}</p>

          {chapters.length > 0 && (
            <div>
              <div className="flex justify-between items-center">
                <h1 className="font-bold my-2 text-xl">
                  {chapters[currentChapterIndex].title}
                </h1>
                <div className="w-full mx-4">
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div className="text-xs font-semibold inline-block py-1 px-2 rounded text-teal-600 bg-teal-200 mr-3">
                        {progress.progress}%
                      </div>
                      <div className="text-xs font-semibold inline-block py-1 px-2 rounded text-teal-600 bg-teal-200">
                        {progress.completed ? "Completed" : "In Progress"}
                      </div>
                    </div>
                    <div className="flex">
                      <div
                        className="relative flex-auto rounded-full bg-teal-200"
                        style={{
                          width: `${progress.progress}%`,
                          height: "5px",
                        }}
                      >
                        <span
                          className="absolute right-0 w-4 h-4 bg-teal-600 rounded-full"
                          style={{
                            transform: `translateX(${
                              progress.progress - 100
                            }%)`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p>{chapters[currentChapterIndex].content}</p>

              <div className="flex justify-between mt-4">
                <button
                  className="bg-blue-500 py-2 px-4 rounded text-white"
                  onClick={handlePreviousChapter}
                  disabled={currentChapterIndex === 0}
                >
                  Previous
                </button>
                <button
                  className="bg-blue-500 py-2 px-4 rounded text-white"
                  onClick={handleNextChapter}
                  disabled={currentChapterIndex === chapters.length - 1}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
