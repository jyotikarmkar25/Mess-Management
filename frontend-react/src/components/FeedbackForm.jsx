import React, { useState } from 'react';

const FeedbackForm = () => {
    const [rating, setRating] = useState(4);
    const [meal, setMeal] = useState('Breakfast');
    const [comments, setComments] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for your feedback! It has been submitted successfully.');
        setComments('');
        setRating(4);
    };

    return (
        <div id="feedback" className="content-section active">
            <div className="feedback-container">
                <h2>Meal Feedback</h2>
                <form className="feedback-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Select Meal</label>
                        <select value={meal} onChange={(e) => setMeal(e.target.value)}>
                            <option>Breakfast</option>
                            <option>Lunch</option>
                            <option>Snacks</option>
                            <option>Dinner</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Rating</label>
                        <div className="stars">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <i 
                                    key={star}
                                    className={`${star <= rating ? 'fas' : 'far'} fa-star`}
                                    onClick={() => setRating(star)}
                                    style={{ cursor: 'pointer' }}
                                ></i>
                            ))}
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Comments</label>
                        <textarea 
                            placeholder="How was the food today?"
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                        ></textarea>
                    </div>
                    <button type="submit" className="submit-btn">Submit Feedback</button>
                </form>
            </div>
        </div>
    );
};

export default FeedbackForm;