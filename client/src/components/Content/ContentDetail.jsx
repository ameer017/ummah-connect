import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getUser } from "../../redux/feature/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const URL = import.meta.env.VITE_APP_BACKEND_URL;

const ContentDetail = ({ userId }) => {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  // console.log(user)
  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch]);

  useEffect(() => {
    const fetchContentById = async () => {
      try {
        const response = await axios.get(`${URL}/content/content/${id}`);
        setContent(response.data);
        setSubmitted(response.data.submittedBy);
        // console.log(content)
        // console.log(response.data.submittedBy);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };
    fetchContentById();
  });

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };
  return (
    <div className="min-h-screen border flex  justify-center bg-white relative">
      <button
        className="absolute top-4 left-4 underline text-black px-4 py-2 rounded"
        onClick={() => navigate(-1)}
      >
        BACK
      </button>

      <div className="bg-white p-8 rounded w-[350px] md:w-[800px] mt-[10rem] ">
        <div className="border p-2">
          <h1 className="text-2xl font-bold my-4">{content.title}</h1>

          <div className="flex items-center justify-between px-4 mb-[4rem] ">
            <div className="flex gap-4 ">
              <img
                src={submitted.photo}
                alt={submitted.username}
                className="w-[25px] rounded-full"
              />
              <p className="text-[15px]">
                {submitted.firstName} {submitted.lastName}
              </p>
            </div>

            <p>{formatDate(content.createdAt)}</p>
          </div>

          <p className="font-normal text-[15px] ">{content.description}</p>

          <div className="bg-gray-200 p-2 mt-[4rem] ">
            <p className="font-bold">
              Written By: {submitted.firstName} {submitted.lastName}
            </p>{" "}
            <p className="text-gray-400">
              {submitted.profession} || {submitted.interests[0]}
            </p>
            <div className="text-black-400 flex gap-4 items-center my-2">
              <a
                href={submitted.socialMediaLinks.twitter}
                className="hover:underline"
              >
                X (Formerly Twitter){" "}
              </a>
              <a
                href={submitted.socialMediaLinks.instagram}
                className="hover:underline"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDetail;
