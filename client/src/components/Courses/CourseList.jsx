import React from "react";
import { Link } from "react-router-dom";

const CourseList = () => {
  return (
    <div className="flex min-h-screen">
      <div className="w-1/4 bg-gray-200 p-4 flex flex-col space-y-2">
        <p className=" text-[20px] ">Events Overview</p>

        <Link
          to="/create-event"
          className="text-blue-500 hover:text-blue-700 text-[18px] "
        >
          Create Event
        </Link>

        <Link
          to="/create-mentorship"
          className="text-blue-500 hover:text-blue-700 text-[18px] "
        >
          Get Mentorship
        </Link>
      </div>
    </div>
  );
};

export default CourseList;
