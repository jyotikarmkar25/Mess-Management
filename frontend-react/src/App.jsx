import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboardPage from './pages/UserDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ProtectedRoute from './components/ProtectedRoute';

const DashboardRedirect = () => {
    const { user, loading } = useAuth();
    
    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
                Verifying session...
            </div>
        );
    }
    
    if (!user) return <Navigate to="/login" replace />;
    
    return <Navigate to={user.role === 'admin' ? '/admin-dashboard' : '/user-dashboard'} replace />;
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            <Route path="/admin-dashboard" element={
                <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboardPage />
                </ProtectedRoute>
            } />
            
            <Route path="/user-dashboard" element={
                <ProtectedRoute allowedRoles={['user']}>
                    <UserDashboardPage />
                </ProtectedRoute>
            } />
            
            <Route path="/dashboard" element={<DashboardRedirect />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
