import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import cartReducer from './reducers';

const rootReducer = combineReducers({cartReducer})

const Store = createStore(rootReducer)

export default Store
