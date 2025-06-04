import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthService from '../utils/auth';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  if (!AuthService.loggedIn()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
