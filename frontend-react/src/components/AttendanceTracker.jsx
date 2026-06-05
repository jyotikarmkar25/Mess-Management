import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const AttendanceTracker = () => {
    const { user } = useAuth();
    const meals = ['Breakfast', 'Lunch', 'Snacks', 'Dinner'];
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        // Mock fetching attendance from localStorage
        const storedAttendance = localStorage.getItem(`attendance_${user.uid}`);
        if (storedAttendance) {
            setAttendance(JSON.parse(storedAttendance));
        }
        setLoading(false);
    }, [user]);

    const toggleStatus = (meal) => {
        if (!user) return;
        
        if (attendance.includes(meal)) {
            alert("You have already marked attendance for this meal today.");
            return;
        }

        const newAttendance = [...attendance, meal];
        setAttendance(newAttendance);
        localStorage.setItem(`attendance_${user.uid}`, JSON.stringify(newAttendance));
    };

    if (loading) return <div>Loading traces...</div>;

    return (
        <div id="attendance" className="content-section active">
            <div className="attendance-container">
                <div className="section-header" style={{ marginBottom: '1.5rem' }}>
                    <h2>Meal Tracking</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Monitor and mark your daily meal consumption traces.</p>
                </div>
                <div id="attendance-list" className="attendance-card">
                    <div className="table-header" style={{ display: 'flex', padding: '0.75rem 1.5rem', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                        <div style={{ flex: 1 }}>Meal Trace</div>
                        <div style={{ width: '120px', textAlign: 'center' }}>Action</div>
                    </div>
                    {meals.map((meal, index) => (
                        <div key={index} className="meal-row" style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ flex: 1, fontWeight: '600', fontSize: '0.9rem' }}>{meal}</div>
                            <div style={{ width: '120px', textAlign: 'center' }}>
                                <button 
                                    className={`btn-check ${attendance.includes(meal) ? '' : 'outline'}`}
                                    onClick={() => toggleStatus(meal)}
                                    style={{ width: '100%' }}
                                    disabled={attendance.includes(meal)}
                                >
                                    {attendance.includes(meal) ? 'Present' : 'Mark Present'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AttendanceTracker;
