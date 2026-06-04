import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('userToken'));

    useEffect(() => {
        const savedUsername = localStorage.getItem('username');
        if (token && savedUsername) {
            setUser({ username: savedUsername });
        }
    }, [token]);

    const login = (username) => {
        const dummyToken = 'dummy-token-' + Date.now();
        localStorage.setItem('userToken', dummyToken);
        localStorage.setItem('username', username);
        setToken(dummyToken);
        setUser({ username });
    };

    const logout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('username');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);