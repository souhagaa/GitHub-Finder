import React, { useState ,Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar'
import Alert from './components/layout/Alert'

import Users from './components/users/Users'
import User from './components/users/User'
import Search from './components/users/Search'

import About from './components/pages/About'

import GithubState from './context/github/githubState'

const App = () => {

  const [alert, setAlert] = useState({ msg: null,type: null})


  // Set an alert for when the user submits a search without typing anything
  const alertMsg = (msg, type) => {
    setAlert({msg: msg, type:type})

    // to make the alert go away in 5s
    setTimeout(() => {
      setAlert({msg: null,type: null})
    }, 5000);
  }

    return (
      <GithubState>
        <Router>
          <div className="App" >
            <Navbar />
            <div className="container">
              {alert.msg !== null && <Alert alert={alert} />}
              <Switch>
                <Route
                  exact
                  path="/"
                  render={props => (
                    <Fragment>
                      <Search
                        setAlert={alertMsg} />
                      <Users/>
                    </Fragment>
                  )} />
                <Route exact path='/about' component={About} />
                <Route exact
                  path='/user/:login'
                  render={props => (
                    <User {...props} />
                  )} />

              </Switch>

            </div>

          </div>
        </Router>
      </GithubState>
    );
  
}

export default App;
