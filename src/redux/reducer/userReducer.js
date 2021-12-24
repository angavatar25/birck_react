const initialState = {
    data: [],
    error: false,
    loading: false,
    detail: {},
    errorMessage: ''
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'GET_USERS':
            return {
                ...state,
                data: action.payload
            }
        case 'GET_USER_DETAILS':
            return {
                ...state,
                detail: action.payload
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