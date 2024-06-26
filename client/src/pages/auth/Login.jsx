import React from "react";
import { Link } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput/PasswordInput";

const Login = () => {
  return (
    <div className="h-[100vh] border bg-[#ececec] flex items-center justify-center">
      <div className="flex flex-col items-center justify-center h-screen ">
        <div className="w-[300px] md:w-[500px] bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
          <form className="flex flex-col">
            <input
              placeholder="Email"
              className="text-gray-500 border rounded-md p-2 mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="email"
            />

            <input
              placeholder="Password"
              className="text-gray-500 border rounded-md p-2 mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="password"
            />

            <Link to="/forgot-password" className="underline text-right">
              Forgot Password
            </Link>

            <button
              className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
              type="submit"
            >
              Sign In
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
              Don&apos;t have an account? &nbsp;
            <Link
              className=" hover:text-[#35d7ff] text-black hover:underline mt-4"
              to="/register"
            >
              - Register
            </Link>
              </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
