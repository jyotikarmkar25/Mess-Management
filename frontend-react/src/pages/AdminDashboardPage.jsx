import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/AdminDashboard.css';

const AdminDashboardPage = () => {
    const { user, logout, changePassword } = useAuth();
    const [activeSection, setActiveSection] = useState('summary');
    const [menuData, setMenuData] = useState({});
    const [foods, setFoods] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [attendanceLogs, setAttendanceLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    // AI Analyzer State
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [analyzeResult, setAnalyzeResult] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    // Form states
    const [menuForm, setMenuForm] = useState({ day: 'Monday', b: '', l: '', s: '', d: '' });
    const [foodInput, setFoodInput] = useState('');
    const [timeForm, setTimeForm] = useState({ bt: '', lt: '', st: '', dt: '' });
    const [passForm, setPassForm] = useState({ oldP: '', newP: '' });

    const SPOONACULAR_API_KEY = "AQ.Ab8RN6LUupNVThTNpBRGLnXXLhNXOwzqVBa-XYcgwEIgNvicXQ";

    useEffect(() => {
        // Mock Weekly Menu
        const storedMenu = localStorage.getItem('mockWeeklyMenu');
        if (storedMenu) setMenuData(JSON.parse(storedMenu));

        // Mock Foods list
        const storedFoods = localStorage.getItem('mockFoodInventory');
        if (storedFoods) setFoods(JSON.parse(storedFoods));

        // Mock Feedback
        const storedFeedbacks = localStorage.getItem('mockFeedbacks');
        if (storedFeedbacks) setFeedbacks(JSON.parse(storedFeedbacks).sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp)));

        // Mock Attendance (Today)
        const storedAttendance = localStorage.getItem('mockAttendanceLogs');
        if (storedAttendance) setAttendanceLogs(JSON.parse(storedAttendance));

        // Mock Meal Timing
        const storedTiming = localStorage.getItem('mockMealTiming');
        if (storedTiming) setTimeForm(JSON.parse(storedTiming));

        setLoading(false);
    }, []);

    const handleSaveMenu = () => {
        const newData = {
            ...menuData,
            [menuForm.day]: {
                breakfast: menuForm.b,
                lunch: menuForm.l,
                snacks: menuForm.s,
                dinner: menuForm.d
            }
        };
        setMenuData(newData);
        localStorage.setItem('mockWeeklyMenu', JSON.stringify(newData));
        alert("Menu Saved Successfully (Local)");
    };

    const handleAddFood = () => {
        if (!foodInput.trim()) return;
        const newFoods = [...foods, { id: Date.now().toString(), name: foodInput.trim() }];
        setFoods(newFoods);
        localStorage.setItem('mockFoodInventory', JSON.stringify(newFoods));
        setFoodInput('');
    };

    const handleDeleteFood = (id) => {
        const newFoods = foods.filter(f => f.id !== id);
        setFoods(newFoods);
        localStorage.setItem('mockFoodInventory', JSON.stringify(newFoods));
    };

    const handleSaveTime = () => {
        localStorage.setItem('mockMealTiming', JSON.stringify(timeForm));
        alert("Timing Saved Successfully (Local)");
    };

    const handleUpdatePassword = async () => {
        try {
            await changePassword(passForm.newP);
            alert("Password Updated Successfully");
            setPassForm({ oldP: '', newP: '' });
        } catch (err) {
            alert("Error: " + err.message);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setPreviewUrl(URL.createObjectURL(file));
            setAnalyzeResult("Image selected. Click Analyze button.");
        }
    };

    const analyzeFood = async () => {
        if (!selectedImage) {
            alert("Please select an image first");
            return;
        }
        setIsAnalyzing(true);
        setAnalyzeResult("Analyzing food image...");
        
        const formData = new FormData();
        formData.append("file", selectedImage);

        try {
            const res = await fetch(`https://api.spoonacular.com/food/images/analyze?apiKey=${SPOONACULAR_API_KEY}`, {
                method: "POST",
                body: formData
            });
            const data = await res.json();
            setAnalyzeResult(`
                <h3>Food Detected</h3>
                <p>Name: ${data.category?.name || "Unknown"}</p>
                <p>Confidence: ${data.category?.probability.toFixed(2) || "N/A"}</p>
                <hr>
                <p>This API detects food type only. For calories/protein → use Nutrition API</p>
            `);
        } catch (err) {
            setAnalyzeResult("API Error or Invalid Key");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const removeImage = () => {
        setSelectedImage(null);
        setPreviewUrl('');
        setAnalyzeResult("Image removed. Upload again to analyze.");
    };

    const renderSection = () => {
        switch (activeSection) {
            case 'summary':
                return (
                    <section className="admin-card">
                        <h2>Dashboard Summary</h2>
                        <div className="admin-stats">
                            <div>Total Students: 150</div>
                            <div>Today's Attendance: {attendanceLogs.length}</div>
                            <div>Avg Rating: 4.6</div>
                            <div>Inventory Items: {foods.length}</div>
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
                        <input className="admin-input" placeholder="Breakfast" value={menuForm.b} onChange={e => setMenuForm({...menuForm, b: e.target.value})} />
                        <input className="admin-input" placeholder="Lunch" value={menuForm.l} onChange={e => setMenuForm({...menuForm, l: e.target.value})} />
                        <input className="admin-input" placeholder="Evening Snacks" value={menuForm.s} onChange={e => setMenuForm({...menuForm, s: e.target.value})} />
                        <input className="admin-input" placeholder="Dinner" value={menuForm.d} onChange={e => setMenuForm({...menuForm, d: e.target.value})} />
                        <button className="admin-btn" onClick={handleSaveMenu}>Save Menu</button>
                        
                        <div style={{ marginTop: '2rem' }}>
                            <input className="admin-input" placeholder="Add Food to Inventory" value={foodInput} onChange={e => setFoodInput(e.target.value)} />
                            <button className="admin-btn" onClick={handleAddFood}>Add Food</button>
                            <ul className="admin-list" style={{ marginTop: '1rem' }}>
                                {foods.map(food => (
                                    <li key={food.id}>
                                        {food.name}
                                        <button className="admin-btn secondary" style={{ width: 'auto', padding: '4px 10px' }} onClick={() => handleDeleteFood(food.id)}>delete</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                );
            case 'image':
                return (
                    <section className="admin-card">
                        <button className="admin-btn secondary" style={{ width: 'auto', marginBottom: '1rem' }} onClick={() => setActiveSection('summary')}>Back</button>
                        <h2>Food Image AI Analyzer</h2>
                        <input type="file" className="admin-input" onChange={handleImageChange} accept="image/*" />
                        <button className="admin-btn" onClick={analyzeFood} disabled={isAnalyzing}>Analyze Food</button>
                        <button className="admin-btn secondary" onClick={removeImage}>Remove Image</button>
                        {previewUrl && <img src={previewUrl} alt="Preview" className="admin-preview" />}
                        <div className="admin-result" dangerouslySetInnerHTML={{ __html: analyzeResult }}></div>
                    </section>
                );
            case 'time':
                return (
                    <section className="admin-card">
                        <button className="admin-btn secondary" style={{ width: 'auto', marginBottom: '1rem' }} onClick={() => setActiveSection('summary')}>Back</button>
                        <h2>Meal Timing</h2>
                        <label>Breakfast Time</label>
                        <input type="time" className="admin-input" value={timeForm.bt} onChange={e => setTimeForm({...timeForm, bt: e.target.value})} />
                        <label>Lunch Time</label>
                        <input type="time" className="admin-input" value={timeForm.lt} onChange={e => setTimeForm({...timeForm, lt: e.target.value})} />
                        <label>Evening Snacks Time</label>
                        <input type="time" className="admin-input" value={timeForm.st} onChange={e => setTimeForm({...timeForm, st: e.target.value})} />
                        <label>Dinner Time</label>
                        <input type="time" className="admin-input" value={timeForm.dt} onChange={e => setTimeForm({...timeForm, dt: e.target.value})} />
                        <button className="admin-btn" onClick={handleSaveTime}>Save Timing</button>
                        <div className="admin-result">
                            Current Configuration: <br/>
                            Breakfast: {timeForm.bt || 'Not Set'} | Lunch: {timeForm.lt || 'Not Set'} <br/>
                            Snacks: {timeForm.st || 'Not Set'} | Dinner: {timeForm.dt || 'Not Set'}
                        </div>
                    </section>
                );
            case 'attendance':
                return (
                    <section className="admin-card">
                        <button className="admin-btn secondary" style={{ width: 'auto', marginBottom: '1rem' }} onClick={() => setActiveSection('summary')}>Back</button>
                        <h2>Student Attendance Logs (Today)</h2>
                        <div className="admin-list">
                            {attendanceLogs.length > 0 ? attendanceLogs.map(log => (
                                <li key={log.id}>
                                    <div>
                                        <strong>{log.userName}</strong> marked <strong>{log.meal}</strong> as {log.status}
                                    </div>
                                    <small>{new Date(log.timestamp).toLocaleTimeString()}</small>
                                </li>
                            )) : <p>No attendance logs for today.</p>}
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
                                <div key={f.id} className="admin-result" style={{ marginBottom: '1rem' }}>
                                    <strong>{f.userName || 'Anonymous'}</strong> ({f.meal}) - {f.rating} Stars
                                    <p>{f.comments}</p>
                                    <small>{new Date(f.timestamp).toLocaleString()}</small>
                                </div>
                            ))}
                        </div>
                    </section>
                );
            case 'analytics':
                return (
                    <section className="admin-card">
                        <button className="admin-btn secondary" style={{ width: 'auto', marginBottom: '1rem' }} onClick={() => setActiveSection('summary')}>Back</button>
                        <h2>Usage Analytics</h2>
                        <div className="admin-result">
                            <h3>Weekly Attendance Trends</h3>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end', height: '150px', marginTop: '1rem' }}>
                                {[65, 80, 45, 90, 70, 85, 30].map((h, i) => (
                                    <div key={i} style={{ flex: 1, background: 'var(--primary)', height: `${h}%`, borderRadius: '4px 4px 0 0' }}></div>
                                ))}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginTop: '0.5rem' }}>
                                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                            </div>
                        </div>
                        <div className="admin-result" style={{ marginTop: '1rem' }}>
                            <h3>Meal Satisfaction</h3>
                            <p>Breakfast: 4.2/5</p>
                            <p>Lunch: 3.8/5</p>
                            <p>Dinner: 4.5/5</p>
                        </div>
                    </section>
                );
            case 'password':
                return (
                    <section className="admin-card">
                        <button className="admin-btn secondary" style={{ width: 'auto', marginBottom: '1rem' }} onClick={() => setActiveSection('summary')}>Back</button>
                        <h2>Account Security</h2>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Update your administrative password.</p>
                        <input className="admin-input" type="password" placeholder="New Password" value={passForm.newP} onChange={e => setPassForm({...passForm, newP: e.target.value})} />
                        <button className="admin-btn" onClick={handleUpdatePassword}>Update Password</button>
                    </section>
                );
            default:
                return <section className="admin-card"><h2>Feature Coming Soon</h2></section>;
        }
    };

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
                    <button className={activeSection === 'image' ? 'active' : ''} onClick={() => setActiveSection('image')}>Image AI</button>
                    <button className={activeSection === 'time' ? 'active' : ''} onClick={() => setActiveSection('time')}>Timing</button>
                    <button className={activeSection === 'attendance' ? 'active' : ''} onClick={() => setActiveSection('attendance')}>Attendance</button>
                    <button className={activeSection === 'feedback' ? 'active' : ''} onClick={() => setActiveSection('feedback')}>Feedback</button>
                    <button className={activeSection === 'analytics' ? 'active' : ''} onClick={() => setActiveSection('analytics')}>Analytics</button>
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
