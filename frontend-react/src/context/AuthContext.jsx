import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const res = await fetch(`${API_URL}/auth/profile`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await res.json();
                if (res.ok) {
                    setUser(data.user);
                } else {
                    localStorage.removeItem('token');
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const login = async (email, password) => {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('token', data.token);
            // Fetch profile immediately after login to get user details
            const profileRes = await fetch(`${API_URL}/auth/profile`, {
                headers: { 'Authorization': `Bearer ${data.token}` }
            });
            const profileData = await profileRes.json();
            if (profileRes.ok) {
                setUser(profileData.user);
            }
            return data;
        } else {
            throw new Error(data.message || 'Login failed');
        }
    };

    const register = async (email, password, name) => {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name, role: 'student' })
        });
        const data = await res.json();
        if (res.ok) {
            return data;
        } else {
            throw new Error(data.message || 'Registration failed');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const changePassword = async (oldPassword, newPassword) => {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/auth/change-password`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ oldPassword, newPassword })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to change password');
        return data;
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, changePassword }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);