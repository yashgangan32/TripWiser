import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ element: Component }) {
  const { user } = useAuth();

  // Redirect to login if user is not authenticated
  return user ? Component : <Navigate to="/" replace />;
}

export default ProtectedRoute;
