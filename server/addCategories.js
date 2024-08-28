// import Category = require("./models/categoryModel");
// Import necessary libraries
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// Connect to MongoDB
// mongoose.connect("mongodb+srv://yusufroqib:Afro12309@cluster0.w7cr8us.mongodb.net/ummahConnect");
mongoose.connect(process.env.MONGO_URI, {
	serverSelectionTimeoutMS: 30000,
});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
	console.log("Connected to MongoDB");
	addCategories();
});
const Category = require("./models/categoryModel");

async function addCategories() {
	try {
		// Create categories
		const categories = [
			{
				type: "Article",
				description: "Readable text contents",
			},
			{
				type: "Audio",
				description: "Audio contents that can be listened to",
			},
			{
				type: "Video",
				description: "Video contents that can be watched and listened to",
			},
		];

		// Save categories to database
		await Category.insertMany(categories);

		console.log("Categories added successfully.");
	} catch (error) {
		console.error("Error adding categories:", error);
	}
}
