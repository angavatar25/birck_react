import React, {useEffect, useState} from 'react'
import { ButtonPagination, CardContent, Grid, Pagination, PaginationContainer, SearchInput, SelectDropdown, Title } from '../styles';
import '../App.css'
import { connect } from 'react-redux';
import { getSearchRepository, getSearchUser, getUserDetail } from '../redux/action';
import CardList from '../components/CardList';
import CardRepoList from '../components/CardRepoList';

function IndexPage(props) {
    const [name, setname] = useState('')
    const [userChoice, setuserChoice] = useState('')
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
    const showResult = async (page) => {
        const data = {
            q: name,
            per_page: 100,
            page: page
        }
        await setcurrentPage(page)
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
    const usersCard = (data) => data.map((index, i) => 
        (
            <CardList
                userName={index.login}
                key={i}
                img={index.avatar_url}
                name={index.login}
            />
        )
    )
    const repoCard = (data) => data.map((index, i) =>
            (
                <CardRepoList
                    key={i}
                    repoName={index.full_name}
                    img={index.owner.avatar_url}
                />
            )
    )
    const userChoiceDropdown = (e) => {
        setuserChoice(e.target.value)
        setname('')
    }
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
            <SelectDropdown onChange={userChoiceDropdown}>
                <option value="" hidden>
                    Type
                </option>
                <option value="users">Users</option>
                <option value="repo">Repository</option>
            </SelectDropdown>
            <CardContent>
                {
                    initial ? <p>Type to search users or repositories</p> : 
                    props.userData.length > 0 || props.repositoryData.length > 0 ?
                    <Grid>
                        {
                            userChoice === 'users' ? 
                            usersCard(props.userData) : userChoice === 'repo' ?
                            repoCard(props.repositoryData) : <p>Please choose user/repo</p>
                        }
                    </Grid> : <p>No user/repository found</p>
                }
            </CardContent>
            <div>
                {
                    initial ? '' : 
                    props.userData.length > 0 || props.repositoryData.length > 0 ?
                    <PaginationContainer>
                        <ButtonPagination disabled={currentPage === 1} onClick={() => prevPage()}>Prev</ButtonPagination>
                        {
                            range.map((index, i) => {
                                return(
                                    currentPage === index.name ? 
                                    <Pagination key={i} isActive = {true} >{index.name}</Pagination> :
                                    <Pagination isActive={false} key={i} onClick={() => showResult(index.name)}>{index.name}</Pagination>
                                )
                            })
                        }
                        <ButtonPagination disabled={currentPage === totalPage} onClick={() => nextPage()}>Next</ButtonPagination>
                    </PaginationContainer> : ''
                }
            </div>
        </div>
    )
}

const reduxState = (state) => ({
    userData: state.user.data,
    repositoryData: state.repo.repository,
    user: state.user,
    repo: state.repo
})

const reduxDispatch = (dispatch) => ({
    getUsers: (data) => dispatch(getSearchUser(data)),
    getRepository: (data) => dispatch(getSearchRepository(data)),
    getUserDetail: (data) => dispatch(getUserDetail(data))
})

export default connect(reduxState, reduxDispatch) (IndexPage)
