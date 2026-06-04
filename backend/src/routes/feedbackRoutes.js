const express = require("express");
const router = express.Router();

const {
  submitFeedback,
  getAllFeedbacks,
  getFeedbackById,
  deleteFeedback,
} = require("../controllers/feedbackController");

const { protect, admin } = require("../middleware/authMiddleware");


// Student: Submit Feedback
router.post("/", protect, submitFeedback);

// Admin: Get All Feedbacks
router.get("/", protect, admin, getAllFeedbacks);

// Admin: Get Feedback By ID
router.get("/:id", protect, admin, getFeedbackById);

// Admin: Delete Feedback
router.delete("/:id", protect, admin, deleteFeedback);

module.exports = router;