import React, { useState } from "react";
import { RiMenuUnfold2Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [menuIcon, setMenuIcon] = useState("menu");

  const navigate = useNavigate()

  const onMenuToggle = () => {
    const navlinks = document.querySelector(".navLinks");
    setMenuIcon((prevIcon) => (prevIcon === "menu" ? "close" : "menu"));
    navlinks.classList.toggle("left-[0%]");
  };

  return (
    <div>
      <header className="relative shadow-lg p-[1em] md:px-[5em] md:py-[2em] ">
        <nav className="flex justify-between">
          <Link
            to="/"
            className="block mr-2 w-30 text-2xl font-serif font-bold"
          >
            Ummah Connect
          </Link>
          <div className="flex items-center gap-3">
            <div className="navLinks duration-500 absolute md:static md:w-auto w-full md:h-auto h-[85vh] flex md:items-center bg-white md:bg-transparent gap-[1.5vw] top-[100%] left-[-100%] px-5 md:py-0 py-5">
              <ul className="flex md:flex-row flex-col md:items-center md:gap-[2vw] gap-8 text-[15px] ">
                {["Home", "Faculty", "Courses", "About Us", "Contact Us"].map(
                  (item) => (
                    <li
                      key={item}
                      className="relative max-w-fit pr-3 md:pr-0 py-1 after:bg-gradient-to-r from-[#eee] to-[#000] after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300"
                    >
                      <a href="#">{item}</a>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="hover:bg-gray-400 bg-gray-500 hover:text-[#ccc]  font-bold text-[#000] px-5 py-2 rounded-full"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <RiMenuUnfold2Line
                name={menuIcon}
                onClick={onMenuToggle}
                className="text-[30px] cursor-pointer md:hidden"
              />
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
