import React from "react";
import { NavLink } from "react-router-dom";
import { AdminLink } from "../Protect/HiddenLink";

const PageMenu = () => {
  return (
    <div>
      <nav className="w-[400px] md:w-[600px] bg-blue-600 rounded-lg  mb-4">
        <ul className="flex gap-[20px] justify-center p-2  items-center ">
          <li className="text-[#fff] ">
            <NavLink to="/profile">Profile</NavLink>
          </li>
          <li className="text-[#fff] ">
            <NavLink to="/change-password">Change Password</NavLink>
          </li>
          <li className="text-[#fff] ">
            <NavLink to="/">Contents</NavLink>
          </li>
          <AdminLink>
            <li className="text-[#fff] ">
              <NavLink to="/users">Users</NavLink>
            </li>
          </AdminLink>
        </ul>
      </nav>
    </div>
  );
};

export default PageMenu;