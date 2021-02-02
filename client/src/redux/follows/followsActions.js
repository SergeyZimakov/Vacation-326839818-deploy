import * as request from '../../components/utils/apiFunctions';
import * as errorsActions from '../../redux/errors/errorsActions';
import * as vacationsActions from '../vacations/vacationsActions';


export const makeFollow = (data) => async dispatch => {
    try {
        const response = await request.post('api/follows', data);
        if (response.error) {
            console.log(response.error);
            dispatch(errorsActions.showErrors([response.error]))
        }
        else {
            dispatch(vacationsActions.fetchVacations());
            console.log(response.data);
        }
    }
    catch(err) {
        console.log(err);
        dispatch(errorsActions.showErrors(['Undefined error']));
    }
}

export const makeUnFollow = (data) => async dispatch => {
    try {

        const response = await request.deleteReq('api/follows/unfollow', data);
        if (response.error) {
            console.log(response.error);
            dispatch(errorsActions.showErrors([response.error]))
        }
        else {
            dispatch(vacationsActions.fetchVacations());
            console.log(response.data);
        }
    }
    catch(err) {
        console.log(err);
        dispatch(errorsActions.showErrors(['Undefined error']));
    }
}
