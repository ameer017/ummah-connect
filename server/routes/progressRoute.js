const express = require("express");
const router = express.Router();
const progressController = require("../controllers/courseController");


router.post("/add-progress", progressController.addProgress);


router.put("/:userId/:courseId", progressController.updateProgress);


router.get("/:userId/:courseId", progressController.getUserProgress);


router.get("/user/:userId", progressController.getAllUserProgress);


router.put(
  "/:userId/:courseId/certificate",
  progressController.generateCertificate
);


router.delete("/:userId/:courseId", progressController.deleteProgress);


router.get("/course/:courseId", progressController.getAllCourseProgress);

module.exports = router;
