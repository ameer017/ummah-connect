const express = require("express");
const route = express.Router();
// const contentController = require("../controllers/contentController");
const { protect } = require("../middleware/authMiddleware");
const { createCertificate, getUserCertificatePerCourse, prepareCertificateData, verifyCertificate, getAllUserCertificates } = require("../controllers/certificateController");
// createCertificate,
// 	prepareCertificateData,
// 	verifyCertificate,
// Create new content
route.get("/", protect, getAllUserCertificates);
route.get("/verify", verifyCertificate);
route.get("/:courseId", protect, getUserCertificatePerCourse);
route.post("/:courseId/create", protect, createCertificate);
route.post("/:courseId/prepare", protect, prepareCertificateData);

module.exports = route;
