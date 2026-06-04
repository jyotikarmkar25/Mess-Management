import React, { useState } from 'react';

const weeklyMenuData = {
    'Monday': [
        { type: 'breakfast', icon: 'fa-egg', time: '08:30 AM - 09:00 AM', items: ['Aloo Paratha', 'Curd', 'Tea/Coffee'] },
        { type: 'lunch', icon: 'fa-bread-slice', time: '01:00 PM - 02:00 PM', items: ['Rajma Chawal', 'Roti', 'Salad'] },
        { type: 'snacks', icon: 'fa-cookie', time: '05:30 PM - 06:30 PM', items: ['Samosa', 'Chai'] },
        { type: 'dinner', icon: 'fa-bowl-rice', time: '08:15 PM - 09:15 PM', items: ['Mixed Veg', 'Dal Fry', 'Rice', 'Roti'] }
    ],
    'Tuesday': [
        { type: 'breakfast', icon: 'fa-egg', time: '08:30 AM - 09:00 AM', items: ['Poha', 'Sev', 'Tea/Coffee'] },
        { type: 'lunch', icon: 'fa-bread-slice', time: '01:00 PM - 02:00 PM', items: ['Kadhi Pakoda', 'Rice', 'Roti', 'Aloo Methi'] },
        { type: 'snacks', icon: 'fa-cookie', time: '05:30 PM - 06:30 PM', items: ['Biscuits', 'Coffee'] },
        { type: 'dinner', icon: 'fa-bowl-rice', time: '08:15 PM - 09:15 PM', items: ['Paneer Bhurji', 'Dal Tadka', 'Roti'] }
    ],
    'Wednesday': [
        { type: 'breakfast', icon: 'fa-egg', time: '08:30 AM - 09:00 AM', items: ['Upma', 'Chutney', 'Tea/Coffee'] },
        { type: 'lunch', icon: 'fa-bread-slice', time: '01:00 PM - 02:00 PM', items: ['Chole Bhature', 'Lassi', 'Salad'] },
        { type: 'snacks', icon: 'fa-cookie', time: '05:30 PM - 06:30 PM', items: ['Vada Pav', 'Chai'] },
        { type: 'dinner', icon: 'fa-bowl-rice', time: '08:15 PM - 09:15 PM', items: ['Chicken Curry / Mushroom', 'Jeera Rice', 'Roti'] }
    ],
    'Thursday': [
        { type: 'breakfast', icon: 'fa-egg', time: '08:30 AM - 09:00 AM', items: ['Idli Sambar', 'Coconut Chutney'] },
        { type: 'lunch', icon: 'fa-bread-slice', time: '01:00 PM - 02:00 PM', items: ['Dal Makhani', 'Shahi Paneer', 'Naan/Roti'] },
        { type: 'snacks', icon: 'fa-cookie', time: '05:30 PM - 06:30 PM', items: ['Bhel Puri', 'Chai'] },
        { type: 'dinner', icon: 'fa-bowl-rice', time: '08:15 PM - 09:15 PM', items: ['Aloo Matar', 'Yellow Dal', 'Rice', 'Roti'] }
    ],
    'Friday': [
        { type: 'breakfast', icon: 'fa-egg', time: '08:30 AM - 09:00 AM', items: ['Bread Jam/Butter', 'Omelette', 'Milk'] },
        { type: 'lunch', icon: 'fa-bread-slice', time: '01:00 PM - 02:00 PM', items: ['Veg Biryani', 'Raita', 'Salad', 'Gulab Jamun'] },
        { type: 'snacks', icon: 'fa-cookie', time: '05:30 PM - 06:30 PM', items: ['Sandwich', 'Coffee'] },
        { type: 'dinner', icon: 'fa-bowl-rice', time: '08:15 PM - 09:15 PM', items: ['Egg Curry / Kofta', 'Dal', 'Rice', 'Roti'] }
    ],
    'Saturday': [
        { type: 'breakfast', icon: 'fa-egg', time: '08:30 AM - 09:00 AM', items: ['Puri Bhaji', 'Halwa', 'Tea'] },
        { type: 'lunch', icon: 'fa-bread-slice', time: '01:00 PM - 02:00 PM', items: ['Pav Bhaji', 'Pulao', 'Curd'] },
        { type: 'snacks', icon: 'fa-cookie', time: '05:30 PM - 06:30 PM', items: ['Dhokla', 'Chai'] },
        { type: 'dinner', icon: 'fa-bowl-rice', time: '08:15 PM - 09:15 PM', items: ['Special Thali', 'Seasonal Sweet'] }
    ],
    'Sunday': [
        { type: 'breakfast', icon: 'fa-egg', time: '08:30 AM - 09:00 AM', items: ['Chole Kulche', 'Boiled Eggs', 'Tea/Coffee'] },
        { type: 'lunch', icon: 'fa-bread-slice', time: '01:00 PM - 02:00 PM', items: ['Special Veg Pulao', 'Paneer Masala', 'Boondi Raita'] },
        { type: 'snacks', icon: 'fa-cookie', time: '05:30 PM - 06:30 PM', items: ['Popcorn / Chips', 'Cold Drink'] },
        { type: 'dinner', icon: 'fa-bowl-rice', time: '08:15 PM - 09:15 PM', items: ['Aloo Gobhi', 'Dal', 'Rice', 'Roti'] }
    ]
};

const WeeklyMenu = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const now = new Date();
    const currentDayName = days[now.getDay()];
    
    const tomorrowDate = new Date(now);
    tomorrowDate.setDate(now.getDate() + 1);
    const tomorrowDayName = days[tomorrowDate.getDay()];

    const [selectedDay, setSelectedDay] = useState(currentDayName);

    const menu = weeklyMenuData[selectedDay] || [];

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
                        Current
                    </button>
                    <button 
                        className={`day-btn ${selectedDay === tomorrowDayName ? 'active' : ''}`}
                        onClick={() => setSelectedDay(tomorrowDayName)}
                    >
                        Upcoming
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
                                {meal.items.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
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