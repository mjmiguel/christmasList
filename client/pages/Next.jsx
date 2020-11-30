/* eslint-disable arrow-body-style */
import React, { Component } from 'react';
import dog from '../assets/next.jpg';

const Next = props => {
  return (
    <div className="router">
      <main>
        <img alt="dog" src={dog} height="300" width="500" />
        <h3>your list has been submitted :)</h3>
      </main>
    </div>
  );
};

export default Next;
