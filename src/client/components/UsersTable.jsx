/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React from 'react';

const UsersTable = (props) => {
  const { users } = props;

  const gifteesToObj = users.reduce((prev, curr) => {
    prev[curr.name] = { ...curr };
    return prev;
  }, {});

  // loop through users and add each to the array to be displayed
  const rows = users.map((user) => {
    const gifteeStatus = gifteesToObj[user.giftee].wishlist.includes('no list yet :)');
    return (
      <tr key={user.id} className="table-row">
        <td>{user.name}</td>
        <td> {'---------->'} </td>
        <td>{user.giftee}</td>
        <td>{gifteeStatus ? '   ' : ' ☑️ '}</td>
      </tr>
    );
  });

  return (
    <div>
      <div>
        <table>
          <thead>
            <th>
              <h3>Gifter</h3>
            </th>
            <th />
            <th>
              <h3>Giftee</h3>
            </th>
            <th />
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
