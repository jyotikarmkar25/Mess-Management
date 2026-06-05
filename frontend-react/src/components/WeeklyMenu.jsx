import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const WeeklyMenu = () => {
    const { token } = useAuth();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const now = new Date();
    const currentDayName = days[now.getDay()];
    
    const tomorrowDate = new Date(now);
    tomorrowDate.setDate(now.getDate() + 1);
    const tomorrowDayName = days[tomorrowDate.getDay()];

    const [selectedDay, setSelectedDay] = useState(currentDayName);
    const [weeklyMenuData, setWeeklyMenuData] = useState({});
    const [loading, setLoading] = useState(true);

    const API_URL = 'http://localhost:5000/api/menus';

    useEffect(() => {
        const fetchMenu = async () => {
            if (!token) return;
            try {
                const response = await axios.get(`${API_URL}/all`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                const formattedData = {};
                response.data.forEach(item => {
                    formattedData[item.day] = [
                        { type: 'breakfast', icon: 'fa-egg', time: '08:30 AM - 09:00 AM', items: item.breakfast ? item.breakfast.split(',').map(i => i.trim()) : [] },
                        { type: 'lunch', icon: 'fa-bread-slice', time: '01:00 PM - 02:00 PM', items: item.lunch ? item.lunch.split(',').map(i => i.trim()) : [] },
                        { type: 'snacks', icon: 'fa-cookie', time: '05:30 PM - 06:30 PM', items: item.snacks ? item.snacks.split(',').map(i => i.trim()) : [] },
                        { type: 'dinner', icon: 'fa-bowl-rice', time: '08:15 PM - 09:15 PM', items: item.dinner ? item.dinner.split(',').map(i => i.trim()) : [] }
                    ];
                });
                
                setWeeklyMenuData(formattedData);
            } catch (error) {
                console.error("Error fetching menu:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMenu();
    }, [token]);

    const menu = weeklyMenuData[selectedDay] || [
        { type: 'breakfast', icon: 'fa-egg', time: '08:30 AM - 09:00 AM', items: ['Not available'] },
        { type: 'lunch', icon: 'fa-bread-slice', time: '01:00 PM - 02:00 PM', items: ['Not available'] },
        { type: 'snacks', icon: 'fa-cookie', time: '05:30 PM - 06:30 PM', items: ['Not available'] },
        { type: 'dinner', icon: 'fa-bowl-rice', time: '08:15 PM - 09:15 PM', items: ['Not available'] }
    ];

    if (loading) return <div className="content-section">Loading menu...</div>;

    return (
        <div id="todays-menu" className="content-section active">
            <div className="section-header" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h2 style={{ fontSize: '1.25rem' }}>Food Deployment</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>View automated meal plans for current and upcoming periods.</p>
                </div>
                <div className="day-selector" style={{ marginBottom: 0 }}>
                    <button 
                        className={`day-btn ${selectedDay === currentDayName ? 'active' : ''}`}
                        onClick={() => setSelectedDay(currentDayName)}
                    >
                        Current ({currentDayName})
                    </button>
                    <button 
                        className={`day-btn ${selectedDay === tomorrowDayName ? 'active' : ''}`}
                        onClick={() => setSelectedDay(tomorrowDayName)}
                    >
                        Upcoming ({tomorrowDayName})
                    </button>
                </div>
            </div>
            <div id="menu-container" className="menu-grid">
                {menu.map((meal, index) => (
                    <div key={index} className={`menu-card ${meal.type}`}>
                        <div className={`card-header ${meal.type}`}>
                            <h3><i className={`fas ${meal.icon}`}></i> {meal.type}</h3>
                            <span>{meal.time}</span>
                        </div>
                        <div className="card-body">
                            <ul>
                                {meal.items.length > 0 ? (
                                    meal.items.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))
                                ) : (
                                    <li>No items listed</li>
                                )}
                            </ul>
                            <button className="view-detail-btn">Inspect Metrics</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeeklyMenu;
