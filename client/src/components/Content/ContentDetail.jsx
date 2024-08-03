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
  }, [dispatch, userId]);

  useEffect(() => {
    const fetchContentById = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`${URL}/content/content/${id}`);
        setContent(response.data);
        setSubmitted(response.data.submittedBy);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching content:", error);
      }
    };
    fetchContentById();
  }, [id]);

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

  if (loading) return <p className="text-center">Loading!!!</p>;

  if (!content) return <p>No content available</p>;

  return (
    <div className="min-h-screen  flex  justify-center bg-white relative">
      <button
        className="absolute top-4 left-4 underline text-black px-4 py-2 rounded"
        onClick={() => navigate(-1)}
      >
        BACK
      </button>

      <div className="bg-white p-8 rounded w-[350px] md:w-[800px] mt-[2rem] ">
        <div className=" p-2">
          <h1 className="text-2xl font-bold my-4">{content.title}</h1>

          <div className="flex items-center justify-between px-4 mb-[4rem] ">
            <div className="flex gap-4 ">
              <img
                src={submitted.photo}
                alt={submitted.username}
                className="w-[25px] rounded-full"
                loading="lazy"
              />
              <p className="text-[15px]">
                {submitted.firstName} {submitted.lastName}
              </p>
            </div>

            <p>{formatDate(content.createdAt)}</p>
          </div>

          {content.type === "article" && (
            <img
              src={content.fileUrl}
              alt="Article Preview"
              className="rounded-lg"
              loading="lazy"
            />
          )}

          {content.type === "audio" && (
            <audio controls src={content.fileUrl}>
              Your browser does not support the audio element.
            </audio>
          )}

          {content.type === "video" && (
            <video controls width="100%" src={content.fileUrl}>
              Your browser does not support the video element.
            </video>
          )}

          <p className="font-normal text-[20px] mt-6  ">
            {content.description}
          </p>
          <hr className="mt-[4rem] mb-[2rem] " />
          <div className="bg-[#e7f0f9] p-2 mt-2 ">
            <p className="font-bold">
              Authored By: {submitted.firstName} {submitted.lastName}
            </p>{" "}
            <p className="text-[#626262]">
              {submitted.profession} || {submitted.interests[0]}
            </p>
            <div className="text-[#626262] flex gap-2 items-center my-2">
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
