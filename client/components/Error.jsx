/* eslint-disable arrow-body-style */
import React from 'react';
import { Link } from 'react-router-dom';
import pic from '../assets/angery.jpeg';
// import other components

// import stylesheet
// import ./scss/main.scss

const ErrorPage = (props) => {
  return (
    <div className="container">
      <img src={pic} alt="dog" />
      <p>You didn't select a name when submitting your list</p>
      <h4>Would you like to try again?</h4>
      <Link to="/submit">
        <button type="button">Try Again</button>
      </Link>
    </div>
  );
};

export default ErrorPage;
