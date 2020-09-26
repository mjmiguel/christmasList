import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Login from './components/Login';

// TODO: add session auth
const authenticated = false;

render(
  <BrowserRouter>
    {authenticated ? <App /> : <Login />}
  </BrowserRouter>,
  document.getElementById('root'),
);
