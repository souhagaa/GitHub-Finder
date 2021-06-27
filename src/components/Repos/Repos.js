import React from 'react'
import RepoItem from './RepoItem'
import propTypes from 'prop-types'

const Repos = ({repos}) => {
    return repos.map(repo => <RepoItem key={repo.id} repo={repo}/>)
}

Repos.propTypes = {
    repos: propTypes.array.isRequired,
}

export default Repos
