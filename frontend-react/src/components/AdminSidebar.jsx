import React from 'react';

const AdminSidebar = ({ activeTab, setActiveTab }) => {
    const menuItems = [
        { id: 'overview', label: 'Dashboard Overview', icon: 'fas fa-chart-line' },
        { id: 'menu-management', label: 'Weekly Menu', icon: 'fas fa-utensils' },
        { id: 'attendance', label: 'Student Attendance', icon: 'fas fa-users' },
        { id: 'feedback', label: 'Feedback Management', icon: 'fas fa-comment-alt' },
        { id: 'notifications', label: 'Notifications', icon: 'fas fa-bell' },
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h2><i className="fas fa-user-shield"></i> <span>Admin Panel</span></h2>
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
                <p><i className="fas fa-lock"></i> <span>Secure Admin Access</span></p>
            </div>
        </aside>
    );
};

export default AdminSidebar;
