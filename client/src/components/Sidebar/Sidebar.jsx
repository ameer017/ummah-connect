import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { GrOverview, GrNotes } from "react-icons/gr";
import { IoBookOutline } from "react-icons/io5";
import { MdOutlineEventAvailable, MdForum, MdOutlinePassword, MdOutlineUnsubscribe } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { AdminLink } from "../../components/Protect/HiddenLink";

const Sidebar = ({ isSidebarOpen, toggleSidebar, profile, user }) => {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "text-neutral-900 bg-neutral-200 rounded-lg "
      : "";

  return (
    <>
      {isSidebarOpen && (
        <div className="fixed inset-0 md:relative md:w-1/4 bg-white p-4 flex flex-col space-y-2 z-20 border-r border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[20px] my-3">
              <img
                src={profile.photo}
                alt=""
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              />
              <div>
                <p className="text-[18px]">
                  {profile.firstName} {profile.lastName}
                </p>
                <p className="text-[18px] text-neutral-400">
                  {profile.profession}
                </p>
              </div>
            </div>
            <div className="-mr-[40px] ">
              <button
                className="p-2 bg-white text-white border rounded-full"
                onClick={toggleSidebar}
              >
                <IoIosArrowBack size={25} color="black" />
              </button>
            </div>
          </div>

          <Link
            className={`flex gap-[10px] p-3 mt-3 items-center text-gray-400 ${isActive(
              "/profile"
            )}`}
            to="/profile"
          >
            <GrOverview size={25} /> <p className="text-[17px]">Overview</p>
          </Link>
          <Link
            className={`flex gap-[10px] p-3 mt-3 items-center text-gray-400 ${isActive(
              "/my-courses"
            )}`}
            to="/my-courses"
          >
            <IoBookOutline size={25} />{" "}
            <p className="text-[17px]">My Courses</p>
          </Link>
          <Link
            className={`flex gap-[10px] p-3 mt-3 items-center text-gray-400 ${isActive(
              "/event-list"
            )}`}
            to="/event-list"
          >
            <MdOutlineEventAvailable size={25} />{" "}
            <p className="text-[17px]">Events</p>
          </Link>
          <Link
            className={`flex gap-[10px] p-3 mt-3 items-center text-gray-400 ${isActive(
              "/forum"
            )}`}
            to="/forum"
          >
            <MdForum size={25} /> <p className="text-[17px]">Forum</p>
          </Link>
          <Link
            className={`flex gap-[10px] p-3 mt-3 items-center text-gray-400 ${isActive(
              "/content-categories"
            )}`}
            to="/content-categories"
          >
            <GrNotes size={25} /> <p className="text-[17px]">Content</p>
          </Link>
          <AdminLink>
            <Link
              className={`flex gap-[10px] p-3 mt-3 items-center text-gray-400 ${isActive(
                "/users"
              )}`}
              to="/users"
            >
              <FaUsers size={25} /> <p className="text-[17px]">Users</p>
            </Link>
            <Link
              className={`flex gap-[10px] p-3 mt-3 items-center text-gray-400 ${isActive(
                "/subscribers"
              )}`}
              to="/subscribers"
            >
              <MdOutlineUnsubscribe size={25} /> <p className="text-[17px]">Subscribers</p>
            </Link>
          </AdminLink>
          <Link
            className={`flex gap-[10px] p-3 mt-3 items-center text-gray-400 ${isActive(
              "/change-password"
            )}`}
            to="/change-password"
          >
            <MdOutlinePassword size={25} color="red" /> <p className="text-[17px]">Change Password</p>
          </Link>
        </div>
      )}

      {!isSidebarOpen && (
        <div className="">
          <button
            className="p-2 bg-white fixed top-40 left-0 z-10 mt-2 mr-2 border rounded-full"
            onClick={toggleSidebar}
          >
            <IoIosArrowForward size={25} color="black" />
          </button>
        </div>
      )}
    </>
  );
};

export default Sidebar;
