import React from 'react';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ isLoggedIn, element }) {
  const result = isLoggedIn ? element : <Navigate to="/sign-in" />;
  return result;
}
