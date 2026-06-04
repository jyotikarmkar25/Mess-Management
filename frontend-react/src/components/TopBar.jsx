import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const TopBar = ({ sectionTitle, onProfileClick }) => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const profilePhoto = localStorage.getItem('profilePhoto') || 'https://via.placeholder.com/40';

    return (
        <header className="top-bar">
            <div className="breadcrumb-title">
                <h1>{sectionTitle}</h1>
            </div>
            <div className="user-info">
                <button className="theme-toggle" onClick={toggleTheme} title="Toggle Theme">
                    <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
                </button>
                <div className="utility-divider" style={{ width: '1px', height: '20px', background: 'var(--border)', margin: '0 8px' }}></div>
                <span id="user-greeting">{user?.name || user?.displayName || user?.email || 'User'}</span>
                <div className="top-bar-profile" onClick={onProfileClick}>
                    <img id="top-profile-img" src={profilePhoto} alt="Profile" />
                </div>
                <button id="logout-btn" onClick={logout}>Sign Out</button>
            </div>
        </header>
    );
};

export default TopBar;
