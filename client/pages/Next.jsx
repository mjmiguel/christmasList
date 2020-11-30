/* eslint-disable arrow-body-style */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dog from '../assets/next.jpg';

const Next = (props) => {
  return (
    <div className="router">
      <main>
        <img alt="dog" src={dog} height="300" width="500" />
        <h3>your list has been submitted :)</h3>
        <section style={{ display: 'inline' }}>
          <Link to="/">
            <button type="button">Home</button>
          </Link>

          <Link to="/submit">
            <button type="button">Try Again</button>
          </Link>
        </section>
      </main>
    </div>
  );
};

export default Next;
