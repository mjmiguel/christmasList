import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fetch from 'node-fetch';
import dog from '../assets/splash.png';

import UserTable from './UsersTable';
import QueryBox from './QueryBox';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersFetched: false,
      users: null,
    };
  }

  // todo: add environment variable for absolute path during testing
  componentDidMount() {
    if (process.env.NODE_ENV !== 'test') {
      // get initial list of users
      fetch('/users')
        .then((res) => res.json())
        .then((users) => {
          this.setState({ usersFetched: true, users });
        })
        .catch((err) => console.log('Home.componentDidMount: get users: ERROR: ', err));
    }
  }

  render() {
    const { users, usersFetched } = this.state;

    return (
      <div className="main-container">
        <div className="container">
          <section>
            <img alt="splash" id="splash" src={dog} />
            <h1>Welcome!</h1>
            <Link to={
              {
                pathname: '/submit',
                users,
                usersFetched,
              }
            }
            >
              <button type="submit">Submit your List</button>
            </Link>
          </section>
        </div>
        <div className="container">
          <UserTable users={users} usersFetched={usersFetched} />
        </div>
        <div className="container">
          <QueryBox users={users} />
        </div>
      </div>
    );
  }
}

export default Home;
