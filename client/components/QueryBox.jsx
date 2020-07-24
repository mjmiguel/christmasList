/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import bubs from '../assets/bubs.png';

const QueryBox = (props) => {
  const { users } = props;
  if (!users) {
    return (
      <div>
        <img className="loading" src={bubs} alt="bubs" height="200px" width="200px" />
      </div>
    );
  }
  const [user, setUser] = useState(users[0].name);
  const [userList, setUserList] = useState(null);
  const mappedLists = users.reduce((acc, curr) => {
    acc[curr.name] = curr.wishlist;
    return acc;
  }, {});

  const options = [];
  users.forEach((user) => {
    options.push(
      <option id={user.user_id} value={user.name}>{user.name}</option>,
    );
  });
  const handleSubmit = (e) => {
    // fetch user data from mappedList
    e.preventDefault();
    setUserList(mappedLists[user]);
  };

  return (
    <div>
      <h3 className="header">List Lookup</h3>
      <form id="queryBox" onSubmit={handleSubmit}>
        <label htmlFor="list">View a wishlist</label>
        <br />
        <select id="list" className="form-control" onChange={(e) => setUser(e.target.value)}>
          {options}
        </select>
        <br />
        <input type="submit" value="submit" />
        <br />
        <div className="wishlist-display">
          {userList && (
          <div className="list-card">
            <section id="list-card-list">{userList}</section>
          </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default QueryBox;
