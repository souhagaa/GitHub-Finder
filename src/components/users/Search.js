import React, { Component } from 'react'
import propTypes from 'prop-types'

class Search extends Component {
    state = {
        text: '',
    }

    static propTypes = {
        searchUsers: propTypes.func.isRequired,
        clearUsers: propTypes.func.isRequired,
        setAlert: propTypes.func.isRequired,
        showClear: propTypes.bool.isRequired
    }

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = (e) => {
        e.preventDefault();

        this.state.text === '' ?
            this.props.setAlert('Please enter something', 'light') :
            this.props.setAlert(null, null); this.props.searchUsers(this.state.text); this.setState({ text: '' })
    }

    render() {
        const { showClear, clearUsers } = this.props
        return (
            <div>
                <form className="form" onSubmit={this.handleSubmit} >
                    <input
                        type="text"
                        name="text"
                        placeholder="Search users..."
                        value={this.state.text}
                        onChange={this.handleChange} />
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
}



export default Search
