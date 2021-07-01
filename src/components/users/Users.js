import React, { useContext } from 'react'
import UserItem from './UserItem'
import Spinner from '../layout/Spinner'
import GitHubContext from '../../context/github/githubContext'
 

const Users = () => {
    const githubContext = useContext(GitHubContext)
    const { users, loading } = githubContext;

    return (loading ? <Spinner /> :
        <div style={userStyle}>
            {users.map(user => (
                <UserItem key={user.id} user={user}
                />
            ))}
        </div>)
    }


const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
}

export default Users
