import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = (props) => {
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <label htmlFor="password">Password:</label>
      <input
        value={password}
        type="password"
        id="login-password"
        name="login-password"
        onChange={(e) => { handleChange(e); }}
      />
    </div>
  );
};

export default Login;
