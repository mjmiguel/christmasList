/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react';

// import stylesheet
// import ./scss/main.scss

const QueryBox = (props) => {
  const { users } = props;
  if (!users) return null;
  const [user, setUser] = useState(users[0].name);
  const [foundList, setFoundList] = useState(users[0].wishlist);

  const options = [];
  users.forEach((user) => {
    options.push(
      <option id={user.user_id} value={user.name}>{user.name}</option>,
    );
  });
  const handleSubmit = (e) => {
    // fetch user data with hooked state
    e.preventDefault();
    for (let i = 0; i < users.length; i += 1) {
      if (users[i].name === e.target.value) {
        console.log('target val ', e.target.value);
        setFoundList(users[i].wishlist);
      }
    }
    console.log('found a match ', user, foundList);
  };
  
  console.log(users);
  return (
    <div>
      <h3>Query Box</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="list">View a wishlist</label>
        <br />
        <select id="list" onChange={(e) => setUser(e.target.value)}>
          {options}
        </select>
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};

export default QueryBox;
