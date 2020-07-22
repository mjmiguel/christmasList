/* eslint-disable arrow-body-style */
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// import other components
import Home from './components/Home';
import About from './components/About';
import SubmitList from './components/SubmitList';
import Next from './components/Next';

// import stylesheet
// import ./scss/main.scss

const App = props => {
  return (
    <div className="router">
      <main>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/submit">
            <SubmitList/>
          </Route>
          <Route exact path="/about">
            <About/>
          </Route>
          <Route exact path="/next">
            <Next />
          </Route>
        </Switch>
      </main>
    </div>
  );
};

export default App;
