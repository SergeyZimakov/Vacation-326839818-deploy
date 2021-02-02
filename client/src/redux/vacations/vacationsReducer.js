import * as ACTIONS from './vacationsActions';

const initialState = {
    followedVacations: [],
    vacations: []
}

const vacationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.VACATION_ADDED:
            return {...state};
        case ACTIONS.VACATIONS_FETCHED:
            return{...state, followedVacations: action.list.followedVacations, vacations: action.list.vacations}
        default:
            return state;
    }
}

export default vacationsReducer;