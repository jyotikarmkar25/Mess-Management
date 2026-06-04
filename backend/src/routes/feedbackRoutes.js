const express = require("express");
const router = express.Router();

const {
  submitFeedback,
  getAllFeedbacks,
  getFeedbackById,
  deleteFeedback,
} = require("../controllers/feedbackController");

const protect = require("../middleware/authMiddleware");


// 🟢 Student: Submit Feedback
router.post("/submit", protect, submitFeedback);


// 🔐 Admin: Get All Feedbacks
router.get("/all", protect, getAllFeedbacks);


// 🔐 Admin: Get Feedback By ID
router.get("/:id", protect, getFeedbackById);


// 🔐 Admin: Delete Feedback
router.delete("/:id", protect, deleteFeedback);


module.exports = router;