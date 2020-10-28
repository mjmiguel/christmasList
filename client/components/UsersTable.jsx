/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React from 'react';
import bubs from '../assets/bubs.png';

const UsersTable = (props) => {
  const { users, usersFetched } = props;
  if (!usersFetched) {
    return (
      <div>
        <img className="loading" src={bubs} alt="bubs" height="200px" width="200px" />
      </div>
    );
  }
  // loop through users and add each to the array to be displayed
  const rows = [];
  if (usersFetched) {
    users.forEach((user) => {
      rows.push(
        <tr className="table-row">
          <td>{user.name}</td>
          <td> ----------> </td>
          <td>{user.giftee}</td>
        </tr>
      );
    });
  }

  return (
    <div>
      <div>
        <table>
          <thead>
            <th><h3>Gifter</h3></th>
            <th></th>
            <th><h3>Giftee</h3></th>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
