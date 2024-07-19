import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useRedirectLoggedOutUser from "../UseRedirect/UseRedirectLoggedOutUser";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/feature/auth/authSlice";

const URL = import.meta.env.VITE_APP_BACKEND_URL;

const FindMentorMentee = () => {
  useRedirectLoggedOutUser("/login");
  const user = useSelector(selectUser);
  const [list, setList] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await axios.get(
          `${URL}/mentorship/find-${
            user.tag === "mentor" ? "mentees" : "mentors"
          }`
        );
        setList(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchList();
  }, [user.tag]);

  const handleSearch = () => {
    if (user.tag === "mentor") {
      const expertise = prompt("Enter mentee expertise (comma separated):");
      if (expertise) {
        setQuery(expertise);
      }
    } else {
      const interests = prompt("Enter mentor interests (comma separated):");
      if (interests) {
        setQuery(interests);
      }
    }
  };

  useEffect(() => {
    if (query) {
      const fetchList = async () => {
        try {
          const response = await axios.get(
            `${URL}/mentorship/find-${
              user.tag === "mentor" ? `mentees/${query}` : `mentors/${query}`
            }`
          );
          setList(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchList();
    }
  }, [query, user.tag]);

  const handleItemClick = (item) => {
    navigate(`/schedule-session/${item._id}`);
  };

  return (
    <div className="container mx-auto p-4 mt-6">
      <h1 className="text-2xl font-bold text-center mb-4">
        Available {user.tag === "mentor" ? "Mentees" : "Mentors"}
      </h1>
      <button
        onClick={handleSearch}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Search
      </button>
      {list.length === 0 ? (
        <p>No data found!</p>
      ) : (
        <ul className="bg-white shadow-md rounded-lg p-4">
          {list.map((item) => (
            <li
              key={item._id}
              className="border-b last:border-none p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleItemClick(item)}
            >
              {item.firstName} {item.lastName}
              <p>
                Expertise: &nbsp;
                <span className="text-xl">{item.expertise.join(", ")}</span>
              </p>
              <p>
                Available Time: &nbsp;
                <span className="text-xl">
                  {item.availableTimes.join(", ")}
                </span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FindMentorMentee;
