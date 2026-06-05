const Feedback = require("../models/feedback");


// 1. Submit Feedback (Student)
const submitFeedback = async (req, res) => {
  try {
    const { message, rating } = req.body;

    const feedback = await Feedback.create({
      user: req.user.id,
      message,
      rating,
    });

    res.status(201).json({
      message: "Feedback submitted successfully",
      feedback,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// 2. Get All Feedbacks (Admin)
const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate("user", "name email");

    res.status(200).json({
      message: "All feedbacks fetched successfully",
      feedbacks,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// 3. Get Feedback By ID
const getFeedbackById = async (req, res) => {
  try {
    const { id } = req.params;

    const feedback = await Feedback.findById(id)
      .populate("user", "name email");

    if (!feedback) {
      return res.status(404).json({
        message: "Feedback not found",
      });
    }

    res.status(200).json({
      message: "Feedback fetched successfully",
      feedback,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// 4. Delete Feedback (Admin)
const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;

    const feedback = await Feedback.findByIdAndDelete(id);

    if (!feedback) {
      return res.status(404).json({
        message: "Feedback not found",
      });
    }

    res.status(200).json({
      message: "Feedback deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Export
module.exports = {
  submitFeedback,
  getAllFeedbacks,
  getFeedbackById,
  deleteFeedback,
};