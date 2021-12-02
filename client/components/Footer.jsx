/* eslint-disable arrow-body-style */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import other components

// import stylesheet
// import ./scss/main.scss

const Footer = (props) => {
  return (
    <footer>
      <Link to="/about">
        <p>about</p>
      </Link>
    </footer>
  );
};

export default Footer;
