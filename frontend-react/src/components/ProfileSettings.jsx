import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const ProfileSettings = () => {
    const { user } = useAuth();
    const [profilePhoto, setProfilePhoto] = useState(localStorage.getItem('profilePhoto') || 'https://via.placeholder.com/150');
    const [profileData, setProfileData] = useState({
        fullname: user?.name || user?.displayName || 'User',
        email: user?.email || '',
        phone: user?.phone || '+1 (555) 000-0000',
        block: user?.block || 'Main-Rail, Trace-01'
    });

    useEffect(() => {
        if (user) {
            setProfileData({
                fullname: user.name || user.displayName || 'User',
                email: user.email || '',
                phone: user.phone || '+1 (555) 000-0000',
                block: user.block || 'Main-Rail, Trace-01'
            });
        }
    }, [user]);

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageData = event.target.result;
                setProfilePhoto(imageData);
                localStorage.setItem('profilePhoto', imageData);
                alert('Profile artifact updated.');
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // In a real app, we would update Firestore here
        alert('Configuration saved (Local update only in this demo).');
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setProfileData(prev => ({ ...prev, [id.replace('profile-', '')]: value }));
    };

    return (
        <div id="profile" className="content-section active">
            <div className="profile-container" style={{ maxWidth: '800px', margin: '0' }}>
                <div className="section-header" style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem' }}>Personal Settings</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Manage your account configuration and authentication metadata.</p>
                </div>
                
                <div className="profile-card">
                    <div className="profile-header" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '2rem', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)' }}>
                        <div className="image-upload-container" style={{ position: 'relative' }}>
                            <img id="profile-preview" src={profilePhoto} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%', border: '2px solid var(--border-strong)' }} />
                            <label htmlFor="profile-upload" className="upload-label" style={{ position: 'absolute', bottom: 0, right: 0, width: '32px', height: '32px', background: 'var(--primary)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '2px solid var(--bg-tertiary)' }}>
                                <i className="fas fa-camera" style={{ fontSize: '0.8rem' }}></i>
                                <input type="file" id="profile-upload" accept="image/*" hidden onChange={handlePhotoUpload} />
                            </label>
                        </div>
                        <div className="profile-main-info">
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{profileData.fullname}</h3>
                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>ID: {user?.uid || 'user_unknown'}</p>
                        </div>
                    </div>
                    
                    <div className="profile-details" style={{ padding: '2.5rem' }}>
                        <form id="profile-form" onSubmit={handleFormSubmit}>
                            <div className="form-section" style={{ marginBottom: '2.5rem' }}>
                                <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>General Information</h4>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Full Name</label>
                                        <input type="text" id="profile-fullname" value={profileData.fullname} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input type="email" id="profile-email" value={profileData.email} onChange={handleChange} disabled />
                                    </div>
                                </div>
                            </div>

                            <div className="form-section">
                                <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>Environment Details</h4>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Phone Extension</label>
                                        <input type="tel" id="profile-phone" value={profileData.phone} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Deployment Block</label>
                                        <input type="text" id="profile-block" value={profileData.block} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                            
                            <button type="submit" className="submit-btn" style={{ marginTop: '2rem', width: 'auto', padding: '0.6rem 2rem' }}>Update Configuration</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;
