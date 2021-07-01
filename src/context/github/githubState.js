import React , {useReducer} from 'react'
import axios from 'axios'
import GithubContext from './githubContext'
import GithubReducer from './githubReducer'
import {
    SERACH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS
} from '../types'

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false,
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState)

    //Search GitHub users
    const searchUsers = async (text) => {
        text && setLoading()
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=
        ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
        ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

        dispatch({
            type: SERACH_USERS,
            payload: res.data.items
        })
    }
    // Get single GitHub user
    const getUser = async (username) => {
        setLoading()

        const res = await axios.get(`https://api.github.com/users/${username}?client_id=
        ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
        ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

        dispatch({
            type: GET_USER,
            payload: res.data
        })
    }

    // Get user's repositories
    const getUserRepos = async (username) => {
        setLoading()

        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=
        ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
        ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
        
         dispatch({
            type: GET_REPOS,
            payload: res.data
        })
    
    }
    // Clear users
      // Clear users from the state
    const clearUsers = () => dispatch({
        type: CLEAR_USERS
    })

    // Set loading
    const setLoading = () => dispatch({
        type: SET_LOADING
    })
    // we have to wrap our entire app with the provider
    // we pass as props anything that we want available for the entire app
    return <GithubContext.Provider value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
    }}>        
    {/* because we need to wrap our entire app in the provider */}

        {props.children} 
    </GithubContext.Provider>
}

export default GithubState