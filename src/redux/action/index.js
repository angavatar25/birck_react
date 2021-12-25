import axios from "axios"

const API_URL = process.env.REACT_APP_API_URL

export const getSearchUser = (data) => async (dispatch, getState) => {
    try {
        const res = await axios.get(API_URL + '/search/users', {params: data})
        dispatch({type: 'GET_USERS', payload: res.data.items})
        dispatch({type: 'FETCH_ERROR',show: false})
    }   
    catch(e) {
        dispatch({
            type: 'FETCH_ERROR',
            payload: 'Failed to fetch from API',
            show: true
        })
    }
}

export const getSearchRepository = (data) => async (dispatch, getState) => {
    try {
        const res = await axios.get(API_URL + '/search/repositories', {params: data})
        dispatch({type: 'GET_REPOSITORY', payload: res.data.items})
        dispatch({type: 'FETCH_ERROR',show: false})
    }
    catch(e) {
        dispatch({
            type: 'FETCH_ERROR',
            payload: 'Failed to fetch from API',
            show: true
        })
    }
}

export const getUserDetail = (data) => async (dispatch) => {
    dispatch({type: 'LOADING', setLoading: true})
    try {
        const res = await axios.get(API_URL + '/users/' + data)
        dispatch({type: 'GET_USER_DETAILS',payload: res.data})
        dispatch({type: 'FETCH_ERROR', show: false})
        dispatch({type: 'LOADING',setLoading: false})
    }
    catch(e) {
        dispatch({
            type: 'FETCH_ERROR',
            payload: 'Failed to fetch from API',
            show: true
        })
    }
}

export const getRepoDetail = (data) => async (dispatch) => {
    dispatch({type: 'LOADING',setLoading: true})
    try {
        const res = await axios.get(API_URL + '/repos/' + data)
        dispatch({type: 'GET_REPO_DETAILS', payload: res.data})
        dispatch({type: 'FETCH_ERROR', show: false})
        dispatch({type: 'LOADING',setLoading: false})
    }
    catch(e) {
        dispatch({
            type: 'FETCH_ERROR',
            payload: 'Failed to fetch from API',
            show: true
        })
    }
}