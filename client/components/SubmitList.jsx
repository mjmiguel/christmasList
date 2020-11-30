/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React, { Component } from "react";
import fetch from "node-fetch";
import bubs from "../assets/bubs.png";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./editorTools";

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
    if (process.env.NODE_ENV !== "test") {
      // get initial list of users
      fetch("/users")
        .then((res) => res.json())
        .then((users) => {
          this.setState({ usersFetched: true, users });
        })
        .catch((err) =>
          console.log("SubmitList.componentDidMount: get users: ERROR: ", err)
        );
    }
  }

  // update state based on user input
  handleChange(data) {
    // save data if data is event object from dropdown and hide validdate div
    if (data.target) {
      this.setState({ ...this.state, userToSend: data.target.value });
      const validateDiv = document.getElementById("dropdown-validate");
      validateDiv.style.display = "none";
    } else {
      // save data passed from editorjs
      const validateDiv = document.getElementById("editor-validate");
      validateDiv.style.display = "none";
      // 'data' is an instance of editorJS
      data.saver
        .save()
        .then((outputData) => {
          this.setState({ ...this.state, userListToSend: outputData });
        })
        .catch((error) => {
          console.log("Saving failed: ", error);
        });
    }
  }

  handleSubmit(event) {
    const { userToSend, userListToSend } = this.state;
    event.preventDefault();
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userToSend, userListToSend }),
    };

    if (!userToSend || userToSend === "Choose") {
      // render validation for dropdown
      const validateDiv = document.getElementById("dropdown-validate");
      validateDiv.style.display = "block";
    } else if (!userListToSend || userListToSend.blocks.length === 0) {
      // render validation for editor text
      const validateDiv = document.getElementById("editor-validate");
      validateDiv.style.display = "block";
    } else {
      // send POST to update wishList
      fetch("/users", settings)
        .then((res) => res.json())
        .then((data) => {
          // send user to success page
          this.props.history.push("/next");
        })
        .catch((err) => {
          console.log("Error in list submit fetch", err);
        });
    }
  }

  render() {
    const { users, usersFetched } = this.state;
    if (!usersFetched) {
      return (
        <div>
          <img
            className="loading"
            src={bubs}
            alt="bubs"
            height="200"
            width="200"
          />
        </div>
      );
    }

    // populate dropdown menu with users
    const options = [];
    users.forEach((user) => {
      options.push(
        <option id={user.user_id} value={user.name}>
          {user.name}
        </option>
      );
    });

    return (
      <div className="container">
        <main>
          <h3 className="header">Submit your list</h3>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="name">Who are you?</label>
            <br />
            <select
              id="name"
              className="form-control"
              onChange={this.handleChange}
            >
              <option value="Choose">Choose...</option>
              {options}
            </select>
            <h1
              id="dropdown-validate"
              style={{ display: "none", color: "red" }}
            >
              Please choose a name
            </h1>
            <br />
            <br />
            <label htmlFor="myWishList">What would you like?</label>
            <br />
            <br />
            <EditorJs
              placeholder="Type Here. Select text for options"
              tools={EDITOR_JS_TOOLS}
              holder="editorjs-box"
              minHeight={50}
              onChange={this.handleChange}
            >
              <div id="editorjs-box"></div>
            </EditorJs>
            <h1 id="editor-validate" style={{ display: "none", color: "red" }}>
              Please enter a list
            </h1>
            <br />
            <input type="submit" value="submit" />
          </form>
        </main>
      </div>
    );
  }
}

export default SubmitList;
