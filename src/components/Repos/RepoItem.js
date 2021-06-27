import React from 'react'
import propTypes from 'prop-types'


const RepoItem = ({repo}) => {
    return (
        <div className="card">
            <h3>
                <a href={repo.html_url}>{repo.name}</a>
            </h3>
        </div>
    )
}

RepoItem.propTypes = {
    repo: propTypes.object.isRequired
}

export default RepoItem
