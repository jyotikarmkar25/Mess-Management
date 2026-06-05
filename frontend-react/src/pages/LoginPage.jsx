import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (!email || !password) {
            return setError('Please enter both email and password');
        }

        setLoading(true);
        try {
            await login(email, password);
            navigate('/dashboard'); 
        } catch (err) {
            setError('Failed to log in: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <style>{`
                .auth-page {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    background: linear-gradient(135deg, #0f172a 0%, #020617 100%);
                    padding: 2rem;
                    font-family: 'Inter', sans-serif;
                }
                .auth-card {
                    background: rgba(30, 41, 59, 0.7);
                    backdrop-filter: blur(16px);
                    padding: 3.5rem;
                    border-radius: 28px;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                    width: 100%;
                    max-width: 420px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: white;
                }
                .auth-card h2 {
                    margin-bottom: 2rem;
                    text-align: center;
                    font-size: 2.25rem;
                    font-weight: 800;
                    letter-spacing: -0.025em;
                }
                .error-msg {
                    background: rgba(239, 68, 68, 0.1);
                    color: #f87171;
                    padding: 0.85rem;
                    border-radius: 12px;
                    margin-bottom: 1.5rem;
                    font-size: 0.85rem;
                    border: 1px solid rgba(239, 68, 68, 0.2);
                    line-height: 1.4;
                }
                .form-group { margin-bottom: 1.25rem; }
                .form-group label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 600;
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    color: #94a3b8;
                }
                .auth-card input {
                    width: 100%;
                    padding: 0.9rem 1.1rem;
                    border-radius: 14px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    background: rgba(15, 23, 42, 0.6);
                    color: white;
                    font-size: 1rem;
                    transition: all 0.2s;
                }
                .auth-card input:focus {
                    outline: none;
                    border-color: #38bdf8;
                    box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.1);
                }
                .auth-btn {
                    background: linear-gradient(135deg, #6366f1, #06b6d4);
                    color: white;
                    border: none;
                    padding: 1rem;
                    border-radius: 14px;
                    width: 100%;
                    font-weight: 700;
                    cursor: pointer;
                    margin-top: 1rem;
                    transition: all 0.2s;
                    box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.3);
                }
                .auth-btn:hover:not(:disabled) {
                    transform: translateY(-2px);
                    filter: brightness(1.1);
                }
                .auth-link {
                    text-align: center;
                    margin-top: 2rem;
                    color: #94a3b8;
                    font-size: 0.9rem;
                }
                .auth-link a { color: #38bdf8; text-decoration: none; font-weight: 700; }
            `}</style>
            <div className="auth-card">
                <h2>Login</h2>
                {error && <div className="error-msg">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input 
                            type="email" 
                            placeholder="name@university.edu" 
                            required 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            placeholder="••••••••" 
                            required 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="auth-btn" disabled={loading}>
                        {loading ? 'Logging in...' : 'Sign In'}
                    </button>
                </form>
                
                <div className="auth-link">
                    Don't have an account? <Link to="/register">Register here</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
