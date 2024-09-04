import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiFacebook } from "react-icons/fi";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const URL = import.meta.env.VITE_APP_BACKEND_URL;

const initialState = { email: "" };

const Footer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState(initialState);

  const { email } = formData;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target.value);
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();
  const createSubscription = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Email is required!");
    }
    try {
      setLoading(true);
      const userData = { email };
      const response = await axios.post(`${URL}/subscribe/subscribe`, userData);
      setSuccess(response.data);
      setFormData("");
      toast.success("Subscribed ✅");
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError("error subscribing", error);
      console.error(error);
    }
  };

  const currentTime = new Date().getFullYear();

  let buttonText;

  if (loading) {
    buttonText = "Subscribing...";
  } else if (success) {
    buttonText = "Subscribed!";
  } else if (error) {
    buttonText = "Failed to Subscribe";
  } else {
    buttonText = "Subscribe";
  }

  return (
    <>
      <footer className="bg-[#0A66C2] text-white pt-12 pb-8 px-4">
        <div className="container overflow-hidden flex flex-col md:flex-row justify-between mx-auto px-4">
          <div className="flex flex-col gap-2">
            <h2 className=" mr-2 w-30 text-2xl font-serif font-bold">
              Ummah Connect
            </h2>
            <p className="text[23px] ">Get Weekly News On Ummah Connect</p>
            <form className="flex gap-2">
              <input
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your email address"
                name="email"
                className="bg-transparent border rounded-lg p-2 w-[215px] outline-none"
              />
              <button
                className="rounded-lg bg-white text-[#0A66C2] py-2 px-4"
                onClick={createSubscription}
              >
                {buttonText}
              </button>
            </form>
          </div>

          <div className=" border-t sm:flex text-sm mt-6 lg:mt-0">
            <ul className="text-white list-none p-0 font-thin flex flex-col text-left w-full text-[15px] ">
              <li>
                <Link
                  to="/about"
                  className="inline-block py-2 pl-3 pr-5  hover:text-white no-underline"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/content-categories"
                  className="inline-block py-2 pl-3 pr-5  hover:text-white no-underline"
                >
                  Categories
                </Link>
              </li>


              <li>
                <Link
                  to="/content-categories"
                  className="inline-block py-2 pl-3 pr-5  hover:text-white no-underline"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/content-categories"
                  className="inline-block py-2 pl-3 pr-5  hover:text-white no-underline"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  to="/forum"
                  className="inline-block py-2 pl-3 pr-5  hover:text-white no-underline"
                >
                  Forum
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className=" mt-4 pt-6 border-t border-white-500 flex md:justify-between px-6 flex-col gap-2 md:flex-row justify-center items-center text-[13px]">
          <div>
            <p className="text-center  ">
              Copyright &copy; {currentTime}, Ummah Connect.&nbsp;All rights
              reserved.
            </p>
          </div>
          <div className="flex gap-2">
            <p>Connect With Us:</p>

            <div className="flex gap-2">
              <a href="#">
                <FiFacebook size={15} />
              </a>
              <a href="#">
                <FaInstagram size={15} />
              </a>
              <a href="#">
                <FaLinkedinIn size={15} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
