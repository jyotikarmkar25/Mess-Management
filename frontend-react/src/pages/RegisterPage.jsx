import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        if (!formData.fullname || !formData.email || !formData.password) {
            setError('All fields are required');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }
        if (formData.password.length < 6) {
            setError('Password should be at least 6 characters');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        
        if (!validateForm()) return;

        setLoading(true);
        try {
            await register(formData.email, formData.password, formData.fullname);
            setSuccess('Account created successfully! Redirecting...');
            setTimeout(() => {
                navigate('/dashboard');
            }, 1500);
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
                    background: linear-gradient(135deg, #0f172a 0%, #020617 100%);
                    padding: 2rem;
                }
                .auth-card {
                    background: rgba(30, 41, 59, 0.7);
                    backdrop-filter: blur(16px);
                    padding: 3rem;
                    border-radius: 28px;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                    width: 100%;
                    max-width: 450px;
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
                .status-msg {
                    padding: 0.85rem;
                    border-radius: 12px;
                    margin-bottom: 1.5rem;
                    font-size: 0.85rem;
                    border: 1px solid transparent;
                    line-height: 1.4;
                }
                .error-msg {
                    background: rgba(239, 68, 68, 0.1);
                    color: #f87171;
                    border-color: rgba(239, 68, 68, 0.2);
                }
                .success-msg {
                    background: rgba(34, 197, 94, 0.1);
                    color: #4ade80;
                    border-color: rgba(34, 197, 94, 0.2);
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
                    padding: 0.85rem 1.1rem;
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
                <h2>Sign Up</h2>
                
                {error && <div className="status-msg error-msg">{error}</div>}
                {success && <div className="status-msg success-msg">{success}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input 
                            type="text" 
                            name="fullname"
                            placeholder="John Doe" 
                            required 
                            value={formData.fullname}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input 
                            type="email" 
                            name="email"
                            placeholder="name@company.com" 
                            required 
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            name="password"
                            placeholder="••••••••" 
                            required 
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input 
                            type="password" 
                            name="confirmPassword"
                            placeholder="••••••••" 
                            required 
                            value={formData.confirmPassword}
                            onChange={handleChange}
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
