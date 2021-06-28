import React, { useState, useEffect ,Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar'
import Alert from './components/layout/Alert'

import Users from './components/users/Users'
import User from './components/users/User'
import Search from './components/users/Search'

import About from './components/pages/About'

import axios from 'axios'

import GithubState from './context/github/githubState'

const App = () => {

  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState({ msg: null,type: null})

  //Search GitHub users
  const searchUsers = async (text) => {
    setLoading(true)
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    setLoading(false)
    setUsers(res.data.items)

  }

  // Get single GitHub user
  const getUser = async (username) => {
    setLoading(true)

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    setLoading(false)
    setUser(res.data)
  }

  // Get user's repositories
  const getUserRepos = async (username) => {
    setLoading(true)

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    
    setLoading(false)
    setRepos(res.data)
 
  }

  // Clear users from the state
  const clearUsers = () => {setLoading(false)
                            setUsers([])}

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
                      searchUsers={searchUsers}
                      clearUsers={clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={alertMsg} />
                    <Users
                      loading={loading}
                      users={users} />
                  </Fragment>
                )} />
              <Route exact path='/about' component={About} />
              <Route exact
                path='/user/:login'
                render={props => (
                  <User 
                    {...props} 
                    getUser={getUser}
                    getUserRepos={getUserRepos}
                    repos={repos}
                    user={user} 
                    loading={loading} />
                )} />

            </Switch>

          </div>

        </div>
      </Router>
    </GithubState>
    );
  
}

export default App;
