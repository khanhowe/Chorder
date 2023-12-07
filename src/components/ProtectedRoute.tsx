import React from 'react';
import { useAuth } from '../auth/AuthContext';
import { Navigate } from 'react-router-dom'; // Assuming you're using react-router

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;