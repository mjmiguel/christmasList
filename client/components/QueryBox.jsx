/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import EditorJs from 'react-editor-js';
import Paragraph from '@editorjs/paragraph';
import { EDITOR_JS_TOOLS } from '../editorTools';

const QueryBox = (props) => {
  const { users } = props;
  const [user, setUser] = useState(users[0].name);
  const [userList, setUserList] = useState(null);
  const mappedLists = users.reduce((acc, curr) => {
    acc[curr.name] = curr.wishlist;
    return acc;
  }, {});

  // create dropdown options from fetched users
  const options = [];
  users.forEach((u) => {
    options.push(
      <option id={u.user_id} value={u.name}>
        {u.name}
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
        <select className="form-control" id="list" onChange={(e) => setUser(e.target.value)}>
          {options}
        </select>
        <br />
        <input type="submit" value="submit" />
        <br />
        <div className="wishlist-display">
          {userList && (
            <div className="list-card">
              <EditorJs
                enableReInitialize
                readOnly
                data={JSON.parse(userList)}
                // paragraph with alignment does not support readonly
                // replacing here with default paragraph
                holder="list-card-list"
                minHeight={0}
                tools={{ ...EDITOR_JS_TOOLS, paragraph: { class: Paragraph } }}
              >
                <section id="list-card-list" style={{ display: 'flex' }} />
              </EditorJs>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default QueryBox;
