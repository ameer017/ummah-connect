import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaPenFancy, FaTrash } from "react-icons/fa";
import { LuPenSquare } from "react-icons/lu";
import { SlTrash } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/feature/auth/authSlice";
import PageLoader from "../Loader/PageLoader";

const URL = import.meta.env.VITE_APP_BACKEND_URL;

const ThreadDetail = ({ userId }) => {
  const { id } = useParams();
  const [thread, setThread] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [message, setMessage] = useState("");
  const [replies, setReplies] = useState([]);
  const [userID, setUserID] = useState("");
  const [replyerID, setReplyerID] = useState(null);
  const [creator, setCreator] = useState(null);
  const [showReportForm, setShowReportForm] = useState(false);

  const [editingReplyId, setEditingReplyId] = useState(null);
  const [editingReplyContent, setEditingReplyContent] = useState("");
  const [reportReason, setReportReason] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  // console.log(user)
  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch]);

  useEffect(() => {
    const fetchThread = async () => {
      try {
        const response = await axios.get(`${URL}/discussion/threads/${id}`);
        setThread(response.data.thread);
        setCreator(response.data.thread.createdBy);
        setReplies(response.data.replies);
        setLoading(false);

        setReplyerID(response.data.replies[0].createdBy);
        console.log(replyerID);



        const userInfo = user._id;
        setUserID(userInfo);
        // console.log(userInfo);
      } catch (error) {
        console.error("Error fetching thread:", error);
        setLoading(false);
      }
    };

    fetchThread();
  }, [id]);

  const handleEdit = async () => {
    try {
      const response = await axios.put(`${URL}/discussion/threads/${id}`, {
        title: editTitle,
        content: editContent,
      });
      setThread(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error editing thread:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${URL}/discussion/threads/${id}`);
      navigate("/forum");
    } catch (error) {
      console.error("Error deleting thread:", error);
    }
  };

  const handleReply = async () => {
    try {
      const response = await axios.post(
        `${URL}/discussion/threads/${id}/replies`,
        { content: replyContent }
      );
      setReplies([...replies, response.data]);
      setReplyContent("");
    } catch (error) {
      console.error("Error replying to thread:", error);
    }
  };

  const handleReport = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${URL}/discussion/report`, {
        type: "thread",
        itemId: id,
        reason: reportReason,
      });
      setMessage("Thread reported successfully");
      setReportReason("");
    } catch (error) {
      console.error("Error reporting thread:", error);
      setMessage("Error reporting thread");
    }
  };

  const handleEditReply = async (replyId) => {
    try {
      const response = await axios.put(`${URL}/discussion/replies/${replyId}`, {
        content: editingReplyContent,
      });
      setReplies(
        replies.map((reply) => (reply._id === replyId ? response.data : reply))
      );
      setEditingReplyId(null);
      setEditingReplyContent("");
    } catch (error) {
      console.error("Error editing reply:", error);
    }
  };

  const handleDeleteReply = async (replyId) => {
    try {
      await axios.delete(`${URL}/discussion/replies/${replyId}`);
      setReplies(replies.filter((reply) => reply._id !== replyId));
    } catch (error) {
      console.error("Error deleting reply:", error);
    }
  };

  const toggleReportForm = () => {
    setShowReportForm(!showReportForm);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <PageLoader />
      </div>
    );
  }
  if (!thread) return <p>Thread not found</p>;

  const isCreator = creator && userID === creator._id;
  const isReplyer = replyerID && userID === replyerID._id;

  return (
    <div className="min-h-screen border flex items-center justify-center  relative">
      <button
        className="absolute top-4 left-16 underline text-black px-4 py-2 rounded"
        onClick={() => navigate(-1)}
      >
        BACK
      </button>

      <div className="bg-white p-8 rounded w-[350px] md:w-[800px]  border">
        {message && <p className="mb-4 text-red-500">{message}</p>}
        {isEditing ? (
          <>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="mb-4 p-2 border rounded w-full"
            />
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="mb-4 p-2 border rounded w-full"
              rows="5"
            />
            <button
              onClick={handleEdit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
            >
              Save
            </button>
          </>
        ) : (
          <>
            <div className="flex flex-col items-left md:flex-row justify-between mb-6 md:items-center">
              <h1 className="text-3xl font-bold mb-4">{thread.title}</h1>
              {isCreator && (
                <div className="flex items-center md:bg-gray-200 md:border rounded-lg">
                  <button
                    onClick={() => {
                      setEditTitle(thread.title);
                      setEditContent(thread.content);
                      setIsEditing(true);
                    }}
                    className="text-yellow-500 font-bold py-2 px-4 rounded"
                  >
                    <LuPenSquare size={20} />
                  </button>
                  <button
                    onClick={handleDelete}
                    className=" text-red-500 font-bold py-2 px-4 rounded"
                  >
                    <SlTrash size={20} />
                  </button>
                </div>
              )}
            </div>
            <p className="text-gray-700 mb-4 ">{thread.content}</p>
            <p className="text-gray-500 text-[15px] mb-4">
              By {thread.createdBy.username}
            </p>
          </>
        )}
        <div className="flex space-x-4 mb-4 items-center">
          <button
            onClick={toggleReportForm}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Report
          </button>
          {showReportForm && (
            <div className="flex space-x-4">
              <form onSubmit={handleReport} className="flex space-x-4">
                <input
                  type="text"
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  placeholder="Report reason"
                  className="p-2 border rounded"
                  required
                />
                <button
                  type="submit"
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Submit Report
                </button>
              </form>
            </div>
          )}
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Replies</h2>
          {replies.length > 0 ? (
            <ul className="mb-4">
              {replies.map((reply) => (
                <li key={reply._id} className="mb-2 p-2 border rounded">
                  {editingReplyId === reply._id ? (
                    <>
                      <textarea
                        value={editingReplyContent}
                        onChange={(e) => setEditingReplyContent(e.target.value)}
                        className="mb-4 p-2 border rounded w-full"
                        rows="3"
                      />
                      <button
                        onClick={() => handleEditReply(reply._id)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingReplyId(null);
                          setEditingReplyContent("");
                        }}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <p>{reply.content}</p>
                          <p className="text-gray-500 text-sm">
                            By {reply.createdBy.username}
                          </p>
                        </div>

                        {isReplyer && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setEditingReplyId(reply._id);
                                setEditingReplyContent(reply.content);
                              }}
                              className=" text-white font-bold py-1 px-2 rounded"
                            >
                              <FaPenFancy color="blue" size={20} />
                            </button>
                            <button
                              onClick={() => handleDeleteReply(reply._id)}
                              className=" text-white font-bold py-1 px-2 rounded"
                            >
                              <FaTrash color="red" size={20} />
                            </button>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No replies yet.</p>
          )}
        </div>
        <div>
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            className="mb-4 p-2 border rounded w-full"
            rows="3"
            placeholder="Write a reply..."
          />
          <button
            onClick={handleReply}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Reply
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThreadDetail;
