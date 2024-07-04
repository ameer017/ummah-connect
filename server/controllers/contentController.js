const asyncHandler = require("express-async-handler");
const Content = require("../models/contentModel");
const Category = require("../models/categoryModel");

// Create new content
exports.createContent = async (req, res) => {
	try {
		const { title, type, description, topics, fileUrl, categoryId } = req.body;
		// console.log(categoryId)
		const submittedBy = req.user._id;

		const newContent = new Content({
			title,
			category: categoryId,
			type: type.toLowerCase(),
			fileUrl,
			description,
			topics,
			submittedBy,
		});

		const savedContent = await newContent.save();

		const category = await Category.findOne({ type });
		if (!category) {
			return res.status(404).json({ message: "Category not found" });
		}

		// Push content ID to category's contents array
		category.contents.push(newContent._id);
		await category.save();

		res.status(201).json(savedContent);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Update existing content
exports.updateContentById = async (req, res) => {
	try {
		const { title, type, description, topics, category, status } = req.body;

		const updatedContent = await Content.findByIdAndUpdate(
			req.params.id,
			{ title, type, description, topics, category, status },
			{ new: true }
		)
			.populate("category")
			.populate("submittedBy");

		if (!updatedContent) {
			return res.status(404).json({ message: "Content not found" });
		}

		res.status(200).json(updatedContent);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Delete content
exports.deleteContent = async (req, res) => {
	try {
		const { id } = req.params;

		// Find and delete content
		const deletedContent = await Content.findByIdAndDelete(id);
		if (!deletedContent) {
			return res.status(404).json({ message: "Content not found" });
		}

		res.status(200).json({ message: "Content deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Approve content
exports.approveContent = async (req, res) => {
	try {
		const { id } = req.params;

		// Find and approve content
		const content = await Content.findById(id);
		if (!content) {
			return res.status(404).json({ message: "Content not found" });
		}

		content.status = "approved";
		const approvedContent = await content.save();
		res.status(200).json(approvedContent);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Reject content
exports.rejectContent = async (req, res) => {
	try {
		const { id } = req.params;

		// Find and reject content
		const content = await Content.findById(id);
		if (!content) {
			return res.status(404).json({ message: "Content not found" });
		}

		content.status = "rejected";
		const rejectedContent = await content.save();
		res.status(200).json(rejectedContent);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Fetch all content
exports.getAllContent = async (req, res) => {
	try {
		const contents = await Content.find()
			.populate("category")
			.populate("submittedBy");
		res.status(200).json(contents);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Fetch content by ID
exports.getContentById = async (req, res) => {
	try {
		const { id } = req.params;
		const content = await Content.findById(id)
			.populate("category")
			.populate("submittedBy");

		if (!content) {
			return res.status(404).json({ message: "Content not found" });
		}

		res.status(200).json(content);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Fetch content by category
exports.getContentByCategory = async (req, res) => {
	try {
		const { categoryId } = req.params;
		const contents = await Content.find({ category: categoryId })
			.populate("category")
			.populate("submittedBy");

			// console.log(contents)
		// if (!contents.length) {
		// 	return res
		// 		.status(404)
		// 		.json({ message: "No content found for this category" });
		// }

		res.status(200).json(contents);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.createCategory = async (req, res) => {
	try {
		const { type, description } = req.body;

		const newCategory = new Category({ type, description });
		const savedCategory = await newCategory.save();

		res.status(201).json(savedCategory);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.getCategories = async (req, res) => {
	try {
		const categories = await Category.find();
		res.status(200).json(categories);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
