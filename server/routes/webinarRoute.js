// routes/webinar.js
const express = require("express");
const router = express.Router();
const webinarController = require("../controllers/courseController");
const { protect } = require("../middleware/authMiddleware");

router.post("/create-webinar", protect, webinarController.createWebinar);
router.get("/get-all-webinar", protect, webinarController.getAllWebinar);
router.get("/:id", protect, webinarController.getSingleWebinar);
router.put("/:id", protect, webinarController.updateWebinar);
router.delete("/:id", protect, webinarController.deleteWebinar);

module.exports = router;
