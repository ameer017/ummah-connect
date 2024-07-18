import React, { useState, useEffect } from "react";
import axios from "axios";
import useRedirectLoggedOutUser from "../UseRedirect/UseRedirectLoggedOutUser";
const URL = import.meta.env.VITE_APP_BACKEND_URL;

const FindMentorMentee = ({ tag }) => {
  useRedirectLoggedOutUser("/login");
  const [list, setList] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await axios.get(
          `${URL}/mentorship/find-${tag === "mentor" ? `mentees` : `mentors`}${
            query ? `/${query}` : ""
          }`
        );
        setList(response.data);
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

  return (
    <div className="container mx-auto p-4 mt-6">
      <h1 className="text-2xl font-bold text-center mb-4">
        Available {tag === "mentor" ? "Mentees" : "Mentors"}
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
              className="border-b last:border-none p-2 hover:bg-gray-100"
            >
              {item.firstName} {item.lastName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FindMentorMentee;
