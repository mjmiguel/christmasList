import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import fetch from 'node-fetch';
import { useAuth } from '../context/auth';

const Login = (props) => {
  const [password, setPassword] = useState('');
  const [authValidation, setAuthValidation] = useState(null);
  const [lenValidation, setLenValidation] = useState(true);

  // referrer if trying to access page other than '/'
  const referer = '/' || props.location.state.referer;

  const { setAuthTokens, setTokenVerified, tokenVerified } = useAuth();

  // update hook to check password length
  useEffect(() => {}, [lenValidation]);

  // send request to compare login to db hash
  // set token generated from successful verification
  const handleSubmit = (e) => {
    e.preventDefault();
    if (process.env !== 'test') {
      if (password.length > 0) {
        setLenValidation(true);
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password }),
        };
        fetch('/auth/login', options)
          .then((res) => res.json())
          .then((data) => {
            const { authorized, token } = data;
            if (authorized && token) {
              setAuthTokens(token);
              setTokenVerified(true);
              setAuthValidation(true);
            } else {
              setAuthValidation(false);
            }
          })
          .catch((error) => {
            console.log('Error in Login.fetch: ', error);
          });
      } else {
        // render some text validation
        setLenValidation(false);
      }
    }
  };

  // check auth validation before render
  // redirect to referer page
  if (authValidation || tokenVerified === true) {
    return <Redirect to={referer} />;
  }

  return (
    <div className="container">
      <form
        id="login-form"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <label htmlFor="password">password:</label>
        <br />
        <input
          autoFocus="true"
          className="form-control"
          value={password}
          type="password"
          id="login-password"
          name="login-password"
          onChange={(e) => {
            setPassword(e.target.value);
            setAuthValidation(null);
            setLenValidation(true);
          }}
        />
        {lenValidation ? null : <div>probably not a valid password</div>}
        {authValidation === false ? <div>incorrect password</div> : null}
        <br />
        <br />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};

export default Login;
