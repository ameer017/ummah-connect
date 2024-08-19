import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useRedirectLoggedOutUser from "../UseRedirect/UseRedirectLoggedOutUser";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/feature/auth/authSlice";
import PageLoader from "../Loader/PageLoader";

const URL = import.meta.env.VITE_APP_BACKEND_URL;

const CourseList = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const [courses, setCourses] = useState([]);
  const [enrolled, setEnrolled] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && user._id) {
      dispatch(getUser(user._id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    const fetchCourses = async () => {
      setFetching(true)
      try {
        const response = await axios.get(`${URL}/courses/get-all-course`);
        setCourses(response.data);
        setFetching(false)

      } catch (error) {
        setFetching(false)
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    setFetching(true);
    setTimeout(() => {
      setFetching(false);
    }, 3000);
  })

  const enrollCourse = async (courseId) => {
    try {
      setLoading(true);
      const response = await axios.post(`${URL}/enrollments/enroll`, {
        userId: user._id,
        courseId,
      });
      setEnrolled(response.data);
      toast.success("Enrolled");
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("Enrollment failed");
    }
  };

  return (
    <div className="w-full p-4 md:px-[5em] rounded-lg">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 p-4">
        <h1 className="font-bold text-2xl md:text-3xl mb-2 md:mb-0">
          Courses Overview.
        </h1>

        <Link to="/create-course">
          <button className="flex items-center gap-2 bg-blue-800 text-white rounded-full py-2 px-4 hover:bg-blue-700 transition duration-300">
            <MdOutlineCreateNewFolder size={20} />
            Create New
          </button>
        </Link>
      </div>
      {/* {fetching ?  <PageLoader/> :  ()} */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <div
            key={course._id}
            className="p-4 border rounded-lg shadow-sm bg-gray-100"
          >
            <img src={course.coverImage} alt="" className="rounded mb-4" />
            <h2 className="font-semibold text-[22.31px]">{course.title}</h2>
            <p className="text-[#222222] text-[13.71px]">
              Instructor: {course.instructor}
            </p>
            <p className="text-[#222222] text-[15.71px]">
              {course.description}
            </p>

            <div className="border-y py-2 my-2">
              {enrolled ? (
                <Link to={`/course/single/${course._id}`} className="underline">
                  Continue Course
                </Link>
              ) : (
                <button
                  className="bg-blue-500 py-2 px-4 rounded text-white"
                  onClick={() => enrollCourse(course._id)}
                >
                  {loading ? "Enrolling" : "Enroll Course"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
