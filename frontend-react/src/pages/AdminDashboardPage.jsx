import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, doc, setDoc, onSnapshot, addDoc, query, orderBy, deleteDoc, where } from 'firebase/firestore';
import '../styles/AdminDashboard.css';

const AdminDashboardPage = () => {
    const { user, logout } = useAuth();
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

    const SPOONACULAR_API_KEY = "AQ.Ab8RN6LUupNVThTNpBRGLnXXLhNXOwzqVBa-XYcgwEIgNvicXQ";

    useEffect(() => {
        // Real-time Weekly Menu
        const unsubMenu = onSnapshot(collection(db, 'weeklyMenu'), (snapshot) => {
            const data = {};
            snapshot.forEach(doc => data[doc.id] = doc.data());
            setMenuData(data);
        });

        // Real-time Foods list
        const unsubFoods = onSnapshot(collection(db, 'foodInventory'), (snapshot) => {
            const data = [];
            snapshot.forEach(doc => data.push({ id: doc.id, ...doc.data() }));
            setFoods(data);
        });

        // Real-time Feedback
        const unsubFeedback = onSnapshot(query(collection(db, 'feedback'), orderBy('timestamp', 'desc')), (snapshot) => {
            const data = [];
            snapshot.forEach(doc => data.push({ id: doc.id, ...doc.data() }));
            setFeedbacks(data);
        });

        // Real-time Attendance
        const today = new Date();
        today.setHours(0,0,0,0);
        const unsubAttendance = onSnapshot(query(collection(db, 'attendance'), where('timestamp', '>=', today)), (snapshot) => {
            const data = [];
            snapshot.forEach(doc => data.push({ id: doc.id, ...doc.data() }));
            setAttendanceLogs(data);
            setLoading(false);
        });

        return () => {
            unsubMenu();
            unsubFoods();
            unsubFeedback();
            unsubAttendance();
        };
    }, []);

    const handleSaveMenu = async () => {
        try {
            await setDoc(doc(db, 'weeklyMenu', menuForm.day), {
                breakfast: menuForm.b,
                lunch: menuForm.l,
                snacks: menuForm.s,
                dinner: menuForm.d
            });
            alert("Menu Saved Successfully");
        } catch (err) {
            alert("Error saving menu: " + err.message);
        }
    };

    const handleAddFood = async () => {
        if (!foodInput.trim()) return;
        try {
            await addDoc(collection(db, 'foodInventory'), { name: foodInput.trim() });
            setFoodInput('');
        } catch (err) {
            alert("Error adding food: " + err.message);
        }
    };

    const handleDeleteFood = async (id) => {
        try {
            await deleteDoc(doc(db, 'foodInventory', id));
        } catch (err) {
            alert("Error deleting food: " + err.message);
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
                <p>Confidence: ${data.category?.probability || "N/A"}</p>
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
                            <input className="admin-input" placeholder="Add Food" value={foodInput} onChange={e => setFoodInput(e.target.value)} />
                            <button className="admin-btn" onClick={handleAddFood}>Add Food</button>
                            <ul className="admin-list">
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
                        <input type="time" className="admin-input" value={timeForm.bt} onChange={e => setTimeForm({...timeForm, bt: e.target.value})} />
                        <input type="time" className="admin-input" value={timeForm.lt} onChange={e => setTimeForm({...timeForm, lt: e.target.value})} />
                        <input type="time" className="admin-input" value={timeForm.st} onChange={e => setTimeForm({...timeForm, st: e.target.value})} />
                        <input type="time" className="admin-input" value={timeForm.dt} onChange={e => setTimeForm({...timeForm, dt: e.target.value})} />
                        <button className="admin-btn">Save</button>
                        <div className="admin-result">
                            Breakfast: {timeForm.bt} <br/>
                            Lunch: {timeForm.lt} <br/>
                            Evening Snacks: {timeForm.st} <br/>
                            Dinner: {timeForm.dt}
                        </div>
                    </section>
                );
            case 'attendance':
                return (
                    <section className="admin-card">
                        <button className="admin-btn secondary" style={{ width: 'auto', marginBottom: '1rem' }} onClick={() => setActiveSection('summary')}>Back</button>
                        <h2>Student Attendance Logs</h2>
                        <div className="admin-list">
                            {attendanceLogs.length > 0 ? attendanceLogs.map(log => (
                                <li key={log.id}>
                                    <div>
                                        <strong>{log.userName}</strong> marked <strong>{log.meal}</strong> as {log.status}
                                    </div>
                                    <small>{log.timestamp?.toDate().toLocaleTimeString()}</small>
                                </li>
                            )) : <p>No attendance logs for today.</p>}
                        </div>
                    </section>
                );
            case 'feedback':
                return (
                    <section className="admin-card">
                        <button className="admin-btn secondary" style={{ width: 'auto', marginBottom: '1rem' }} onClick={() => setActiveSection('summary')}>Back</button>
                        <h2>Feedback System</h2>
                        <div className="admin-list">
                            {feedbacks.map(f => (
                                <div key={f.id} className="admin-result" style={{ marginBottom: '1rem' }}>
                                    <strong>{f.userName || 'Anonymous'}</strong> ({f.meal}) - {f.rating} Stars
                                    <p>{f.comments}</p>
                                    <small>{f.timestamp?.toDate().toLocaleString()}</small>
                                </div>
                            ))}
                        </div>
                    </section>
                );
            default:
                return <section className="admin-card"><h2>Coming Soon</h2></section>;
        }
    };

    return (
        <div className="admin-body">
            <header className="admin-header">
                <h1>Smart Campus Admin Dashboard</h1>
                <button className="admin-btn secondary" style={{ position: 'absolute', right: '20px', top: '15px', width: 'auto' }} onClick={logout}>Logout</button>
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
                    <button className={activeSection === 'password' ? 'active' : ''} onClick={() => setActiveSection('password')}>Password</button>
                </div>

                <div className="admin-main">
                    {renderSection()}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
