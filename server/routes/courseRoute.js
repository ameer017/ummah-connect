const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/multerConfig");

router.get("/get-all-course", protect, courseController.getAllCourses);

router.get("/statistics", protect, courseController.getCourseStatistics);

router.get("/:id", protect, courseController.getCourseById);

router.post(
  "/create-course",
  protect,
  upload.fields([
    { name: "articles", maxCount: 10 },
    { name: "videos", maxCount: 5 },
    { name: "audios", maxCount: 5 },
  ]),
  courseController.createCourse
);

router.put(
  "/:id",
  protect,
  upload.fields([
    { name: "articles", maxCount: 10 },
    { name: "videos", maxCount: 5 },
    { name: "audios", maxCount: 5 },
  ]),
  courseController.updateCourse
);

router.delete("/:id", protect, courseController.deleteCourse);

router.get("/search", protect, courseController.searchCourses);

router.get(
  "/instructor/:instructorId",
  protect,
  courseController.getCoursesByInstructor
);

router.post("/:id/reviews", protect, courseController.addReview);

module.exports = router;
