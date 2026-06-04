import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username);
        navigate('/dashboard');
    };

    return (
        <div className="auth-page">
            <style>{`
                .auth-page {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    background-color: var(--bg-main);
                }
                .auth-card {
                    background: var(--bg-card);
                    padding: 3.5rem;
                    border-radius: var(--radius-lg);
                    box-shadow: var(--shadow-lg);
                    width: 100%;
                    max-width: 420px;
                    border: 1px solid var(--border);
                }
                .auth-card h2 {
                    margin-bottom: 2.5rem;
                    text-align: center;
                    font-size: 2.25rem;
                    font-weight: 900;
                    color: var(--text-main);
                }
                .auth-card .form-group {
                    margin-bottom: 1.5rem;
                }
                .auth-card .form-group label {
                    display: block;
                    margin-bottom: 0.6rem;
                    font-weight: 800;
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    color: var(--text-muted);
                }
                .auth-card input {
                    width: 100%;
                    padding: 1rem;
                    border-radius: 12px;
                    border: 2px solid var(--border);
                    background: var(--bg-main);
                    color: var(--text-main);
                    font-size: 1rem;
                    font-weight: 500;
                    transition: var(--transition);
                }
                .auth-card input:focus {
                    outline: none;
                    border-color: var(--primary);
                    box-shadow: 0 0 0 5px var(--primary-glow);
                }
                .auth-btn {
                    background: var(--primary);
                    color: white;
                    border: none;
                    padding: 1.125rem;
                    border-radius: 14px;
                    width: 100%;
                    font-weight: 900;
                    cursor: pointer;
                    margin-top: 1rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    transition: var(--transition);
                }
                .auth-btn:hover {
                    background: var(--primary-hover);
                    transform: translateY(-2px);
                    box-shadow: 0 10px 20px -5px rgba(79, 70, 229, 0.4);
                }
                .auth-link {
                    text-align: center;
                    margin-top: 2rem;
                    color: var(--text-muted);
                    font-weight: 700;
                    font-size: 0.9rem;
                }
                .auth-link a {
                    color: var(--primary);
                    text-decoration: none;
                    border-bottom: 2px solid transparent;
                    transition: var(--transition);
                }
                .auth-link a:hover {
                    border-color: var(--primary);
                }
            `}</style>
            <div className="auth-card">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input 
                            type="text" 
                            placeholder="Enter username" 
                            required 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            placeholder="Enter password" 
                            required 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="auth-btn">Login</button>
                </form>
                <div className="auth-link">
                    Don't have an account? <Link to="/register">Register here</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;