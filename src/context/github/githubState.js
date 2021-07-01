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
        setLoading()
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=
        ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
        ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

        dispatch({
            type: SERACH_USERS,
            payload: res.data.items
        })
    }
    // Get user

    // Get repos 


    // Clear users

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
        searchUsers
    }}>        
    {/* because we need to wrap our entire app in the provider */}

        {props.children} 
    </GithubContext.Provider>
}

export default GithubState