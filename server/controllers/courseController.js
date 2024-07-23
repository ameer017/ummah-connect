const Course = require("../models/courseModel");
const Enrollment = require("../models/enrollmentModel");
const Progress = require("../models/progressModel");
const Webinar = require("../models/webinarModel");

const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

exports.uploadFilesToCloudinary = async (files) => {
  const uploadedFiles = {};

  for (const [key, fileArray] of Object.entries(files)) {
    uploadedFiles[key] = [];
    for (const file of fileArray) {
      const result = await cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            return;
          }
          uploadedFiles[key].push(result.secure_url);
        }
      );
      file.stream.pipe(result);
    }
  }
  return uploadedFiles;
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createCourse = async (req, res) => {
  const { title, description, instructor, duration, chapters, coverImage } =
    req.body;

  const files = req.files;
  const uploadedFiles = await exports.uploadFilesToCloudinary(files);

  const course = new Course({
    title,
    description,
    instructor,
    duration,
    coverImage,
    content: {
      chapters: JSON.parse(chapters),
      articles: uploadedFiles.articles || [],
      videos: uploadedFiles.videos || [],
      audios: uploadedFiles.audios || [],
    },
  });

  try {
    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Update basic course details
    course.title = req.body.title || course.title;
    course.description = req.body.description || course.description;
    course.instructor = req.body.instructor || course.instructor;
    course.duration = req.body.duration || course.duration;
    course.coverImage = req.body.coverImage || course.coverImage;

    // Update content
    if (req.body.chapters) {
      course.content.chapters = JSON.parse(req.body.chapters);
    }
    if (req.files.articles) {
      course.content.articles = req.files.articles.map((file) => file.path);
    }
    if (req.files.videos) {
      course.content.videos = req.files.videos.map((file) => file.path);
    }
    if (req.files.audios) {
      course.content.audios = req.files.audios.map((file) => file.path);
    }

    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse)
      return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.searchCourses = async (req, res) => {
  const { query } = req.query;
  try {
    const courses = await Course.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCoursesByInstructor = async (req, res) => {
  const { instructorId } = req.params;
  try {
    const courses = await Course.find({ instructor: instructorId });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCourseStatistics = async (req, res) => {
  try {
    const totalCourses = await Course.countDocuments();
    res.json({ totalCourses });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addReview = async (req, res) => {
  const { userId, rating, comment } = req.body;
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    course.reviews.push({ userId, rating, comment });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.enrollCourse = async (req, res) => {
  const enrollment = new Enrollment({
    userId: req.body.userId,
    courseId: req.body.courseId,
  });

  try {
    const newEnrollment = await enrollment.save();
    res.status(201).json(newEnrollment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find().populate("userId courseId");
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserEnrollment = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      userId: req.params.userId,
    }).populate("courseId");
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getEnrollmentById = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id).populate(
      "userId courseId"
    );
    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }
    res.json(enrollment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    enrollment.userId = req.body.userId || enrollment.userId;
    enrollment.courseId = req.body.courseId || enrollment.courseId;

    const updatedEnrollment = await enrollment.save();
    res.json(updatedEnrollment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    await enrollment.remove();
    res.json({ message: "Enrollment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.isUserEnrolled = async (req, res) => {
  try {
    const enrollment = await Enrollment.findOne({
      userId: req.params.userId,
      courseId: req.params.courseId,
    });

    if (enrollment) {
      res.json({ enrolled: true });
    } else {
      res.json({ enrolled: false });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addProgress = async (req, res) => {
  const progress = new Progress({
    userId: req.body.userId,
    courseId: req.body.courseId,
    progress: 0,
    completed: false,
  });

  try {
    const newProgress = await progress.save();
    res.status(201).json(newProgress);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getUserProgress = async (req, res) => {
  try {
    const progress = await Progress.findOne({
      userId: req.params.userId,
      courseId: req.params.courseId,
    });
    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllUserProgress = async (req, res) => {
  try {
    const progress = await Progress.find({
      userId: req.params.userId,
    }).populate("courseId");
    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.generateCertificate = async (req, res) => {
  try {
    const progress = await Progress.findOneAndUpdate(
      {
        userId: req.params.userId,
        courseId: req.params.courseId,
        completed: true,
      },
      { certificateUrl: req.body.certificateUrl },
      { new: true }
    );
    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProgress = async (req, res) => {
  try {
    await Progress.findOneAndDelete({
      userId: req.params.userId,
      courseId: req.params.courseId,
    });
    res.json({ message: "Progress deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllCourseProgress = async (req, res) => {
  try {
    const progress = await Progress.find({
      courseId: req.params.courseId,
    }).populate("userId");
    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProgress = async (req, res) => {
  try {
    const progress = await Progress.findOneAndUpdate(
      { userId: req.params.userId, courseId: req.params.courseId },
      { progress: req.body.progress, completed: req.body.completed },
      { new: true }
    );
    if (!progress)
      return res.status(404).json({ message: "Progress not found" });
    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllWebinar = async (req, res) => {
  try {
    const webinars = await Webinar.find();
    res.json(webinars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSingleWebinar = async (req, res) => {
  try {
    const webinar = await Webinar.findById(req.params.id);
    res.json(webinar);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createWebinar = async (req, res) => {
  const webinar = new Webinar({
    title: req.body.title,
    description: req.body.description,
    instructor: req.body.instructor,
    date: req.body.date,
    url: req.body.url,
  });

  try {
    const newWebinar = await webinar.save();
    res.status(201).json(newWebinar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateWebinar = async (req, res) => {
  try {
    const webinar = await Webinar.findById(req.params.id);
    if (!webinar) {
      return res.status(404).json({ message: "Webinar not found" });
    }

    webinar.title = req.body.title || webinar.title;
    webinar.description = req.body.description || webinar.description;
    webinar.instructor = req.body.instructor || webinar.instructor;
    webinar.date = req.body.date || webinar.date;
    webinar.url = req.body.url || webinar.url;

    const updatedWebinar = await webinar.save();
    res.json(updatedWebinar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteWebinar = async (req, res) => {
  try {
    const webinar = await Webinar.findById(req.params.id);
    if (!webinar) {
      return res.status(404).json({ message: "Webinar not found" });
    }

    await webinar.remove();
    res.json({ message: "Webinar deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
