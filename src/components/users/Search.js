import React, { useState, useContext } from 'react'
import propTypes from 'prop-types'
import GitHubContext from '../../context/github/githubContext'

const Search = ({ setAlert }) => {
    const githubContext = useContext(GitHubContext)
    const { searchUsers, users, clearUsers } = githubContext;
    
    const [text, setText] = useState('')

    const handleChange = (e) => setText(e.target.value)

    const handleSubmit = (e) => {
        e.preventDefault();

        text === '' ?
            setAlert('Please enter something', 'light') :
            setAlert(null, null); searchUsers(text); setText('')
    }
    return (
        <div>
            <form className="form" onSubmit={handleSubmit} >
                <input
                    type="text"
                    name="text"
                    placeholder="Search users..."
                    value={text}
                    onChange={handleChange} />
                <input
                    type="submit"
                    value="Search"
                    className="btn btn-dark btn-block"
                />
            </form>
            {users.length > 0 && <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>}

        </div>
    )

}

Search.propTypes = {
        setAlert: propTypes.func.isRequired
    }

export default Search
