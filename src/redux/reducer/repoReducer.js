const initialState = {
    repository: [],
    repoDetail: {},
    error: false,
    loading: false,
    errorMessage: ''
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'GET_REPOSITORY':
            return {
                ...state,
                repository: action.payload
            }
        case 'GET_REPO_DETAILS':
            return {
                ...state,
                repoDetail: action.payload
            }
        case 'LOADING':
            return {
                ...state,
                loading: action.setLoading
            }
        case 'FETCH_ERROR':
            return  {
                ...state,
                error: action.show,
                errorMessage: action.payload
            }
        default: return state
    }
}

export default reducer