import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../context/auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => (isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      ))}
    />
  );
};

export default PrivateRoute;
