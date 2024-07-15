import React from "react";
import { Link } from "react-router-dom";
import { FiFacebook } from "react-icons/fi";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  const currentTime = new Date().getFullYear();
  return (
    <>
      <footer className="bg-[#0A66C2] text-white pt-12 pb-8 px-4">
        <div className="container overflow-hidden flex flex-col md:flex-row justify-between mx-auto px-4">
          <h2 className=" mr-2 w-30 text-2xl font-serif font-bold">
            Ummah Connect
          </h2>

          <div className=" border-t sm:flex text-sm mt-6 lg:mt-0">
            <ul className="text-white list-none p-0 font-thin flex flex-col text-left w-full">
              <li>
                <Link
                  to="/forum"
                  className="inline-block py-2 pl-3 pr-5  hover:text-white no-underline"
                >
                  Forum
                </Link>
              </li>
              <li>
                <Link
                  to="/content-list"
                  className="inline-block py-2 pl-3 pr-5  hover:text-white no-underline"
                >
                  Contents
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
            </ul>
          </div>
        </div>
        <div className="pt-4 mt-4 pt-6 border-t border-white-500 flex justify-between px-6 flex-col gap-2 md:flex-row justify-center items-center">
          <div>
            <p className="text-center ">
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
