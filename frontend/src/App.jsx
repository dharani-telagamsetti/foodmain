import React, { useEffect, useMemo, useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import api from './services/api';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import StudentPortal from './pages/StudentPortal';
import MyOrders from './pages/MyOrders';
import DonationPortal from './pages/DonationPortal';
import NearbyNgos from './pages/NearbyNgos';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import About from './pages/About';

// Authentication Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authMessage, setAuthMessage] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await api.get('/auth/me');
        setIsAuthenticated(true);
        setUser(data);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (e) {
      console.error(e);
    } finally {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      user,
      isLoading,
      authMessage,
      setAuthMessage,
      login,
      logout,
    }),
    [isAuthenticated, user, isLoading, authMessage]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, isLoading, setAuthMessage } = useAuth();
  const location = useLocation();

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!isAuthenticated) {
    setAuthMessage('Please log in or sign up to continue.');
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/student-portal" replace />;
  }

  return children;
};

const PublicAuthOnly = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  return isAuthenticated ? <Navigate to="/student-portal" replace /> : children;
};

import { ToastProvider } from './context/ToastContext';

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/login" element={<PublicAuthOnly><Login /></PublicAuthOnly>} />
                <Route path="/signup" element={<PublicAuthOnly><Signup /></PublicAuthOnly>} />
                <Route path="/admin-login" element={<PublicAuthOnly><AdminLogin /></PublicAuthOnly>} />
                <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/student-portal" element={<ProtectedRoute allowedRoles={['student', 'admin']}><StudentPortal /></ProtectedRoute>} />
                <Route path="/dashboard" element={<Navigate to="/student-portal" replace />} />
                <Route path="/orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
                <Route path="/donations" element={<ProtectedRoute><DonationPortal /></ProtectedRoute>} />
                <Route path="/nearby-ngos" element={<ProtectedRoute><NearbyNgos /></ProtectedRoute>} />
                <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
                <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
