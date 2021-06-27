import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar'
import Alert from './components/layout/Alert'

import Users from './components/users/Users'
import User from './components/users/User'
import Search from './components/users/Search'

import About from './components/pages/About'

import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      user: {},
      loading: false,
      alert: {
        msg: null,
        type: null
      }
    }
  }
  // async componentDidMount() {
  //   this.setState({ loading: true })

  //   const res = await axios.get(`https://api.github.com/users?client_id=
  //   ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
  //   ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

  //   this.setState({
  //     loading: false,
  //     users: res.data
  //   })
  // }

  //Search GitHub users
  searchUsers = async (text) => {
    this.setState({ loading: true })

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    this.setState({
      loading: false,
      users: res.data.items
    })

  }

  // Get single GitHub user
  getUser = async (username) => {
    this.setState({ loading: true })

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    this.setState({
      loading: false,
      user: res.data
    })
  }


  // Clear users from the state
  clearUsers = () => this.setState({ users: [], loading: false })

  // Set an alert for when the user submits a search without typing anything
  setAlert = (msg, type) => {
    this.setState({
      alert: {
        msg: msg,
        type: type
      }
    })
    // to make the alert go away in 5s
    setTimeout(() => {
      this.setState({
        alert: {
          msg: null,
          type: null
        }
      })
    }, 5000);
  }

  render() {
    const { loading, users, alert, user } = this.state
    return (
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
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert} />
                    <Users
                      loading={loading}
                      users={users} />
                  </Fragment>
                )} />
              <Route exact path='/about' component={About} />
              <Route exact
                path='/user/:login'
                render={props => (
                  <User {...props} getUser={this.getUser} user={user} loading={loading} />
                )} />

            </Switch>

          </div>

        </div>
      </Router>

    );
  }
}

export default App;
