import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Repos from '../Repos/Repos'
import Spinner from '../layout/Spinner'
import propTypes from 'prop-types'

export class User extends Component {

    componentDidMount() {
        this.props.getUser(this.props.match.params.login)
        this.props.getUserRepos(this.props.match.params.login)
    }

    static propTypes = {
        getUser: propTypes.func.isRequired,
        getUserRepos: propTypes.func.isRequired,
        loading: propTypes.bool.isRequired,
        user: propTypes.object.isRequired,
        repos: propTypes.array.isRequired,
    }

    render() {

        const { name,
            avatar_url,
            location,
            bio, blog,
            login,
            html_url,
            followers,
            following,
            public_repos,
            public_gists,
            company,
            hireable 
        } = this.props.user
        const { loading, repos} = this.props;
        return loading ? <Spinner/> : (
        <Fragment>
            <Link to='/' className='btn btn-light'>
                Back to Search
            </Link>
            Hireable: {' '}
            {hireable ? (
            <i className="fas fa-check text-success"/>) : (
            <i className="fas fa-times-circle text-danger"/>
            )}
            <div className="card grid-2">
                <div className="all-center">
                    <img 
                        className="round-img" 
                        src={avatar_url} 
                        alt="avatar pic" 
                        style={{width: '150px'}}/>
                    <h1>{name}</h1>
                    <p>Location: {location}</p>
                </div>
                <div>
                    {bio && <Fragment>
                        <h3>Bio</h3>
                        <p>{bio}</p>
                        </Fragment>}
                    <a href={html_url} target="_blank" className="btn btn-dark my-1">Visit GitHub profile</a>
                    <ul>
                        <li>
                            {login && <Fragment>
                                <strong>Username:</strong> {login}
                                </Fragment>}
                        </li>
                        <li>
                            {company && <Fragment>
                                <strong>Company:</strong> {company}
                                </Fragment>}
                        </li>
                        <li>
                            {blog && <Fragment>
                                <strong>Website:</strong> <a href={blog} target="_blank">{blog}</a>
                                </Fragment>}
                        </li>
                    </ul>
                </div>
                
            </div>
            <div className="card text-center">
                <button type="button" className="btn btn-primary btn-lg" disabled>
                Followers <span className="badge badge-light">{followers}</span>
                </button>
                
                <button type="button" className="btn btn-success btn-lg" disabled>
                Following <span className="badge badge-light">{following}</span>
                </button>

                <button type="button" className="btn btn-dark btn-lg" disabled>
                Public repos<span className="badge badge-light">{public_repos}</span>
                </button>

                <button type="button" className="btn btn-warning btn-lg" disabled>
                Public gists <span className="badge badge-light">{public_gists}</span>
                </button>
                    {/* <div className="badge-primary" style={{width: '50%', display: 'block'}}>Followers: {followers}</div> 
                    <div className="badge-success" style={{width: '50%'}}>Following: {following}</div>  
                    <div className="badge-light" style={{width: '50%'}}>Public repos: {public_repos}</div>  
                    <div className="badge-dark" style={{width: '50%'}}>Public gists: {public_gists}</div>   */}
                </div>
                <Repos repos={repos}/>
        </Fragment>)
        
        
    }
}

export default User
