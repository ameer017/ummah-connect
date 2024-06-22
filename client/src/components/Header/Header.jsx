import React, { useState } from "react";
import { RiMenuUnfold2Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const navItems = [
  { id: 1, title: "About", url: "/profile" },
  { id: 2, title: "Content", url: null },
  { id: 3, title: "Profile", url: "/profile" },
  { id: 4, title: "Profile", url: "/profile" },
];

const contentDropdownItems = [
  { id: 1, title: "Create", url: "/create-content" },
  { id: 2, title: "Categories", url: "/content-categories" },
  { id: 2, title: "Content Page", url: "/content-list" },
];

const Header = () => {
  const [menuIcon, setMenuIcon] = useState("menu");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const onMenuToggle = () => {
    const navlinks = document.querySelector(".navLinks");
    setMenuIcon((prevIcon) => (prevIcon === "menu" ? "close" : "menu"));
    navlinks.classList.toggle("left-[0%]");
  };

  const onDropdownToggle = () => {
    setDropdownVisible((prevVisible) => !prevVisible);
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
              <ul className="flex md:flex-row flex-col md:items-center md:gap-[2vw] gap-8 text-[15px]">
                {navItems.map(({ id, title, url }) => (
                  <li
                    key={id}
                    className="relative max-w-fit pr-3 md:pr-0 py-1 after:bg-gradient-to-r from-[#eee] to-[#000] after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300"
                  >
                    {title === "Content" ? (
                      <div className="relative">
                        <button
                          onClick={onDropdownToggle}
                          className="focus:outline-none"
                        >
                          {title}
                        </button>
                        {dropdownVisible && (
                          <ul className="absolute left-0 mt-2 w-48 bg-white border rounded shadow-lg">
                            {contentDropdownItems.map(({ id, title, url }) => (
                              <li key={id}>
                                <Link
                                  to={url}
                                  className="block px-4 py-2 hover:bg-gray-100"
                                >
                                  {title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ) : (
                      <Link to={url}>{title}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center gap-2">
              <Link
                to="/register"
                type="button"
                className="bg-blue-600  font-bold text-[#fff] px-5 py-2 rounded-lg"
                title="Registration Port"
              >
                Register / Login
              </Link>
              <button
                type="button"
                className=" bg-red-600  font-bold text-[#fff] px-5 py-2 rounded-lg"
                title="Registration Port"
              >
                Logout
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
