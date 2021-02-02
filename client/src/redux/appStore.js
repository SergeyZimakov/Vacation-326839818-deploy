import { applyMiddleware, combineReducers, createStore } from 'redux'
import usersReducer from './users/usersReducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import errorsReducer from './errors/errorsReducer';
import vacationsReducer from './vacations/vacationsReducer';
 
const appStore = createStore(
    combineReducers({
        users: usersReducer,
        vacations: vacationsReducer,
        errors: errorsReducer
    }),
    composeWithDevTools(applyMiddleware(thunk))   
);

export default appStore;