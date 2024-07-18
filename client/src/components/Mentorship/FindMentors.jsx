import React, { useState, useEffect } from "react";
import axios from "axios";
import useRedirectLoggedOutUser from "../UseRedirect/UseRedirectLoggedOutUser";
const URL = import.meta.env.VITE_APP_BACKEND_URL;

const FindMentorMentee = ({ tag }) => {
    useRedirectLoggedOutUser("/login")
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
    <div>
      <h1>Available {tag === "mentor" ? "Mentees" : "Mentors"}</h1>
      <ul>
        {list.map((item) => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FindMentorMentee;
