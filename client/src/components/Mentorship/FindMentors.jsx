import React, { useState, useEffect } from "react";
import axios from "axios";
import useRedirectLoggedOutUser from "../UseRedirect/UseRedirectLoggedOutUser";
import { useNavigate } from "react-router-dom";

const URL = import.meta.env.VITE_APP_BACKEND_URL;

const FindMentorMentee = ({ tag }) => {
  useRedirectLoggedOutUser("/login");
  const [list, setList] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await axios.get(
          `${URL}/mentorship/find-${tag === "mentor" ? `mentees` : `mentors`}${
            query ? `/${query}` : ""
          }`
        );
        setList(response.data);
        // console.log(list);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchList();
  }, [tag, query]);

  const handleSearch = () => {
    if (tag === "mentor") {
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

  const handleItemClick = (item) => {
    navigate(`/schedule-session/${item._id}`);
  };

  return (
    <div className="container mx-auto p-4 mt-6">
      <h1 className="text-2xl font-bold text-center mb-4">
        Available {tag === "mentor" ? "Mentees" : "Mentors"}
      </h1>
      {list.length === 0 ? (
        <p>No data found!</p>
      ) : (
        <ul className="bg-white shadow-md rounded-lg p-4">
          {list.map((item) => (
            <li
              key={item._id}
              className="border-b last:border-none p-4 hover:bg-gray-100 cursor-pointer"
              onClick={handleItemClick}
            >
              <p className="font-bold text-lg">
              <span className="font-semibold">Name:</span>{" "}
                {item.firstName} {item.lastName}
              </p>
              <p>
                <span className="font-semibold">Expertise:</span>{" "}
                {item.expertise.join(", ")}
              </p>
              <p>
                <span className="font-semibold">Interests:</span>{" "}
                {item.interests.join(", ")}
              </p>
              <p>
                <span className="font-semibold">Available Times:</span>{" "}
                {item.availableTimes.join(", ")}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FindMentorMentee;
