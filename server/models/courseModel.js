const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		content: { type: String, required: true },
		article: String,
		video: String,
		audio: String,
		completed: { type: Boolean, default: false },
		completedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
	},
	{ _id: false }
);

const courseSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		instructor: { type: Schema.Types.ObjectId, ref: "User" },
		duration: { type: Number, required: true },
		price: { type: Number, required: true },
		coverImage: {
			type: String,
			required: true,
			default:
				"https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
		},

		chapters: [chapterSchema],
		purchasedBy: [
			{
				user: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
				},
				amount: Number,
				date: {
					type: Date,
					default: Date.now, // Optional: Set a default value to the current date and time
				},
				completedCourseAt: {
					type: Date,
					default: null,
				},
			},
		],
	},
	{
		timestamps: true,
		minimize: false,
	}
);

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;

// const mongoose = require("mongoose");

// const { Schema, model } = mongoose;

// const chapterSchema = new Schema({
// 	videoUrl: String,
// 	title: String,
// 	// position: Number,
// 	// videoSection: String,
// 	description: String,
// 	isPublished: Boolean,
// 	// isFree: Boolean,
// 	attachments: [
// 		{
// 			name: String,
// 			url: String,
// 		},
// 	],
// 	userProgress: [
// 		{
// 			userId: {
// 				type: Schema.Types.ObjectId,
// 				ref: "User",
// 			},
// 			isCompleted: Boolean,
// 		},
// 	],
// 	// videoLength: Number,
// 	// videoPlayer: String,
// 	// links: [linkSchema],
// 	// suggestion: String,
// 	questions: [commentSchema],
// });

// const courseSchema = new Schema(
// 	{
// 		title: {
// 			type: String,
// 			required: true,
// 		},
// 		description: {
// 			type: String,
// 			// required: true,
// 		},
// 		instructor: {
// 			type: Schema.Types.ObjectId,
// 			ref: "User",
// 		},
// 		isPublished: {
// 			type: Boolean,
// 			default: false,
// 		},
// 		price: {
// 			type: Number,
// 			default: 0,
// 			// required: true,
// 		},
// 		paymentMethod: {
// 			type: String,
// 			enum: ["card", "crypto", "both", "none"],
// 		},
// 		classroom: {
// 			type: Schema.Types.ObjectId,
// 			ref: "Classroom",
// 		},
// 		// estimatePrice: {
// 		// 	type: String,
// 		// },
// 		// courseImage: {
// 		// 	type: String,
// 		// },
// 		coverImage: {
// 			type: String,
// 			required: true,
// 			default:
// 				"https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
// 		},
// 		// previewVideoUrl: {
// 		// 	type: String,
// 		// },
// 		categoryId: {
// 			type: Schema.Types.ObjectId,
// 			ref: "Category",
// 		},
// 		// reviews: [reviewSchema],
// 		chapters: [chapterSchema],
// 		// ratings: {
// 		// 	type: Number,
// 		// 	default: 0,
// 		// },
// 		purchasedBy: [
// 			{
// 				user: {
// 					type: Schema.Types.ObjectId,
// 					ref: "User",
// 				},
// 				amount: Number,
// 				date: {
// 					type: Date,
// 					default: Date.now, // Optional: Set a default value to the current date and time
// 				},
// 				completedCourseAt: {
// 					type: Date,
// 					default: null,
// 				},
// 			},
// 		],
// 	},
// 	{ timestamps: true }
// );

// module.exports = model("Course", courseSchema);
