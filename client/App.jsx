/* eslint-disable arrow-body-style */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

// import other components
import Login from './components/Login';
import Home from './components/Home';
import About from './components/About';
import SubmitList from './components/SubmitList';
import Next from './components/Next';
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorPage from './components/Error';

// import stylesheet
import './stylesheets/styles.scss';

const App = props => {
  return (
    <div className="router">
      <Header />
      <main>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route exact path="/submit" component={SubmitList} />
          <Route exact path="/about" component={About} />
          <Route exact path="/next" component={Next} />
          <Route exact path="/error" component={ErrorPage} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
};

export default App;
