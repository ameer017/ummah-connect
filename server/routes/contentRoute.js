const express = require("express");
const route = express.Router();
const contentController = require("../controllers/contentController");

// Create new content
route.post("/create-content", contentController.createContent);

// Update existing content
route.put("/content/:id", contentController.updateContentById);

// Delete content
route.delete("/content/:id", contentController.deleteContent);

// Approve content
route.put("/content/:id/approve", contentController.approveContent);

// Reject content
route.put("/content/:id/reject", contentController.rejectContent);

// Fetch all content
route.get("/contents", contentController.getAllContent);

// Fetch content by ID
route.get("/content/:id", contentController.getContentById);

// Fetch content by category
route.get(
  "/content/category/:categoryId",
  contentController.getContentByCategory
);

module.exports = route;
