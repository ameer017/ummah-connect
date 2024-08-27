import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { validateEmail } from "../../redux/feature/auth/authService";
import {
  RESET,
  register,
  sendVerificationEmail,
} from "../../redux/feature/auth/authSlice";

const initialState = {
  firstName: "",
  lastName: "",
  username: "",
  emailAddress: "",
  password: "",
  password2: "",
  phone: "",
  gender: "",
};

const Signup = () => {
  const [formData, setFormData] = useState(initialState);
  const {
    firstName,
    lastName,
    username,
    emailAddress,
    password,
    password2,
    phone,
    gender,
  } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isLoggedIn, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(e.target.value);
    setFormData({ ...formData, [name]: value });
  };

  const registerUser = async (e) => {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !username ||
      !gender ||
      !phone ||
      !emailAddress ||
      !password
    ) {
      return toast.error("All fields are required");
    }
    if (password.length < 6) {
      return toast.error("Password must be up to 6 characters");
    }
    if (!validateEmail(emailAddress)) {
      return toast.error("Please enter a valid email");
    }
    if (password !== password2) {
      return toast.error("Passwords do not match");
    }

    const userData = {
      firstName,
      lastName,
      username,
      emailAddress,
      password,
      phone,
      gender,
    };

    await dispatch(register(userData));
    await dispatch(sendVerificationEmail());
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/profile");
    }

    dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, navigate]);

  return (
    <div className="h-[100vh] border bg-[#ececec] flex items-center justify-center">
      <div className="flex flex-col items-center justify-center h-screen dark">
        <div className="w-[300px] md:w-[500px] bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
          <form className="flex flex-col" onSubmit={registerUser}>
            <div className="flex space-x-4 mb-4">
              <input
                placeholder="First Name"
                className="border rounded-md p-2 w-1/2 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
                name="firstName"
                value={firstName}
                onChange={handleInputChange}
              />
              <input
                placeholder="Last Name"
                className="border rounded-md p-2 w-1/2 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
                name="lastName"
                value={lastName}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex space-x-4 mb-4">
              <input
                placeholder="Username"
                className="border rounded-md p-2 w-1/2 mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
                name="username"
                value={username}
                onChange={handleInputChange}
              />
              <input
                placeholder="Email"
                className="border rounded-md p-2 w-1/2 mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="email"
                name="emailAddress"
                value={emailAddress}
                onChange={handleInputChange}
              />
            </div>
            <input
              placeholder="Phone Number"
              className="border rounded-md p-2 mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
              name="phone"
              value={phone}
              onChange={handleInputChange}
            />

            <label className="text-sm mb-2 cursor-pointer" htmlFor="gender">
              Gender
            </label>
            <select
              className="border rounded-md p-2 mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              id="gender"
              name="gender"
              value={gender}
              onChange={handleInputChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <PasswordInput
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleInputChange}
            />

            <PasswordInput
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={handleInputChange}
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
              {isLoading ? "Signing you up" : "Sign Up"}{" "}
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
