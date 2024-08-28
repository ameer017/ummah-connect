const express = require("express");
const route = express.Router();
const contentController = require("../controllers/contentController");
const { protect } = require("../middleware/authMiddleware");

// Create new content
route.post("/create-content", protect, contentController.createContent);

// Update existing content
route.put("/content/:id", protect, contentController.updateContentById);

// Delete content
route.delete("/content/:id", protect, contentController.deleteContent);

// Approve content
route.put("/content/:id/approve", protect, contentController.approveContent);

// Reject content
route.put("/content/:id/reject", protect, contentController.rejectContent);

// Fetch all content
route.get("/contents", contentController.getAllContent);

// Fetch content by ID
route.get("/content/:id", protect, contentController.getContentById);

// Fetch content by category
route.get(
  "/category/:categoryId", protect,
  contentController.getContentByCategory
);
route.post("/create-category", protect, contentController.createCategory);

route.get("/categories", protect, contentController.getCategories);

module.exports = route;
