/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

// import stylesheet
// import ./scss/main.scss

const SubmitList = (props) => {
  const { users } = props.location;
  // populate dropdown menu with users
  const options = [];
  users.forEach((user) => {
    options.push(
      <option id={user.user_id} value={user.name}>{user.name}</option>,
    );
  });

  // get user and wishlist with react hooks
  const [user, setUser] = useState('');
  const [wishlist, setWishList] = useState('');
  // const [userId, setUserId] = useState('1');
  const [submitted, setSubmitted] = useState('');

  // function to send form data to backend
  const handleSubmit = (e) => {
    e.preventDefault();
    const settings = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user, wishlist }),
    };
    if (user !== 'Choose') {
      fetch('/users', settings)
        .then((res) => res.json())
        .then((data) => {
          return props.history.push('/next');
        }).catch((err) => {
          return props.history.push('/error');
        });
    } else {
      // show an error message if choose is selected
      console.log('chooooose');
    }

  };

  return (
    <div>
      <main>
        <h1>SubmitList</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Who are you?</label>
          <br />
          <select id="name" onChange={(e) => setUser(e.target.value)}>
            <option value="Choose">Choose...</option>
            {options}
          </select>
          <br />
          <br />
          <label htmlFor="myWishList">What would you like?</label>
          <br />
          <textarea
            id="myWishList"
            cols="60"
            rows="10"
            placeholder="Type here"
            onChange={(e) => setWishList(e.target.value)}
          />
          <br />
          <br />
          <input type="submit" value="submit" />
        </form>
      </main>
    </div>
  );
};

export default SubmitList;
