import React from 'react'
import { NavLink } from 'react-router-dom'
import { CardContainer, ProfileContainer } from '../styles'

export default function CardRepoList({img, repoName}) {
    return (
        <div>
            <NavLink 
                to={{
                    pathname: `/repo-detail/${repoName}`,
                    repoName: repoName,
                }}
            >
                <CardContainer>
                    <ProfileContainer Img={img}/>
                    <p>{repoName}</p>
                </CardContainer>
            </NavLink>
        </div>
    )
}
