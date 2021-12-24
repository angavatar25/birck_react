import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router'
import { getUserDetail } from '../redux/action'
import { GitProfile, ProfileFollowersDetail, ProfilePictureDetail } from '../styles'

function UserDetail(props) {
    const {user_name} = useParams()
    const [userData, setuserData] = useState({
        repositories: {
            name: 'Repositories',
            val: props.userDetail.public_repos
        },
        followers: {
            name: 'Followers',
            val: props.userDetail.followers
        },
        following: {
            name: 'Following',
            val: props.userDetail.following
        }
    })
    useEffect(() => {
        props.getUserDetail(user_name)
    },[])
    const LinkProfile = (url) => {
        window.open(url, "_blank").focus()
    }
    return (
        <div className='app-container'>
            {
                props.user.error ? 
                <p>{props.user.errorMessage}</p> : props.user.loading ? <p>Loading</p> :
                <div className='user-detail'>
                    <div className='flex'>
                        <ProfilePictureDetail Img={props.userDetail.avatar_url}/>
                        <div className='my-auto'>
                            <p className='detail-name'>{props.userDetail.name}</p>
                            <p>
                                <i className="fas fa-map-marker-alt mr-10"></i>
                                {props.userDetail.location ? props.userDetail.location : 'Not Available'}
                            </p>
                            <GitProfile onClick={() => LinkProfile(props.userDetail.html_url)}>
                                <i className="fab fa-github mr-10"></i>
                                {props.userDetail.html_url}
                            </GitProfile>
                        </div>
                    </div>
                    <ProfileFollowersDetail>
                        {
                            Object.keys(userData).map((key, i) => {
                                return (
                                    <div className='flex-1' key={i}>
                                        <p>{userData[key].name}</p>
                                        <p className='number-24 font-bold'>{userData[key].val}</p>
                                    </div>
                                )
                            })
                        }
                    </ProfileFollowersDetail>
                </div>
            }
        </div>
    )
}

const reduxState = (state) => ({
    userDetail: state.user.detail,
    user: state.user
})

const reduxDispatch = (dispatch) => ({
    getUserDetail: (data) => dispatch(getUserDetail(data))
})

export default connect(reduxState, reduxDispatch)(UserDetail)
