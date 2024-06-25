import React from "react";
import { Link } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput/PasswordInput";

const ChangePassword = () => {
  return (
    <div className="h-[100vh] border  flex items-center justify-center">
      <div className="flex flex-col items-center justify-center light">
        <div className="w-[300px] md:w-[500px] bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Change Password
          </h2>

          <form className="flex flex-col">
            <input
              type="password"
              className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              placeholder="current password"
            />

            <PasswordInput />

            <PasswordInput
              onPaste={(e) => {
                e.preventDefault();
                toast.error("Cannot paste into input field");
                return false;
              }}
            />

            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
            >
              Change Password
            </button>

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
                <Link
                  to="/login"
                  className="hover:text-[#35d7ff] text-black hover:underline"
                >
                  - Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
