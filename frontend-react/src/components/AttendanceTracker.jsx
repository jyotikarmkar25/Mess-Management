import React, { useState } from 'react';

const initialAttendance = [
    { meal: 'Breakfast', status: 'present' },
    { meal: 'Lunch', status: 'present' },
    { meal: 'Snacks', status: 'absent' },
    { meal: 'Dinner', status: 'absent' }
];

const AttendanceTracker = () => {
    const [attendance, setAttendance] = useState(initialAttendance);

    const toggleStatus = (index) => {
        const newAttendance = [...attendance];
        newAttendance[index].status = newAttendance[index].status === 'present' ? 'absent' : 'present';
        setAttendance(newAttendance);
    };

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
                        <div style={{ width: '100px', textAlign: 'center' }}>Status</div>
                    </div>
                    {attendance.map((record, index) => (
                        <div key={index} className="meal-row" style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ flex: 1, fontWeight: '600', fontSize: '0.9rem' }}>{record.meal}</div>
                            <div style={{ width: '100px', textAlign: 'center' }}>
                                <button 
                                    className={`btn-check ${record.status === 'absent' ? 'outline' : ''}`}
                                    onClick={() => toggleStatus(index)}
                                    style={{ width: '100%' }}
                                >
                                    {record.status}
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