import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '../reducer'

const config = {
    key: "root",
    storage: storage,
    whitelist: ['user', 'repo']
}

let persistedReducer = persistCombineReducers(config,reducer)

const middleware = [thunk]

const Store = () => {
    let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(...middleware)))
    let persistor = persistStore(store)
    return {
        store, persistor
    }
}

export default Store