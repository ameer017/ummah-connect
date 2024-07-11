import React, { useState, useEffect } from "react";
import axios from "axios";
import useRedirectLoggedOutUser from "../UseRedirect/UseRedirectLoggedOutUser";
import { useNavigate } from "react-router-dom";
import FileUpload from "./FileUpload";
import { toast } from "react-toastify";

const URL = import.meta.env.VITE_APP_BACKEND_URL;
const cloud_name = import.meta.env.VITE_APP_CLOUD_NAME;
const upload_preset = import.meta.env.VITE_APP_UPLOAD_PRESET;

const topicsOptions = [
  "",
  "Quran and Tafsir",
  "Fiqh (Islamic Jurisprudence)",
  "Hadith",
  "Aqeedah (Creed and Belief)",
  "Seerah (Biography of the Prophet Muhammad)",
  "Da'wah (Invitation to Islam)",
];

const CreateContent = () => {
	useRedirectLoggedOutUser("/login");
	const [formData, setFormData] = useState({
		title: "",
		categoryId: "",
		url: "",
		description: "",
		topics: [],
		type: "",
	});
	const [categories, setCategories] = useState([]);
	const [uploadFile, setUploadFile] = useState(null);
	const [error, setError] = useState("");
	const [uploadProgress, setUploadProgress] = useState(0);

  const navigate = useNavigate();

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await axios.get(`${URL}/content/categories`);
				// console.log(response.data)
				setCategories(response.data);
				console.log(response.data)
			} catch (err) {
				console.error("Error fetching categories:", err);
			}
		};
		fetchCategories();
	}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "topics") {
      const options = e.target.options;
      const selectedTopics = [];
      for (let i = 0, len = options.length; i < len; i++) {
        if (options[i].selected) {
          selectedTopics.push(options[i].value);
        }
      }
      setFormData({ ...formData, topics: selectedTopics });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      let fileUrl;
      if (formData.type === "Video" || formData.type === "Audio") {
        const fileType = formData.type.toLowerCase();

        if (
          (uploadFile && uploadFile.type.startsWith("video/")) ||
          uploadFile.type.startsWith("audio/")
        ) {
          const fileUploadForm = new FormData();
          fileUploadForm.append("file", uploadFile);
          fileUploadForm.append("cloud_name", cloud_name);
          fileUploadForm.append("upload_preset", upload_preset);

          const uploadToCloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloud_name}/${fileType}/upload`;

          // Create XMLHttpRequest object
          const xhr = new XMLHttpRequest();
          xhr.open("POST", uploadToCloudinaryUrl);

          // Track upload progress
          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              const percentComplete = (event.loaded / event.total) * 100;
              setUploadProgress(percentComplete);
            }
          };

					xhr.onload = async () => {
						if (xhr.status === 200) {
							const fileData = JSON.parse(xhr.responseText);
							fileUrl = fileData.url.toString();
						} else {
							throw new Error("Upload failed");
						}
					};
					// Send the request
					xhr.send(fileUploadForm);
				} else {
					toast.error("Please select a valid video file");
				}
			}

			const category = categories.find(el => el.type === formData.type)
			console.log(category)

			const response = await axios.post(`${URL}/content/create-content`, {
				...formData,
				fileUrl,
				categoryId: category._id
			});
			console.log("Content created:", response.data);
			// Reset form
			setFormData({
				title: "",
				type: "",
				categoryId: "",
				description: "",
				topics: [],
			});
			navigate("/content-categories");
		} catch (error) {
			console.error("Error creating content:", error.response.data);
			setError(error.response.data.message || "An error occurred");
		}
	};

	return (
		<div className="h-[100vh] border bg-[#ececec] flex items-center justify-center">
			<div className="flex flex-col items-center justify-center h-screen">
				<div className="w-[300px] md:w-[500px] bg-white rounded-lg shadow-md p-6">
					<h2 className="text-2xl font-bold mb-4 text-center">
						Create Content
					</h2>
					{error && <p className="text-red-500 mb-4">{error}</p>}
					<form className="flex flex-col" onSubmit={handleSubmit}>
						<div className="mb-4">
							<label className="block text-gray-700">Title</label>
							<input
								type="text"
								name="title"
								value={formData.title}
								onChange={handleChange}
								className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
								required
							/>
						</div>
						{/* <div className="mb-4">
              <label className="block text-gray-700">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                required
              >
                <option value="">Select Type</option>
                <option value="article">Article</option>
                <option value="video">Video</option>
                <option value="audio">Audio</option>
              </select>
            </div> */}

						<div className="mb-4">
							<label className="block text-gray-700">Description</label>
							<textarea
								name="description"
								value={formData.description}
								onChange={handleChange}
								className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
								required
							/>
						</div>
						<div className="mb-4">
							<label className="block text-gray-700">Topics</label>
							<select
								name="topics"
								value={formData.topics}
								onChange={handleChange}
								className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
								required
							>
								{topicsOptions.map((topic) => (
									<option key={topic} value={topic}>
										{topic}
									</option>
								))}
							</select>
						</div>
						<div className="mb-4">
							<label className="block text-gray-700">Type</label>
							<select
								name="type"
								value={formData.type}
								onChange={handleChange}
								className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
								required
							>
								<option value="">Select Type</option>
								{categories.map((category) => (
									<option key={category._id} value={category.type}>
										{category.type}
									</option>
								))}
							</select>
						</div>
						{(formData.type === "Video" || formData.type === "Audio") && (
							<FileUpload
								setUploadFile={setUploadFile}
								uploadProgress={uploadProgress}
								fileType={formData.type}
							/>
						)}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Create Content
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateContent;
