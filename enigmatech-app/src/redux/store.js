import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

import { authReducer } from './reducers/authReducer';
import { favoritesReducer } from './reducers/favoritesReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth: authReducer,
    favorites: favoritesReducer,
});


export const store = createStore(
    reducers, 
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

export default store;
