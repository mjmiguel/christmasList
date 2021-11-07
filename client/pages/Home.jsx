import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fetch from 'node-fetch';
import dog from '../assets/splash.png';

import UserTable from '../components/UsersTable';
import QueryBox from '../components/QueryBox';
import Spinner from '../components/Spinner';

const Home = (props) => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'test') {
      // get initial list of users
      fetch('/users')
        .then((res) => res.json())
        .then((u) => {
          setUsers(u);
        })
        .catch((err) => console.log('Home.useEffect: get users: ERROR: ', err));
    }
  }, []);

  return (
    <div className="main-container">
      <div className="container">
        <section>
          <img alt="splash" id="splash" src={dog} />
          <h1>Welcome!</h1>
          <Link
            to={{
              pathname: '/submit',
              users,
            }}
          >
            <button type="submit">Submit your List</button>
          </Link>
        </section>
        <div className="scroll-down-arrow">➮</div>
      </div>
      <div className="container">
        {users ? <UserTable users={users} /> : <Spinner />}
        <div className="scroll-down-arrow">➮</div>
      </div>
      <div className="container">{users ? <QueryBox users={users} /> : <Spinner />}</div>
    </div>
  );
};

export default Home;
