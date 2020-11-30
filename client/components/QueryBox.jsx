/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import bubs from '../assets/bubs.png';
import EditorJs from 'react-editor-js';
import { EDITOR_JS_TOOLS } from '../editorTools';
import Paragraph from '@editorjs/paragraph';

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

  // create dropdown options from fetched users
  const options = [];
  users.forEach((user) => {
    options.push(
      <option id={user.user_id} value={user.name}>
        {user.name}
      </option>,
    );
  });

  const handleSubmit = (e) => {
    // set currently displayed list from matching entry in mappedList
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
              <EditorJs
                holder="list-card-list"
                enableReInitialize={true}
                data={JSON.parse(userList)}
                // paragraph with alignment does not support readonly
                // replacing here with default paragraph
                tools={{ ...EDITOR_JS_TOOLS, paragraph: { class: Paragraph } }}
                readOnly={true}
                minHeight={0}
              >
                <section id="list-card-list" style={{ display: 'flex' }}></section>
              </EditorJs>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default QueryBox;
