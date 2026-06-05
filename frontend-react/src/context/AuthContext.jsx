import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mocking authentication check
        const mockUser = localStorage.getItem('mockUser');
        if (mockUser) {
            setUser(JSON.parse(mockUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Mock login logic
        const mockUserData = { 
            uid: 'mock_uid_123', 
            email: email, 
            name: 'Mock User', 
            role: email.includes('admin') ? 'admin' : 'user',
            token: 'mock_token_abc'
        };
        setUser(mockUserData);
        localStorage.setItem('mockUser', JSON.stringify(mockUserData));
        return Promise.resolve(mockUserData);
    };

    const loginWithGoogle = () => {
        const mockUserData = { 
            uid: 'google_mock_uid', 
            email: 'google@example.com', 
            name: 'Google User', 
            role: 'user',
            token: 'mock_token_google'
        };
        setUser(mockUserData);
        localStorage.setItem('mockUser', JSON.stringify(mockUserData));
        return Promise.resolve(mockUserData);
    };

    const register = (email, password, name) => {
        const mockUserData = { 
            uid: 'reg_mock_uid', 
            email: email, 
            name: name, 
            role: 'user',
            token: 'mock_token_reg'
        };
        setUser(mockUserData);
        localStorage.setItem('mockUser', JSON.stringify(mockUserData));
        return Promise.resolve(mockUserData);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('mockUser');
        return Promise.resolve();
    };

    const changePassword = (newPass) => {
        console.log("Mock password change to:", newPass);
        return Promise.resolve();
    };

    const updateAdminProfile = (data) => {
        setUser(prev => ({ ...prev, ...data }));
        localStorage.setItem('mockUser', JSON.stringify({ ...user, ...data }));
        return Promise.resolve();
    };

    return (
        <AuthContext.Provider value={{ user, token: user?.token, loading, login, loginWithGoogle, register, logout, changePassword, updateAdminProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
