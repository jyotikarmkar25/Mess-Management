const express = require("express");
const router = express.Router();

const {
  markAttendance,
  getAttendance,
  getStudentAttendance,
} = require("../controllers/attendanceController");

// Middleware (JWT Auth)
const { protect, admin } = require("../middleware/authMiddleware");


// Student Attendance Mark
router.post("/mark", protect, markAttendance);

// Student Apni Attendance Dekhe
router.get("/my-attendance", protect, getStudentAttendance);

// Admin Sabhi Students Ki Attendance Dekhe
router.get("/", protect, admin, getAttendance);

module.exports = router;