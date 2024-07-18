import React, { useState, useEffect } from "react";
import axios from "axios";
import useRedirectLoggedOutUser from "../UseRedirect/UseRedirectLoggedOutUser";
const URL = import.meta.env.VITE_APP_BACKEND_URL;

const FindMentorMentee = ({ tag }) => {
  useRedirectLoggedOutUser("/login");
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      const response = await axios.get(
        `${URL}/mentorship/find-${tag === "mentor" ? "mentees" : "mentors"}`
      );
      setList(response.data);
    };
    fetchList();
  }, [tag]);

  return (
    <div className="container mx-auto p-4 mt-6 ">
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
            className="border-b last:border-none p-2 hover:bg-gray-100"
          >
            {item.name}
          </li>
        ))}
      </ul>
      )}
    </div>
  );
};

export default FindMentorMentee;
