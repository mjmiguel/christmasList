/* eslint-disable arrow-body-style */
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AuthContext } from './context/auth';

// import other components
import Login from './components/Login';
import Home from './components/Home';
import About from './components/About';
import SubmitList from './components/SubmitList';
import Next from './components/Next';
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorPage from './components/Error';
import PrivateRoute from './components/PrivateRoute';

// import stylesheet
import './stylesheets/styles.scss';

const App = props => {
  return (
    <AuthContext.Provider value={false}>
      <BrowserRouter>
        <div className="router">
          <Header />
          <main>
            <Switch>
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute exact path="/submit" component={SubmitList} />
              <PrivateRoute exact path="/about" component={About} />
              <PrivateRoute exact path="/next" component={Next} />
              <PrivateRoute exact path="/error" component={ErrorPage} />
            </Switch>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
