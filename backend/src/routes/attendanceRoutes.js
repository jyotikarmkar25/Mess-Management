const express = require("express");
const router = express.Router();

// function import from controller
const {
    markAttendance,
    getAttendance,
    getStudentAttendance
} = require('../controllers/attendanceController')

// routers define

router.post('/mark', markAttendance);
router.get('/all', getAttendance);
router.get('/student/:studentId', getStudentAttendance);

// router export 
module.exports = router;