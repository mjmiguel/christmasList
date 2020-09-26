/* eslint-disable arrow-body-style */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Login = (props) => {
  return (
    <div>
      <label htmlFor="password">Password:</label>
      <input type="password" id="login-password" name="login-password" />
    </div>
  );
};
