import * as ACTIONS from './errorsActions'


const initialState = {
    errorsList: []
}

const errorsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.SHOW_ERRORS:
            return {...state, errorsList: action.errorsList};
        case ACTIONS.CLEAR_ERRORS:
            return {...state, errorsList: []};
        default:
            return state;
    }
}

export default errorsReducer;