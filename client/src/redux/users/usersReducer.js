import * as ACTIONS from './usersActions'

const initialState = {
    currentUser: null,
    userRegistered: false
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.USER_LOGGED_IN:
            return {...state, currentUser: action.user};
        case ACTIONS.USER_REGISTERED:
            return {...state, userRegistered: true};
        case ACTIONS.USER_NOT_REGISTERED:
            return {...state, userRegistered: false};
        case ACTIONS.USER_LOGGED_OUT:
            return {...state, currentUser: null};
        default:
            return state;
    }
}

export default usersReducer;