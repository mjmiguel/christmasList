/* eslint-disable arrow-body-style */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// import stylesheet
// import ./scss/main.scss

const Header = (props) => {
  return (
    <header>
      <Link to="/">
        <h1>Christmas 2021</h1>
      </Link>
    </header>
  );
};

export default Header;
