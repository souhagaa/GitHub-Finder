import React, { useState } from 'react'
import propTypes from 'prop-types'

const Search = ({ showClear, clearUsers, searchUsers, setAlert}) => {
   
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
                    value="search"
                    className="btn btn-dark btn-block"
                />
            </form>
            {showClear && <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>}

        </div>
    )

}

Search.propTypes = {
        searchUsers: propTypes.func.isRequired,
        clearUsers: propTypes.func.isRequired,
        setAlert: propTypes.func.isRequired,
        showClear: propTypes.bool.isRequired
    }

export default Search
