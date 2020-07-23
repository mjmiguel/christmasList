/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// import stylesheet
// import ./scss/main.scss

class SubmitList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersFetched: false,
      users: null,
      userToSend: null,
      userListToSend: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // get initial list of users
    fetch('/users')
      .then((res) => res.json())
      .then((users) => {
        this.setState({ usersFetched: true, users });
      })
      .catch((err) => console.log('Home.componentDidMount: get users: ERROR: ', err));
  }

  // update state based on user input
  handleChange(event) {
    if (event.target.id === 'myWishList') {
      this.setState({ ...this.state, userListToSend: event.target.value });
    } else if (event.target.id === 'name') {
      this.setState({ ...this.state, userToSend: event.target.value });
    }
  }

  handleSubmit(event) {
    const { userToSend, userListToSend } = this.state;
    event.preventDefault();
    const settings = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userToSend, userListToSend }),
    };
    fetch('/users', settings)
      .then((res) => res.json())
      .then((data) => {
        console.log('data ', data);
        this.props.history.push('/next');
      }).catch((err) => {
        console.log(err);
        this.props.history.push('/error');
      });
  }

  render() {
    const { users, usersFetched } = this.state;
    if (!usersFetched) {
      return (
        <div>
          <h3>LOADIN...</h3>
        </div>
      );
    }
    // populate dropdown menu with users
    const options = [];
    users.forEach((user) => {
      options.push(
        <option id={user.user_id} value={user.name}>{user.name}</option>,
      );
    });

    return (
      <div>
        <main>
          <h1>SubmitList</h1>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="name">Who are you?</label>
            <br />
            <select id="name" onChange={this.handleChange}>
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
              onChange={this.handleChange}
            />
            <br />
            <br />
            <input type="submit" value="submit" />
          </form>
        </main>
      </div>
    );
  }
}

export default SubmitList;
