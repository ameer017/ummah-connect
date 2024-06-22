import React from "react";
import { Link } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import { toast } from "react-toastify";

const Signup = () => {
  return (
    <div className="h-[100vh] border bg-[#ececec] flex items-center justify-center">
      <div className="flex flex-col items-center justify-center h-screen dark">
        <div className="w-[300px] md:w-[500px] bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
          <form className="flex flex-col">
            <div className="flex space-x-4 mb-4">
              <input
                placeholder="First Name"
                className=" text-gray-200 border rounded-md p-2 w-1/2 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
              />
              <input
                placeholder="Last Name"
                className=" text-gray-200 border rounded-md p-2 w-1/2 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
              />
            </div>
            <div className="flex space-x-4 mb-4">
              <input
                placeholder="Username"
                className="text-gray-200 border rounded-md p-2 w-1/2 mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
              />
              <input
                placeholder="Email"
                className="text-gray-200 border rounded-md p-2 w-1/2 mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="email"
              />
            </div>
            <input
              placeholder="Phone Number"
              className="text-gray-200 border rounded-md p-2 mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
            />
            <label className="text-sm mb-2 cursor-pointer" for="gender">
              Gender
            </label>
            <select
              className="text-gray-200 border rounded-md p-2 mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              id="gender"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <PasswordInput />

            <PasswordInput
              onPaste={(e) => {
                e.preventDefault();
                toast.error("Cannot paste into input field");
                return false;
              }}
            />
            <button
              className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
              type="submit"
            >
              Sign Up
            </button>
          </form>

          <div className="flex justify-between mt-4">
            <p>
              <Link
                to="/"
                className="hover:text-[#35d7ff] text-black hover:underline"
              >
                - Home
              </Link>
            </p>
            <p>
              Already have an account? &nbsp;
              <Link
                to="/login"
                className="hover:text-[#35d7ff] text-black hover:underline"
              >
                - Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
