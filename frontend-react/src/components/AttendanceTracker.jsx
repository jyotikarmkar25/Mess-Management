import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const AttendanceTracker = () => {
    const { token, user } = useAuth();
    const meals = ['Breakfast', 'Lunch', 'Snacks', 'Dinner'];
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_URL = 'http://localhost:5000/api/attendance';

    useEffect(() => {
        const fetchAttendance = async () => {
            if (!token) return;
            try {
                const response = await axios.get(`${API_URL}/my-attendance`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // Assuming backend returns attendance for today
                setAttendance(response.data.map(log => log.meal));
            } catch (error) {
                console.error("Error fetching attendance:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAttendance();
    }, [token]);

    const toggleStatus = async (meal) => {
        if (!token) return;
        
        if (attendance.includes(meal)) {
            alert("You have already marked attendance for this meal today.");
            return;
        }

        try {
            await axios.post(`${API_URL}/mark`, { meal }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAttendance([...attendance, meal]);
            alert("Attendance marked successfully!");
        } catch (error) {
            alert("Error marking attendance: " + (error.response?.data?.message || error.message));
        }
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
