/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React from 'react';

// import stylesheet
// import ./scss/main.scss

const UsersTable = (props) => {
  const { users, usersFetched } = props;
  if (!usersFetched) {
    return (
      <div>
        <h1>gifters and giftee</h1>
        <h1>A table of users</h1>
        <div className="col">
          <h3>Loading users, please wait...</h3>
        </div>
      </div>
    );
  }
  // loop through users and add each to the array to be displayed
  const rows = [];
  if (usersFetched) {
    users.forEach((user) => {
      rows.push(
        <tr>
          <td>{user.name}</td>
          <br></br>
          <td>{user.giftee}</td>
        </tr>,
      );
    });
  }

  return (
    <div>
      <div className="col">
        <table className="table table-sm">
          <tbody>
            <tr>
              <td><h3>Gifter</h3></td>
              <td><h3>Giftee</h3></td>
            </tr>
            {rows}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
