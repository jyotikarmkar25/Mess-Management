import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import WeeklyMenu from '../components/WeeklyMenu';
import AttendanceTracker from '../components/AttendanceTracker';
import FeedbackForm from '../components/FeedbackForm';
import NutritionDashboard from '../components/NutritionDashboard';
import ProfileSettings from '../components/ProfileSettings';
import '../styles/Dashboard.css';

const UserDashboardPage = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('todays-menu');
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.y });
            document.documentElement.style.setProperty('--x', `${e.clientX}px`);
            document.documentElement.style.setProperty('--y', `${e.clientY}px`);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const renderContent = () => {
        switch (activeTab) {
            case 'todays-menu': return <WeeklyMenu />;
            case 'attendance': return <AttendanceTracker />;
            case 'feedback': return <FeedbackForm />;
            case 'nutrition': return <NutritionDashboard />;
            case 'profile': return <ProfileSettings />;
            default: return <WeeklyMenu />;
        }
    };

    const getSectionTitle = () => {
        const titles = {
            'todays-menu': 'Overview',
            'attendance': 'Attendance',
            'feedback': 'Feedback',
            'nutrition': 'Nutrition',
            'profile': 'Account Settings'
        };
        return titles[activeTab] || 'Dashboard';
    };

    return (
        <div className="container">
            <div className="background-glow"></div>
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <main className="main-content">
                <TopBar 
                    sectionTitle={getSectionTitle()} 
                    onProfileClick={() => setActiveTab('profile')}
                />
                <div id="content-area">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default UserDashboardPage;
