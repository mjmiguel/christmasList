import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { HotModuleReplacementPlugin } from 'webpack';

// import other comps
// ---> giftee/gifter table
// ---> wish list look up

// class home 
// fetch users list and populate table || show 'loading'
// store users in state

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersFetched: false,
      users: {},
    };
    // methods to fetch users
  }

  componentDidMount() {
    // get initial list of users
    fetch('/users')
      .then((res) => res.json)
      .then((users) => {
        // add users to state
        // change usersFetched: true;
      })
      .catch((err) => console.log('Home.componentDidMount: get users: ERROR: ', err))
  }

  render() {
    const { users } = this.state;
    if (!users) return null;

    return (
      <div className='main-container'>
        <div className='container'>

        </div>
        <div className='container'>

        </div>
        <div className='container'>

        </div>
      </div>
    );
    // get list of users and populate a div with each one with their giftee
  }
}

export default Home;