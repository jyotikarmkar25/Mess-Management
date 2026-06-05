import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const FeedbackForm = () => {
    const { user } = useAuth();
    const [rating, setRating] = useState(4);
    const [meal, setMeal] = useState('Breakfast');
    const [comments, setComments] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user) {
            alert('You must be logged in to submit feedback.');
            return;
        }
        
        setSubmitting(true);
        // Mock submission
        setTimeout(() => {
            const feedbacks = JSON.parse(localStorage.getItem('mockFeedbacks') || '[]');
            feedbacks.push({
                uid: user.uid,
                userName: user.name || user.email,
                meal,
                rating,
                comments,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem('mockFeedbacks', JSON.stringify(feedbacks));
            
            alert('Thank you for your feedback! It has been submitted successfully.');
            setComments('');
            setRating(4);
            setSubmitting(false);
        }, 500);
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
                        <div className="stars" style={{ display: 'flex', gap: '8px', fontSize: '1.5rem', margin: '0.5rem 0' }}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <i 
                                    key={star}
                                    className={`${star <= rating ? 'fas' : 'far'} fa-star`}
                                    onClick={() => setRating(star)}
                                    style={{ cursor: 'pointer', color: star <= rating ? 'var(--warning)' : 'var(--text-muted)' }}
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
                            rows="4"
                        ></textarea>
                    </div>
                    <button type="submit" className="submit-btn" disabled={submitting}>
                        {submitting ? 'Submitting...' : 'Submit Feedback'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FeedbackForm;
