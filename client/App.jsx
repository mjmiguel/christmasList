/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AuthContext } from './context/auth';

// import other components
import Login from './pages/Login';
import Home from './pages/Home';
import About from './pages/About';
import SubmitList from './pages/SubmitList';
import Next from './pages/Next';
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorPage from './pages/Error';
import PrivateRoute from './components/PrivateRoute';

// import stylesheet
import './stylesheets/styles.scss';

const App = (props) => {
  const existingTokens = JSON.parse(localStorage.getItem('tokens'));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    localStorage.setItem('tokens', JSON.stringify(data));
    setAuthTokens(data);
  };

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
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
