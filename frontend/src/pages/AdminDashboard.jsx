import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../App';
import AdminQRScanner from './AdminQRScanner';

const AdminDashboard = () => {
  const { user } = useAuth();

  // Redirect non-admins to home
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // Show QR Scanner interface for admin
  return <AdminQRScanner />;
};

export default AdminDashboard;
