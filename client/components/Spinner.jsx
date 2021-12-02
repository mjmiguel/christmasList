import React from 'react';
import bubs from '../assets/bubs.png';

const Spinner = (props) => {
  return (
    <div>
      <img className="loading" src={bubs} alt="bubs" height="200px" width="200px" />
    </div>
  );
};

export default Spinner;
