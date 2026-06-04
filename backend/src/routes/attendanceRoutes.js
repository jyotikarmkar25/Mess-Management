const express = require("express");
const router = express.Router();

const {
  markAttendance,
  getAttendance,
  getStudentAttendance,
} = require("../controllers/attendanceController");

const protect = require("../middleware/authMiddleware");


// 1. Student: Mark Attendance
router.post("/mark", protect, markAttendance);


// 2. Admin: Get All Attendance
router.get("/all", protect, getAttendance);


// 3. Student: Get Own Attendance
router.get("/my", protect, getStudentAttendance);


module.exports = router;