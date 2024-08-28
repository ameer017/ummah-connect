import React, { useEffect, useState } from "react";
import axios from "axios";
import ChapterModal from "./ChapterModal";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/feature/auth/authSlice";

const URL = import.meta.env.VITE_APP_BACKEND_URL;
const cloud_name = import.meta.env.VITE_APP_CLOUD_NAME;
const upload_preset = import.meta.env.VITE_APP_UPLOAD_PRESET;

const handleFileUpload = async (files, folder) => {
  let uploadedFile;
  try {
      const uploadPromises = Array.from(files).map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", upload_preset);
          formData.append("folder", folder);

          // Determine the Cloudinary endpoint and resource type based on file type
          let uploadUrl = `https://api.cloudinary.com/v1_1/${cloud_name}`;
          let resourceType;

          if (file.type.startsWith("image/")) {
              uploadUrl += "/image/upload";
              resourceType = "image";
          } else if (file.type.startsWith("video/")) {
              uploadUrl += "/video/upload";
              resourceType = "video";
          } else {
              uploadUrl += "/raw/upload";
              resourceType = "raw";
          }

          // Add resource_type to the formData
          formData.append("resource_type", resourceType);

          try {
              const response = await axios.post(uploadUrl, formData, {
                  headers: { "Content-Type": "multipart/form-data" },
                  withCredentials: false,
              });
              uploadedFile = response.data.secure_url;

              // If it's a raw file, modify the URL to make it accessible
              if (resourceType === "raw") {
                  uploadedFile = uploadedFile.replace("/raw/upload/", "/raw/upload/fl_attachment/");
              }
          } catch (error) {
              console.error("Error uploading file:", error);
          }
      });
      await Promise.all(uploadPromises);
      console.log(uploadedFile);
      return uploadedFile;
  } catch (error) {
      console.log(error);
  }
};

