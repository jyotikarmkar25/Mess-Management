import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleLoginSuccess = (user) => {
        if (user.role === 'admin') {
            navigate('/admin-dashboard');
        } else {
            navigate('/user-dashboard');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            // Redirection will be handled by the effect in Dashboard or we can check role here if we wait for auth state
            // But usually onAuthStateChanged in AuthContext will trigger a re-render
            // For now, let's just navigate to dashboard and let it handle the role-based routing
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
                    max-width: 420px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                .auth-card h2 {
                    margin-bottom: 2rem;
                    text-align: center;
                    font-size: 2rem;
                    font-weight: 800;
                    color: var(--text-primary);
                    letter-spacing: -0.02em;
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
                    margin-bottom: 1.5rem;
                }
                .auth-card .form-group label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 600;
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
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
                    transition: var(--transition);
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
                    transition: var(--transition);
                }
                .auth-btn:hover:not(:disabled) {
                    filter: brightness(1.1);
                    transform: translateY(-1px);
                }
                .auth-btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }
                .google-btn {
                    background: white;
                    color: #333;
                    border: 1px solid #ddd;
                    padding: 0.8rem;
                    border-radius: 12px;
                    width: 100%;
                    font-weight: 600;
                    cursor: pointer;
                    margin-top: 1rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    transition: var(--transition);
                }
                .google-btn:hover {
                    background: #f8f9fa;
                    border-color: #ccc;
                }
                .divider {
                    display: flex;
                    align-items: center;
                    text-align: center;
                    margin: 1.5rem 0;
                    color: var(--text-muted);
                    font-size: 0.8rem;
                }
                .divider::before, .divider::after {
                    content: '';
                    flex: 1;
                    border-bottom: 1px solid var(--border);
                }
                .divider:not(:empty)::before { margin-right: 1rem; }
                .divider:not(:empty)::after { margin-left: 1rem; }
                
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
                .auth-link a:hover {
                    text-decoration: underline;
                }
            `}</style>
            <div className="auth-card">
                <h2>Login</h2>
                {error && <div className="error-msg">{error}</div>}
                <form onSubmit={handleSubmit}>
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
                            placeholder="Enter your password" 
                            required 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="auth-btn" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                
                <div className="divider">OR</div>
                
                <button onClick={handleGoogleLogin} className="google-btn">
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="18" />
                    Sign in with Google
                </button>
                
                <div className="auth-link">
                    Don't have an account? <Link to="/register">Register here</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
