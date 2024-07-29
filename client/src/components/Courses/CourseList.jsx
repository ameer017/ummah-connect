import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useRedirectLoggedOutUser from "../UseRedirect/UseRedirectLoggedOutUser";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";

const URL = import.meta.env.VITE_APP_BACKEND_URL;

const CourseList = () => {
  useRedirectLoggedOutUser("/login");

  const [courses, setCourses] = useState([]);
  const [enrolled, setEnrolled] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${URL}/courses/get-all-course`);
        setCourses(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const enrollCourse = async () => {
    try {
      const response = await axios.post(`${URL}/courses/enroll`);
      setEnrolled(response.data);
      toast.success("Enrolled");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Enrollment failed");
    }
  };

  return (
    <div className="w-full p-4 md:px-[5em]  rounded-lg  ">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <div
            key={course._id}
            className="p-4 border rounded-lg shadow-sm bg-gray-100"
          >
            <img src={course.coverImage} alt="" className="rounded mb-4" />
            <h2 className="font-semibold text-[22.31px] ">{course.title}</h2>
            <p className="text-[#222222] text-[11.71px] ">
              Instructor: {course.instructor}
            </p>
            <p className="text-[#222222] text-[13.71px] ">
              {course.description}
            </p>

            <div className="border-y py-2 my-2">
              {enrolled ? (
                <Link to={`/course/single/${course._id}`} className="underline">
                  Continue Course
                </Link>
              ) : (
                <button className="bg-blue-500 py-2 px-4 rounded text-white">
                  Enroll Course
                </button>
              )}
            </div>
            <div className="border-b py-2 text-right">
              <Link to={`/course/single/${course._id}`} className="underline ">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
