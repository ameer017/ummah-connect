import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const URL = import.meta.env.VITE_APP_BACKEND_URL;

const ForumList = () => {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await axios.get(`${URL}/discussion/all-threads`);
        // console.log(response)
        setThreads(response.data);
      } catch (error) {
        console.error("Error fetching threads:", error);
      }
    };

    fetchThreads(); 
  }, []);

  return (
    <div className="flex min-h-screen">
      <div className="w-1/4 bg-gray-200 p-4 flex flex-col space-y-2">
        <p className=" text-[20px] ">
            Discussion Forum
        </p>

        <Link
          to="/create-thread"
          className="text-blue-500 hover:text-blue-700 text-[18px] "
        >
          Create Discussion
        </Link>
        
        <Link
          to="/report-thread"
          className="text-blue-500 hover:text-blue-700 text-[18px] "
        >
          Reports
        </Link>
      </div>
      <div className="w-3/4 bg-white p-4">
        <h1 className="text-2xl font-bold mb-4">All Threads</h1>
        {threads?.length > 0 ? (
          <ul>
            {threads?.map((thread) => (
              <li key={thread._id} className="mb-4">
                <Link
                  to={`/threads/${thread._id}`}
                  className="text-xl font-semibold text-blue-500 hover:underline"
                >
                  {thread.title}
                </Link>
                <p className="text-gray-700">{thread.content}</p>
                <p className="text-gray-500 text-sm">
                  By {thread.createdBy.username}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No threads available.</p>
        )}
      </div>
    </div>
  );
};

export default ForumList;
