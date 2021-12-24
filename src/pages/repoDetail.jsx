import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router'
import { getRepoDetail } from '../redux/action'
import { GitProfile, ProfileFollowersDetail, ProfilePictureDetail } from '../styles'

function RepoDetail(props) {
    const {repo_name, sub_repo} = useParams()
    const url = repo_name + '/' + sub_repo
    const [repoDetails, setrepoDetails] = useState({
        repositoryName: {
            name: 'Repository Name',
            val: props.repoDetail.full_name
        },
        author: {
            name: 'Author',
            val: props.repoDetail.owner.login
        },
        stars: {
            name: 'Stars',
            val: props.repoDetail.stargazers_count
        },
        forks: {
            name: 'Forks',
            val: props.repoDetail.forks_count
        }
    })
    useEffect(() => {
        props.getRepoDetail(url)
    },[])
    const LinkRepo = (url) => {
        window.open(url, "_blank").focus()
    }
    return (
        <div className='app-container'>
            <div className="repo-detail">
                <div className="flex">
                    <ProfilePictureDetail Img={props.repoDetail.owner.avatar_url}/>
                    <div className='my-auto'>
                        <p className='detail-name'>{props.repoDetail.name}</p>
                        <GitProfile onClick={() => LinkRepo(props.repoDetail.html_url)}>
                            <i className="fab fa-github mr-10"></i>
                            {props.repoDetail.html_url}
                        </GitProfile>
                    </div>
                </div>
                <ProfileFollowersDetail>
                    {
                        Object.keys(repoDetails).map((key, i) => {
                            return (
                                <div className='flex-1' key={i}>
                                    <p>{repoDetails[key].name}</p>
                                    <p className='number-24 font-bold'>{repoDetails[key].val}</p>
                                </div>
                            )
                        })
                    }
                </ProfileFollowersDetail>
            </div>
        </div>
    )
}

const reduxState = (state) => ({
    repoDetail: state.repo.repoDetail
})

const reduxDispatch = (dispatch) => ({
    getRepoDetail: (data) => dispatch(getRepoDetail(data))
})

export default connect(reduxState, reduxDispatch)(RepoDetail)
