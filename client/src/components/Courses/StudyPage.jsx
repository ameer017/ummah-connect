import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FiDownload, FiCheck } from "react-icons/fi";
import axios from "axios";
import { CourseProgress } from "../ui/CourseProgress";

const URL = import.meta.env.VITE_APP_BACKEND_URL;

const StudyPage = () => {
	const { courseId } = useParams();
	const [course, setCourse] = useState(null);
	const [currentChapter, setCurrentChapter] = useState(0);
	const [progress, setProgress] = useState(0);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchCourseData = async () => {
			try {
				// Replace with your API call
				// enrolled-courses
				const config = {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				};
				const response = await axios.get(
					`${URL}/courses/enrolled-courses/all`,
					config
				);

				console.log(response.data);
                console.log(courseId)
				// const response = await fetch(`/api/courses/${courseId}`);
				const courses = response.data;
				const data = courses.find((course) => course._id === courseId);
				setCourse(data);

				// Calculate initial progress
				const completedChapters = data?.chapters?.filter(
					(chapter) => chapter.completed
				).length;
				setProgress((completedChapters / data?.chapters?.length) * 100);

				setLoading(false);
			} catch (error) {
				console.error("Error fetching course data:", error);
				setLoading(false);
			}
		};

		fetchCourseData();
	}, [courseId]);

	const handleChapterComplete = async () => {
		try {
			// Mark chapter as complete in the backend
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			};
			const response = await axios.post(
				`${URL}/courses/${courseId}/chapters/${currentChapter}/complete`,
				config
			);
			console.log(response.data);
			// Update local state
			const updatedCourse = { ...course };
			updatedCourse.chapters[currentChapter].completed = true;
			setCourse(updatedCourse);

			// Update progress
			const completedChapters = updatedCourse.chapters.filter(
				(chapter) => chapter.completed
			).length;
			setProgress((completedChapters / updatedCourse.chapters.length) * 100);
		} catch (error) {
			console.error("Error marking chapter as complete:", error);
		}
	};

	const handleVideoEnd = () => {
		if (!course.chapters[currentChapter].completed) {
			handleChapterComplete();
		}
	};

	// const handleDownload = (fileUrl, fileName) => {
	// 	// Implement file download logic here
	// 	console.log(`Downloading ${fileName} from ${fileUrl}`);
	// };

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!course) {
		return <div>Course not found or not Enrolled for the course</div>;
	}

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-4">{course.title}</h1>
			{/* <Progress value={progress} className="mb-4 " /> */}
            <CourseProgress variant="success" value={progress} />


			<Tabs
            className="mt-4"
				defaultValue={currentChapter.toString()}
				onValueChange={(value) => setCurrentChapter(parseInt(value))}
			>
				<TabsList className="mb-4">
					{course?.chapters?.map((chapter, index) => (
						<TabsTrigger key={index} value={index.toString()}>
							Chapter {index + 1}
							{chapter.completed && <FiCheck className="ml-2" />}
						</TabsTrigger>
					))}
				</TabsList>

				{course?.chapters?.map((chapter, index) => (
					<TabsContent key={index} value={index.toString()}>
						<Card>
							<CardHeader>
								<CardTitle>{chapter.title}</CardTitle>
							</CardHeader>
							<CardContent>
								<video
									src={chapter.video}
									controls
									className="w-full mb-4"
									onEnded={handleVideoEnd}
								/>

								{chapter.content && (
									<div
										className="prose mb-4"
										dangerouslySetInnerHTML={{ __html: chapter.content }}
									/>
								)}

								{chapter.article && (
									<a href={chapter.article}>
										<Button
											// onClick={() =>
											// 	handleDownload(
											// 		chapter.audio,
											// 		`${chapter.title} - Audio.mp3`
											// 	)
											// }
											className="mr-2 mb-2"
										>
											<FiDownload className="mr-2" /> Download Chapter Article
										</Button>
									</a>
									// <Button
									// 	onClick={() =>
									// 		handleDownload(
									// 			chapter.article,
									// 			`${chapter.title} - Article.pdf`
									// 		)
									// 	}
									// 	className="mr-2 mb-2"
									// >
									// 	<FiDownload className="mr-2" /> Download Article
									// </Button>
								)}

								{chapter.audio && (
									<a href={chapter.audio}>
										<Button
											// onClick={() =>
											// 	handleDownload(
											// 		chapter.audio,
											// 		`${chapter.title} - Audio.mp3`
											// 	)
											// }
											className="mr-2 mb-2"
										>
											<FiDownload className="mr-2" /> Download Chapter Audio
										</Button>
									</a>
								)}

								{!chapter.completed && (
									<Button onClick={handleChapterComplete}>
										Mark as Complete
									</Button>
								)}
							</CardContent>
						</Card>
					</TabsContent>
				))}
			</Tabs>
		</div>
	);
};

export default StudyPage;
