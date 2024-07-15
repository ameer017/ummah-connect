import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import {
  changePassword,
  logout,
  RESET,
} from "../../redux/feature/auth/authSlice";
import { sendAutomatedEmail } from "../../redux/feature/email/emailSlice";
import useRedirectLoggedOutUser from "../../components/UseRedirect/UseRedirectLoggedOutUser";

const initialState = {
  oldPassword: "",
  password: "",
  password2: "",
};

const ChangePassword = () => {
  useRedirectLoggedOutUser("/login");
  const [formData, setFormData] = useState(initialState);
  const { oldPassword, password, password2 } = formData;

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const updatePassword = async (e) => {
    e.preventDefault();

    if (!oldPassword || !password || !password2) {
      return toast.error("All fields are required");
    }

    if (password !== password2) {
      return toast.error("Passwords do not match");
    }

    const userData = {
      oldPassword,
      password,
    };

    const emailData = {
      subject: "Password Changed - UmmahConnect",
      send_to: user.emailAddress,
      reply_to: "noreply@ummahconnect",
      template: "changePassword",
      url: "/forgot",
    };

    await dispatch(changePassword(userData));
    await dispatch(sendAutomatedEmail(emailData));
    await dispatch(logout());
    await dispatch(RESET(userData));
    navigate("/login");
  };

  const prev = async () => {
    navigate(-1);
  };
  return (
    <div className="h-[100vh] border  flex items-center justify-center">
      <div className="border p-2 absolute top-0 left-0">
        <button className="underline" onClick={prev}>
          BACK
        </button>
      </div>
      <div className="flex flex-col items-center justify-center light">
        <div className="w-[300px] md:w-[500px] bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Change Password
          </h2>

          <form className="flex flex-col" onSubmit={updatePassword}>
            <PasswordInput
              placeholder="current password"
              name="oldPassword"
              value={oldPassword}
              onChange={handleInputChange}
            />

            <PasswordInput
              placeholder="New Password"
              name="password"
              value={password}
              onChange={handleInputChange}
            />

            <PasswordInput
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={handleInputChange}
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
