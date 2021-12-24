import React, {useEffect, useState} from 'react'
import { CardContent, Grid, Pagination, SearchInput, SelectDropdown, Title } from '../styles';
import '../App.css'
import { connect } from 'react-redux';
import { getSearchRepository, getSearchUser, getUserDetail } from '../redux/action';
import CardList from '../components/CardList';
import CardRepoList from '../components/CardRepoList';

function IndexPage(props) {
    const [name, setname] = useState('')
    const [userChoice, setuserChoice] = useState('users')
    const [initial, setinitial] = useState(false)
    const [currentPage, setcurrentPage] = useState(1)
    const totalPage = parseInt(10)
    const maxPage = parseInt(4)
    const range = []
    const maxVisibleButton = () => {
        if (totalPage < 4) {
            return totalPage
        } else {
            return maxPage
        }
    }
    const startPage = () => {
        if(currentPage === 1) {
            return 1
        }
        if(currentPage === totalPage) {
            return totalPage - maxVisibleButton() + 1
        }
        return currentPage - 1
    }
    const endPage = () => {
        return Math.min(startPage() + maxVisibleButton() - 1, totalPage)
    }
    for(var i = startPage(); i <= endPage(); i++) {
        range.push({
            name: i,
            isDisabled: i === currentPage
        })
    }
    const nextPage = () => {
        setcurrentPage(currentPage + 1)
        showResult(currentPage + 1)
    }
    const prevPage = () => {
        setcurrentPage(currentPage - 1)
        showResult(currentPage - 1)
    }
    const showResult = (page) => {
        const data = {
            q: name,
            per_page: 100,
            page: page
        }
        setcurrentPage(page)
        if(userChoice === 'users') {
            props.getUsers(data)
        } else if(userChoice === 'repo') {
            props.getRepository(data)
        }
    }
    useEffect(() => {
        if(name !== '') {
            setinitial(false)
            const data = {
                q: name,
                per_page: 100,
            }
            var timeOutId
            if(userChoice === 'users') {
                timeOutId = setTimeout(() =>
                    props.getUsers(data), 500
                )
            } else if(userChoice === 'repo') {
                timeOutId = setTimeout(() =>
                    props.getRepository(data), 500
                )
            }
            return () => clearTimeout(timeOutId)
        } else {
            setinitial(true)
        }
    },[name])
    return (
        <div className='app-container'>
            <div>
                <Title>Github Searcher</Title>
            </div>
            <SearchInput 
                value={name}
                onChange={event => setname(event.target.value)}
                placeholder='Type to search users or repositories...'>
            </SearchInput>
            <SelectDropdown onChange={(e) => setuserChoice(e.target.value)}>
                <option value="" hidden>
                    Type
                </option>
                <option value="users">Users</option>
                <option value="repo">Repository</option>
            </SelectDropdown>
            <CardContent>
                {
                    initial ? <p>Type to search for a user/repository</p> :
                    <Grid>
                        {
                            userChoice === 'users' ? props.userData && props.userData.map((index, i) => {
                            return (
                                <CardList
                                    userName={index.login}
                                    key={i}
                                    img={index.avatar_url}
                                    name={index.login}
                                />
                            )
                            }) : props.repositoryData && props.repositoryData.map((index, i) => {
                                return (
                                    <CardRepoList
                                        key={i}
                                        repoName={index.full_name}
                                        img={index.owner.avatar_url}
                                    />
                                )
                            })
                        }
                    </Grid>
                }
            </CardContent>
            <div>
                {
                    initial ? '' : 
                    <div style={{display: 'flex', gap: '1.5rem'}}>
                        <button onClick={() => prevPage()}>Prev</button>
                        {
                            range.map((index, i) => {
                                return(
                                    currentPage === index.name ? 
                                    <Pagination key={i} isActive = {true} >{index.name}</Pagination> :
                                    <Pagination isActive={false} key={i} onClick={() => showResult(index.name)}>{index.name}</Pagination>
                                )
                            })
                        }
                        <button onClick={() => nextPage()}>Next</button>
                    </div>
                }
            </div>
        </div>
    )
}

const reduxState = (state) => ({
    userData: state.user.data,
    repositoryData: state.repo.repository
})

const reduxDispatch = (dispatch) => ({
    getUsers: (data) => dispatch(getSearchUser(data)),
    getRepository: (data) => dispatch(getSearchRepository(data)),
    getUserDetail: (data) => dispatch(getUserDetail(data))
})

export default connect(reduxState, reduxDispatch) (IndexPage)
