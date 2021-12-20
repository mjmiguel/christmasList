import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../context/auth';
import bubs from '../assets/bubs.png';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authTokens, tokenVerified, setTokenVerified, verifyTokens } = useAuth();

  // check token each time the component rendered changes
  useEffect(() => {
    if (authTokens) {
      verifyTokens(authTokens);
    }
  }, [Component]);

  // if no auth tokens (initial load), change tokenverified to false
  useEffect(() => {
    if (!authTokens) setTokenVerified(false);
  }, [tokenVerified]);

  return (
    <Route
      {...rest}
      render={(props) => {
        switch (tokenVerified) {
          case true:
            return <Component {...props} />;
          case false:
            return <Redirect to={{ pathname: '/login', state: { referer: props.location } }} />;
          case 'loading':
            return (
              <div>
                <img className="loading" src={bubs} alt="bubs" height="200px" width="200px" />
              </div>
            );
          default:
            console.error('something wrong in privateROute switch');
        }
      }}
    />
  );
};

export default PrivateRoute;
