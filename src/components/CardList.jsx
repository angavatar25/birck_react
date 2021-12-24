import React from 'react'
import { NavLink } from 'react-router-dom'
import { CardContainer, ProfileContainer } from '../styles'

export default function CardList({img, name, userName}) {
    return (
        <NavLink 
            to={{
                pathname: `/user-detail/${userName}`,
                userName: userName
            }}
        >
            <CardContainer>
                <ProfileContainer Img={img}/>
                <p>{name}</p>
            </CardContainer>
        </NavLink>
    )
}
