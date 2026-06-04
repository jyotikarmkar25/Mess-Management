import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, query, where, onSnapshot, serverTimestamp } from 'firebase/firestore';

const AttendanceTracker = () => {
    const meals = ['Breakfast', 'Lunch', 'Snacks', 'Dinner'];
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!auth.currentUser) return;

        const today = new Date();
        today.setHours(0,0,0,0);

        const q = query(
            collection(db, 'attendance'),
            where('uid', '==', auth.currentUser.uid),
            where('timestamp', '>=', today)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => doc.data().meal);
            setAttendance(data);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const toggleStatus = async (meal) => {
        if (!auth.currentUser) return;
        
        if (attendance.includes(meal)) {
            alert("You have already marked attendance for this meal today.");
            return;
        }

        try {
            await addDoc(collection(db, 'attendance'), {
                uid: auth.currentUser.uid,
                userName: auth.currentUser.displayName || auth.currentUser.email,
                meal: meal,
                status: 'present',
                timestamp: serverTimestamp()
            });
        } catch (error) {
            alert("Error marking attendance: " + error.message);
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
