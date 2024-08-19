const express = require("express");
const router = express.Router();
const enrollmentController = require("../controllers/courseController");
const { protect } = require("../middleware/authMiddleware");

router.post("/enroll", protect, enrollmentController.enrollCourse);

router.get(
  "/get-all-enrollments",
  protect,
  enrollmentController.getAllEnrollments
);

router.get("/user/:userId", protect, enrollmentController.getUserEnrollment);

router.get("/:id", protect, enrollmentController.getEnrollmentById);

router.put("/:id", protect, enrollmentController.updateEnrollment);

router.delete("/:id", protect, enrollmentController.deleteEnrollment);

router.get(
  "/check/:userId/:courseId",
  protect,
  enrollmentController.isUserEnrolled
);

module.exports = router;
