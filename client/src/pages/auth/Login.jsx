import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { validateEmail } from "../../redux/feature/auth/authService";
import {
  login,
  loginWithGoogle,
  RESET,
} from "../../redux/feature/auth/authSlice";
const initialState = {
  emailAddress: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const { emailAddress, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isLoggedIn, isSuccess, message, isError, twoFactor } =
    useSelector((state) => state.auth);

  const loginUser = async (e) => {
    e.preventDefault();

    if (!emailAddress || !password) {
      return toast.error("All fields are required");
    }

    if (!validateEmail(emailAddress)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      emailAddress,
      password,
    };

    // console.log(userData);
    await dispatch(login(userData));
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/profile");
    }

    dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, navigate, isError]);

  return (
    <div className="h-[100vh] border bg-[#ececec] flex items-center justify-center">
      <div className="flex flex-col items-center justify-center h-screen ">
        <div className="w-[300px] md:w-[500px] bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
          <form className="flex flex-col" onSubmit={loginUser}>
            <input
              placeholder="Email"
              className="text-gray-500 border rounded-md p-2 mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="email"
              name="emailAddress"
              value={emailAddress}
              onChange={handleInputChange}
            />

            <PasswordInput
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleInputChange}
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
