import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        setLoading(true);
        try {
            await register(email, password, fullname);
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to create account: ' + err.message);
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
                    background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
                    padding: 2rem;
                }
                .auth-card {
                    background: rgba(22, 27, 34, 0.8);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    padding: 3rem;
                    border-radius: 24px;
                    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
                    width: 100%;
                    max-width: 450px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                .auth-card h2 {
                    margin-bottom: 2rem;
                    text-align: center;
                    font-size: 2rem;
                    font-weight: 800;
                    color: var(--text-primary);
                }
                .error-msg {
                    background: rgba(248, 81, 73, 0.1);
                    color: var(--danger);
                    padding: 0.75rem;
                    border-radius: 8px;
                    margin-bottom: 1.5rem;
                    font-size: 0.85rem;
                    border: 1px solid var(--danger);
                }
                .auth-card .form-group {
                    margin-bottom: 1.25rem;
                }
                .auth-card .form-group label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 600;
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    color: var(--text-secondary);
                }
                .auth-card input {
                    width: 100%;
                    padding: 0.8rem 1rem;
                    border-radius: 12px;
                    border: 1px solid var(--border);
                    background: var(--bg-primary);
                    color: var(--text-primary);
                    font-size: 1rem;
                }
                .auth-card input:focus {
                    outline: none;
                    border-color: var(--primary);
                    box-shadow: 0 0 0 2px var(--primary-soft);
                }
                .auth-btn {
                    background: var(--primary);
                    color: white;
                    border: none;
                    padding: 1rem;
                    border-radius: 12px;
                    width: 100%;
                    font-weight: 700;
                    cursor: pointer;
                    margin-top: 1rem;
                }
                .auth-btn:hover:not(:disabled) {
                    filter: brightness(1.1);
                }
                .auth-btn:disabled {
                    opacity: 0.6;
                }
                .auth-link {
                    text-align: center;
                    margin-top: 2rem;
                    color: var(--text-secondary);
                    font-size: 0.9rem;
                }
                .auth-link a {
                    color: var(--primary);
                    text-decoration: none;
                    font-weight: 600;
                }
            `}</style>
            <div className="auth-card">
                <h2>Register</h2>
                {error && <div className="error-msg">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input 
                            type="text" 
                            placeholder="Enter your full name" 
                            required 
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            required 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            placeholder="Create a password" 
                            required 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input 
                            type="password" 
                            placeholder="Confirm your password" 
                            required 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="auth-btn" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Register'}
                    </button>
                </form>
                <div className="auth-link">
                    Already have an account? <Link to="/login">Login here</Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
