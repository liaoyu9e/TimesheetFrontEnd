import { applyMiddleware, createStore, combineReducers} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { user } from './userReducer';
import { weektime } from './weektimeReducer';

const middleware = applyMiddleware(thunk, logger);

const reducer = combineReducers({
    user: user,
    weektime: weektime
});

export const store = createStore(reducer, middleware);