import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import '../styles/AdminDashboard.css';

const AdminDashboardPage = () => {
    const { user, token, logout, changePassword } = useAuth();
    const [activeSection, setActiveSection] = useState('summary');
    const [menuData, setMenuData] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [attendanceLogs, setAttendanceLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const [menuForm, setMenuForm] = useState({ day: 'Monday', breakfast: '', lunch: '', snacks: '', dinner: '' });
    const [passForm, setPassForm] = useState({ oldPassword: '', newPassword: '' });

    const API_BASE = 'http://localhost:5000/api';

    useEffect(() => {
        if (!token) return;

        const fetchData = async () => {
            try {
                // Fetch All Menus
                const menuRes = await axios.get(`${API_BASE}/menus/all`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMenuData(menuRes.data);

                // Fetch Feedbacks
                const feedbackRes = await axios.get(`${API_BASE}/feedbacks/all`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setFeedbacks(feedbackRes.data);

                // Fetch Attendance (Today)
                const attendanceRes = await axios.get(`${API_BASE}/attendance/all`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setAttendanceLogs(attendanceRes.data);

                setLoading(false);
            } catch (error) {
                console.error("Error fetching admin data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    const handleSaveMenu = async () => {
        try {
            const existing = menuData.find(m => m.day === menuForm.day);
            if (existing) {
                await axios.put(`${API_BASE}/menus/update/${existing._id}`, menuForm, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await axios.post(`${API_BASE}/menus/create`, menuForm, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            alert("Menu Saved Successfully");
            // Refresh data
            const res = await axios.get(`${API_BASE}/menus/all`, { headers: { Authorization: `Bearer ${token}` } });
            setMenuData(res.data);
        } catch (err) {
            alert("Error saving menu: " + (err.response?.data?.message || err.message));
        }
    };

    const handleUpdatePassword = async () => {
        try {
            await changePassword(passForm.oldPassword, passForm.newPassword);
            alert("Password Updated Successfully");
            setPassForm({ oldPassword: '', newPassword: '' });
        } catch (err) {
            alert("Error: " + err.message);
        }
    };

    const renderSection = () => {
        switch (activeSection) {
            case 'summary':
                return (
                    <section className="admin-card">
                        <h2>Dashboard Summary</h2>
                        <div className="admin-stats">
                            <div>Total Feedbacks: {feedbacks.length}</div>
                            <div>Today's Attendance: {attendanceLogs.length}</div>
                            <div>Menu Items: {menuData.length}</div>
                        </div>
                        <div style={{ marginTop: '2rem', background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '14px' }}>
                            <h3>Quick Status</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>Welcome back, {user?.name || 'Admin'}. The system is running optimally.</p>
                        </div>
                    </section>
                );
            case 'menu':
                return (
                    <section className="admin-card">
                        <button className="admin-btn secondary" style={{ width: 'auto', marginBottom: '1rem' }} onClick={() => setActiveSection('summary')}>Back</button>
                        <h2>Weekly Menu System</h2>
                        <select className="admin-select" value={menuForm.day} onChange={e => setMenuForm({...menuForm, day: e.target.value})}>
                            <option>Monday</option>
                            <option>Tuesday</option>
                            <option>Wednesday</option>
                            <option>Thursday</option>
                            <option>Friday</option>
                            <option>Saturday</option>
                            <option>Sunday</option>
                        </select>
                        <input className="admin-input" placeholder="Breakfast" value={menuForm.breakfast} onChange={e => setMenuForm({...menuForm, breakfast: e.target.value})} />
                        <input className="admin-input" placeholder="Lunch" value={menuForm.lunch} onChange={e => setMenuForm({...menuForm, lunch: e.target.value})} />
                        <input className="admin-input" placeholder="Evening Snacks" value={menuForm.snacks} onChange={e => setMenuForm({...menuForm, snacks: e.target.value})} />
                        <input className="admin-input" placeholder="Dinner" value={menuForm.dinner} onChange={e => setMenuForm({...menuForm, dinner: e.target.value})} />
                        <button className="admin-btn" onClick={handleSaveMenu}>Save Menu</button>
                    </section>
                );
            case 'attendance':
                return (
                    <section className="admin-card">
                        <button className="admin-btn secondary" style={{ width: 'auto', marginBottom: '1rem' }} onClick={() => setActiveSection('summary')}>Back</button>
                        <h2>Student Attendance Logs</h2>
                        <div className="admin-list">
                            {attendanceLogs.length > 0 ? attendanceLogs.map(log => (
                                <li key={log._id}>
                                    <div>
                                        <strong>{log.user?.name || 'User'}</strong> marked <strong>{log.meal}</strong> as {log.status}
                                    </div>
                                    <small>{new Date(log.date).toLocaleDateString()} {log.time}</small>
                                </li>
                            )) : <p>No attendance logs found.</p>}
                        </div>
                    </section>
                );
            case 'feedback':
                return (
                    <section className="admin-card">
                        <button className="admin-btn secondary" style={{ width: 'auto', marginBottom: '1rem' }} onClick={() => setActiveSection('summary')}>Back</button>
                        <h2>Student Feedback</h2>
                        <div className="admin-list">
                            {feedbacks.map(f => (
                                <div key={f._id} className="admin-result" style={{ marginBottom: '1rem' }}>
                                    <strong>{f.user?.name || 'Anonymous'}</strong> ({f.meal}) - {f.rating} Stars
                                    <p>{f.comments}</p>
                                    <small>{new Date(f.createdAt).toLocaleString()}</small>
                                </div>
                            ))}
                        </div>
                    </section>
                );
            case 'password':
                return (
                    <section className="admin-card">
                        <button className="admin-btn secondary" style={{ width: 'auto', marginBottom: '1rem' }} onClick={() => setActiveSection('summary')}>Back</button>
                        <h2>Account Security</h2>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Update your administrative password.</p>
                        <input className="admin-input" type="password" placeholder="Old Password" value={passForm.oldPassword} onChange={e => setPassForm({...passForm, oldPassword: e.target.value})} />
                        <input className="admin-input" type="password" placeholder="New Password" value={passForm.newPassword} onChange={e => setPassForm({...passForm, newPassword: e.target.value})} />
                        <button className="admin-btn" onClick={handleUpdatePassword}>Update Password</button>
                    </section>
                );
            default:
                return <section className="admin-card"><h2>Feature Coming Soon</h2></section>;
        }
    };

    if (loading) return <div style={{ color: 'white', padding: '2rem' }}>Loading Admin Panel...</div>;

    return (
        <div className="admin-body">
            <header className="admin-header" style={{ position: 'relative' }}>
                <h1>Smart Campus Admin Dashboard</h1>
                <button className="admin-btn secondary" style={{ position: 'absolute', right: '20px', top: '12px', width: 'auto', padding: '8px 20px' }} onClick={logout}>Logout</button>
            </header>

            <div className="admin-layout">
                <div className="admin-sidebar">
                    <button className={activeSection === 'summary' ? 'active' : ''} onClick={() => setActiveSection('summary')}>Summary</button>
                    <button className={activeSection === 'menu' ? 'active' : ''} onClick={() => setActiveSection('menu')}>Menu</button>
                    <button className={activeSection === 'attendance' ? 'active' : ''} onClick={() => setActiveSection('attendance')}>Attendance</button>
                    <button className={activeSection === 'feedback' ? 'active' : ''} onClick={() => setActiveSection('feedback')}>Feedback</button>
                    <button className={activeSection === 'password' ? 'active' : ''} onClick={() => setActiveSection('password')}>Security</button>
                </div>

                <div className="admin-main">
                    {renderSection()}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
