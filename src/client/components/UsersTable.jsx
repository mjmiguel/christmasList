/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React from 'react';

const UsersTable = (props) => {
  const { users } = props;
  // loop through users and add each to the array to be displayed
  const rows = users.map((user) => (
    <tr key={user.id} className="table-row">
      <td>{user.name}</td>
      <td> {'---------->'} </td>
      <td>{user.giftee}</td>
    </tr>
  ));

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
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
