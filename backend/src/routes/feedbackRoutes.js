const express = require("express");
const router = express.Router();

// function import

const {
submitFeedback,
getAllFeedbacks,
getFeedbackById,
deleteFeedback
} = require('../controllers/feedbackController');

// routers define
router.post('/', submitFeedback);
router.get('/', getAllFeedbacks);
router.get('/:id', getFeedbackById);
router.delete('/:id',deleteFeedback); 

// router ko export ka reye hai 
module.export = router