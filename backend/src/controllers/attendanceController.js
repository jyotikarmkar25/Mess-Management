const Attendance = require("../models/attendance");


// 1. Mark Attendance (Student)
const markAttendance = async (req, res) => {
  try {
    const { date, mealType, status } = req.body;

    const attendance = await Attendance.create({
      user: req.user.id,
      date,
      mealType,
      status,
    });

    res.status(201).json({
      message: "Attendance marked successfully",
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// 2. Get All Attendance (Admin)
const getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .populate("user", "name email");

    res.status(200).json({
      message: "All attendance fetched successfully",
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// 3. Get Student Attendance
const getStudentAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find({
      user: req.user.id,
    });

    res.status(200).json({
      message: "Student attendance fetched successfully",
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Export
module.exports = {
  markAttendance,
  getAttendance,
  getStudentAttendance,
};