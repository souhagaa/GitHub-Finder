import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import Search from './components/users/Search'
import Alert from './components/layout/Alert'
import About from './components/pages/About'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
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

  clearUsers = () => this.setState({ users: [], loading: false })

  setAlert = (msg, type) => {
    this.setState({
      alert: {
        msg: msg,
        type: type
      }
    })
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
    const { loading, users, alert } = this.state
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
            </Switch>

          </div>

        </div>
      </Router>

    );
  }
}

export default App;
