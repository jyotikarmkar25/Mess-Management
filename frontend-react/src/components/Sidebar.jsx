import React from 'react';

const Sidebar = ({ activeTab, setActiveTab }) => {
    const menuItems = [
        { id: 'todays-menu', label: 'Overview', icon: 'fas fa-columns' },
        { id: 'attendance', label: 'Attendance', icon: 'fas fa-calendar-check' },
        { id: 'feedback', label: 'Feedback', icon: 'fas fa-bullhorn' },
        { id: 'nutrition', label: 'Nutrition', icon: 'fas fa-heartbeat' },
        { id: 'profile', label: 'Account Settings', icon: 'fas fa-user-circle' },
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h2><i className="fas fa-utensils"></i> <span>Mess Dashboard</span></h2>
            </div>
            <nav className="sidebar-menu">
                <ul>
                    {menuItems.map(item => (
                        <li 
                            key={item.id} 
                            className={activeTab === item.id ? 'active' : ''}
                            onClick={() => setActiveTab(item.id)}
                        >
                            <i className={item.icon}></i> <span>{item.label}</span>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="sidebar-footer">
                <p><i className="fas fa-shield-alt"></i> <span>Student Secure Portal</span></p>
            </div>
        </aside>
    );
};

export default Sidebar;