const CreateCourseForm = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);
	const [duration, setDuration] = useState("");
	const [chapters, setChapters] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentChapter, setCurrentChapter] = useState(null);
	const [coverImage, setCoverImage] = useState(null);
	const [savingChapter, setSavingChapter] = useState(false);
  const [isCreatingCourse, setIsCreatingCourse] = useState(false)

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);

	useEffect(() => {
		if (user && user._id) {
			dispatch(getUser(user._id));
		}
	}, [dispatch, user]);

	const handleChapterSave = async (chapter) => {
		setSavingChapter(true);

		try {
			const { article, video, audio, ...chapterData } = chapter;
			console.log(chapter);

			const uploadedArticle = await handleFileUpload(article, "article");
			const uploadedVideo = await handleFileUpload(video, "video");
			const uploadedAudio = await handleFileUpload(audio, "audio");

			const newChapter = {
				...chapterData,
				article: uploadedArticle,
				video: uploadedVideo,
				audio: uploadedAudio,
			};

			if (currentChapter === null) {
				setChapters([...chapters, newChapter]);
			} else {
				const updatedChapters = chapters.map((ch, index) =>
					index === currentChapter ? newChapter : ch
				);
				setChapters(updatedChapters);
			}
			setCurrentChapter(null);
			setIsModalOpen(false);
		} catch (error) {
      console.log(error)
    } finally{
			setSavingChapter(false);

    }
	};

	const handleAddChapter = () => {
		setCurrentChapter(null);
		setIsModalOpen(true);
	};

	const handleEditChapter = (index) => {
		setCurrentChapter(index);
		setIsModalOpen(true);
	};

	const handleDeleteChapter = (index) => {
		setChapters(chapters.filter((_, idx) => idx !== index));
	};

	const handleFileChange = (event) => {
		if (event.target.name === "coverImage") {
			setCoverImage(event.target.files[0]);
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
    setIsCreatingCourse(true);

    if(chapters.length === 0){
      toast.error("Please add at least one chapter");
      return;
    }

		const formData = new FormData();
		formData.append("title", title);
		formData.append("description", description);
		formData.append("price", price);
		formData.append("duration", duration);
		formData.append("chapters", JSON.stringify(chapters));

		if (coverImage) {
			const imageFormData = new FormData();
			imageFormData.append("file", coverImage);
			imageFormData.append("upload_preset", upload_preset);

			const response = await fetch(
				`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
				{ method: "post", body: imageFormData }
			);
			const imgData = await response.json();
			formData.append("coverImage", imgData.secure_url);
		}

		try {
			const config = {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			};

			const response = await axios.post(
				`${URL}/courses/create-course`,
				formData,
				config
			);

			console.log(response.data);

			const courseId = response.data._id;
			// const progressData = {
			//   userId: user._id,
			//   courseId: courseId,
			// };

			// const _formData = new FormData();
			// _formData.append("userId", user._id);
			// _formData.append("courseId", courseId);

			// await axios.post(`${URL}/progress/add-progress`, _formData, config);
			toast.success("Course created successfully");
			navigate("/course-list");
		} catch (error) {
			console.error("Error creating course:", error);
			toast.error("Error creating course");
		} finally{
      setIsCreatingCourse(false);
    }
	};

	return (
		<div className="h-screen flex items-center justify-center bg-white">
			<form onSubmit={handleSubmit} className="w-[350px] md:w-[650px] p-4">
				<div className="flex gap-4">
					<div className="flex flex-col w-[49%]">
						<label htmlFor="title" className="text-gray-700 font-semibold mb-2">
							Course Title:
						</label>
						<input
							type="text"
							id="title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="border border-gray-300 rounded-md p-2"
							required
						/>
					</div>
					<div className="flex flex-col w-[49%]">
						<label
							htmlFor="price"
							className="text-gray-700 font-semibold mb-2"
						>
							Price:
						</label>
						<input
            defaultValue={0}
							type="number"
							id="price"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							className="border border-gray-300 rounded-md p-2"
							// required
						/>
					</div>
				</div>
				<div className="flex flex-col mb-4">
					<label
						htmlFor="description"
						className="text-gray-700 font-semibold mb-2"
					>
						Description:
					</label>
					<textarea
						id="description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="border border-gray-300 rounded-md p-2"
						rows="4"
						required
					></textarea>
				</div>
				<div className="flex flex-col mb-4">
					<label
						htmlFor="duration"
						className="text-gray-700 font-semibold mb-2"
					>
						Duration (in hours):
					</label>
					<input
						type="number"
						id="duration"
						value={duration}
						onChange={(e) => setDuration(e.target.value)}
						className="border border-gray-300 rounded-md p-2"
						required
					/>
				</div>
				<div className="flex flex-col mb-4">
					<label
						htmlFor="coverImage"
						className="text-gray-700 font-semibold mb-2"
					>
						Cover Image:
					</label>
					<input
						type="file"
						id="coverImage"
						name="coverImage"
						onChange={handleFileChange}
						className="border border-gray-300 rounded-md p-2"
					/>
				</div>
				<div className="flex flex-col mb-4">
					<label className="text-gray-700 font-semibold mb-2">Chapters:</label>
					{chapters.map((chapter, index) => (
						<div
							key={index}
							className="border border-gray-300 rounded-md p-2 mb-2"
						>
							<div className="flex justify-between items-center">
								<span className="font-semibold">{chapter.title}</span>
								<div>
									<button
										type="button"
										onClick={() => handleEditChapter(index)}
										className="text-blue-500 mr-2"
									>
										Edit
									</button>
									<button
										type="button"
										onClick={() => handleDeleteChapter(index)}
										className="text-red-500"
									>
										Delete
									</button>
								</div>
							</div>
						</div>
					))}
					<button
						type="button"
						onClick={handleAddChapter}
						className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
					>
						Add Chapter
					</button>
				</div>
				<button
					type="submit"
          disabled={isCreatingCourse}
					className="bg-green-500 text-white px-4 py-2 rounded"
				>
          {isCreatingCourse ? "Creating Course..." : "Create Course"}
				</button>
			</form>
			<ChapterModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				savingChapter={savingChapter}
				onSave={handleChapterSave}
				chapter={currentChapter !== null ? chapters[currentChapter] : null}
			/>
		</div>
	);
};

export default CreateCourseForm;
