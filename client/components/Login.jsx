import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import fetch from 'node-fetch';

const Login = (props) => {
  const [password, setPassword] = useState('');
  const [validation, setValidation] = useState(false);
  const [lenValidation, setLenValidation] = useState(true);

  useEffect(() => {

  }, [lenValidation]);

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('form submit', e.target.value);
    if (process.env !== 'test') {
      if (password.length > 0) {
        setLenValidation(true);
        // send fetch
        // set validation
      } else {
        // render some text validation
        setLenValidation(false);
      }
    }
  };

  return (
    <div>
      <form action={handleSubmit}>
        <label htmlFor="password">Password:</label>
        <input
          value={password}
          type="password"
          id="login-password"
          name="login-password"
          onChange={(e) => { handleChange(e); }}
        />
        {lenValidation ? null : <div>probably not a valid password</div>}
        <input 
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
};

export default Login;
