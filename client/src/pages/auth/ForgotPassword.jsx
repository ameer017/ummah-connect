import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { validateEmail } from "../../redux/feature/auth/authService";
import { RESET, forgotPassword } from "../../redux/feature/auth/authSlice";

const ForgotPassword = () => {
  const [emailAddress, setEmail] = useState("");
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.auth);

  const forgot = async (e) => {
    e.preventDefault();

    if (!emailAddress) {
      return toast.error("Please enter an email");
    }

    if (!validateEmail(emailAddress)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      emailAddress,
    };

    await dispatch(forgotPassword(userData));
    await dispatch(RESET(userData));
  };
  return (
    <div className="h-[100vh] border flex items-center justify-center">
      <div className="flex flex-col items-center justify-center light">
        <div className="w-[300px] md:w-[500px] bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Forgot Password
          </h2>

          <form className="flex flex-col" onSubmit={forgot}>
            <input
              type="email"
              required
              name="email"
              value={emailAddress}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              placeholder="Enter your email address"
            />

            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
            >
              Get Reset Email
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

export default ForgotPassword;
