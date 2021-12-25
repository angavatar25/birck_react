import repoReducer from "./repoReducer";
import userReducer from './userReducer'

const reducerIndex = {
    user: userReducer,
    repo: repoReducer
}

export default reducerIndex