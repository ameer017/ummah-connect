import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ChapterModal = ({ isOpen, savingChapter, onClose, onSave, chapter }) => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [article, setArticle] = useState("");
	const [video, setVideo] = useState("");
	const [audio, setAudio] = useState("");
	const [error, setError] = useState(""); // State for error message

	useEffect(() => {
		if (chapter) {
			setTitle(chapter.title);
			setContent(chapter.content);
			setArticle(chapter.article || "");
			setVideo(chapter.video || "");
			setAudio(chapter.audio || "");
		}
	}, [chapter]);

	useEffect(() => {
		if (!isContentEmpty(content)) {
			setError("");
		}
	}, [content]);

	const handleFileChange = (event) => {
		const { name, files } = event.target;
		switch (name) {
			case "article":
				setArticle(files);
				break;
			case "video":
				setVideo(files);
				break;
			case "audio":
				setAudio(files);
				break;
			default:
				break;
		}
	};

	const isContentEmpty = (content) => {
		const strippedContent = content.replace(/(<([^>]+)>)/gi, "").trim();
		return strippedContent === "";
	};

	const handleSave = async (e) => {
		e.preventDefault();
		if (isContentEmpty(content)) {
			return setError("Content is required"); // Set the error message
		}
		await onSave({
			title,
			content,
			article,
			video,
			audio,
		});
		// onClose();
		setTitle("");
		setContent("");
		setArticle("");
		setVideo("");
		setAudio("");
	};

	if (!isOpen) return null;

	return (
		<div className="fixed overflow-y-scroll p-4 inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
			<div className="bg-white p-4 m-auto rounded shadow-lg w-[90%] max-w-[500px]">
				<h2 className="text-xl font-bold mb-4">
					{chapter ? "Edit" : "Add"} Chapter
				</h2>

				<form onSubmit={handleSave}>
					<div className="flex flex-col mb-4">
						<label htmlFor="title" className="font-semibold">
							Title
						</label>
						<input
							type="text"
							id="title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="border p-2 rounded"
							required
						/>
					</div>
					<div className="flex flex-col mb-4">
						<label htmlFor="content" className="font-semibold">
							Content
						</label>
						<ReactQuill
							required
							id="content"
							value={content}
							onChange={(value) => setContent(value)}
							className="border p-2 rounded h-[300px] overflow-y-auto "
							modules={{
								toolbar: [
									[{ header: "1" }, { header: "2" }],
									["bold", "italic", "underline"],
									[{ list: "ordered" }, { list: "bullet" }],
									["link"],
									["clean"],
								],
							}}
						/>
						{error && <p className="text-red-500">{error}</p>}
					</div>
					<div className="flex flex-col mb-4">
						<label htmlFor="article" className="font-semibold">
							Upload Article
						</label>
						<input
							type="file"
							id="article"
							name="article"
							multiple
							onChange={handleFileChange}
							className="border p-2 rounded"
						/>
					</div>
					<div className="flex flex-col mb-4">
						<label htmlFor="video" className="font-semibold">
							Upload Video
						</label>
						<input
							type="file"
							id="video"
							name="video"
							multiple
							onChange={handleFileChange}
							className="border p-2 rounded"
						/>
					</div>
					<div className="flex flex-col mb-4">
						<label htmlFor="audio" className="font-semibold">
							Upload Audio
						</label>
						<input
							type="file"
							id="audio"
							name="audio"
							multiple
							onChange={handleFileChange}
							className="border p-2 rounded"
						/>
					</div>
					<div className="flex justify-end">
						<button
							// onClick={handleSave}
							type="submit"
							disabled={savingChapter}
							className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
						>
							{savingChapter ? "Saving..." : "Save"}
						</button>
						<button
							onClick={onClose}
							type="button"
							disabled={savingChapter}
							className="bg-red-500 text-white px-4 py-2 rounded"
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ChapterModal;
