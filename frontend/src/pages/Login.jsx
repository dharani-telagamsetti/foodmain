import React, { useState, useEffect } from 'react';
import { useAuth } from '../App';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useToast } from '../context/ToastContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { login, authMessage, setAuthMessage } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const showToast = useToast();

  useEffect(() => {
    if (authMessage) {
      showToast(authMessage, 'info');
      setAuthMessage('');
    }
  }, [authMessage, setAuthMessage, showToast]);

  useEffect(() => {
    // Reset hover effects or any lingering styles when navigating to this page
    const links = document.querySelectorAll('a');
    links.forEach((link) => {
      link.classList.remove('hover');
    });
  }, []);

  const validate = () => {
    const nextErrors = {};
    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      nextErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (!password) {
      nextErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    try {
      const { data } = await api.post('/auth/login', { email: email.trim(), password });

      showToast('Login successful! Welcome back.', 'success');
      login(data);
      setAuthMessage('');

      const redirectPath = location.state?.from || (data.role === 'admin' ? '/admin' : '/student-portal');
      navigate(redirectPath, { replace: true });
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Could not connect to server.';
      setErrors({ form: errorMsg });
      showToast(errorMsg, 'error');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80">
        {authMessage && (
          <p className="mb-4 rounded border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
            {authMessage}
          </p>
        )}
        {errors.form && (
          <p className="mb-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {errors.form}
          </p>
        )}
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-2 border rounded mt-1 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-2 border rounded mt-1 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Login
        </button>
        <p className="mt-4 text-center text-sm text-slate-600">
          New here?{' '}
          <Link to="/signup" className="font-semibold text-emerald-600 hover:text-emerald-700">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;