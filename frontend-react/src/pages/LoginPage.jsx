import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Auth.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        // Support mock credentials
        if (email === 'admin@test.com' && password === '1234') {
             await login(email, password);
             navigate('/dashboard');
             return;
        }

        try {
            await login(email, password);
            navigate('/dashboard'); 
        } catch (err) {
            setError('Failed to log in: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError('');
        try {
            await loginWithGoogle();
            navigate('/dashboard');
        } catch (err) {
            setError('Google login failed: ' + err.message);
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="glass-card">
                <div className="auth-header">
                    <h2>Welcome Back</h2>
                    <p>Enter your credentials to access your dashboard</p>
                </div>

                {error && (
                    <div className="error-message">
                        <i className="fas fa-exclamation-circle"></i>
                        <span>{error}</span>
                    </div>
                )}

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <div className="input-wrapper">
                            <input 
                                type="email" 
                                placeholder="name@university.edu" 
                                required 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <i className="fas fa-envelope"></i>
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label>Password</label>
                        <div className="input-wrapper">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                placeholder="••••••••" 
                                required 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button 
                                type="button" 
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                tabIndex="-1"
                            >
                                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="auth-btn" disabled={loading}>
                        {loading ? (
                            <span><i className="fas fa-spinner fa-spin"></i> Processing...</span>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>
                
                <div className="divider">Or continue with</div>
                
                <button onClick={handleGoogleLogin} className="google-btn">
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="18" />
                    Google Account
                </button>
                
                <div className="auth-footer">
                    New student? <Link to="/register">Create Account</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
