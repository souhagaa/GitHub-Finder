import React, { useState, useContext } from 'react'
import propTypes from 'prop-types'
import GitHubContext from '../../context/github/githubContext'

const Search = ({ showClear, clearUsers, setAlert}) => {
    const githubContext = useContext(GitHubContext)
    const [text, setText] = useState('')

    const handleChange = (e) => setText(e.target.value)

    const handleSubmit = (e) => {
        e.preventDefault();

        text === '' ?
            setAlert('Please enter something', 'light') :
            setAlert(null, null); githubContext.searchUsers(text); setText('')
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
            {showClear && <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>}

        </div>
    )

}

Search.propTypes = {
        clearUsers: propTypes.func.isRequired,
        setAlert: propTypes.func.isRequired,
        showClear: propTypes.bool.isRequired
    }

export default Search
