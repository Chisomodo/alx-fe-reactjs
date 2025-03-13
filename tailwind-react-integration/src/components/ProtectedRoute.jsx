// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Route, Redirect } from 'react-router-dom';


function ProtectedRoute({ component: Component, ...rest }) {
  const { isAuthenticated } = useAuth(); // Destructure the authentication status

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" /> // Redirect to login if not authenticated
        )
      }
    />
  );
}

export default ProtectedRoute;