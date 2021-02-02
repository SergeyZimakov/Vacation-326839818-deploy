import * as request from '../../components/utils/apiFunctions';
import * as errorsActions from '../../redux/errors/errorsActions';

export const VACATION_ADDED = 'vacation/added';
export const VACATIONS_FETCHED = 'vacations/fetched';
export const VACATION_EDITED = 'vacation/edited';

export const addVacation = (data) => async dispatch => {
    try {

        const response = await request.axiosPost('/api/vacations', data);
        if (response.error) {
            console.log(response.error);
            dispatch(errorsActions.showErrors([response.error]))
        }
        else {
            dispatch(fetchVacations());
            console.log(response.data);
        }
    }
    catch(err) {
        console.log(err);
        dispatch(errorsActions.showErrors(['Undefined error']));
    }
}

export const fetchVacations = () => async dispatch => {
    try {

        const response = await request.get('/api/vacations');
        if (response.error) {
            console.log(response.error);
            dispatch(errorsActions.showErrors([response.error]))
        }
        else {
            dispatch({type: VACATIONS_FETCHED, list: response.data});
        }
    }
    catch(err) {
        console.log(err);
        dispatch(errorsActions.showErrors(['Undefined error']));
    }
}

export const editVacation = (id, data) => async dispatch => {
    try {

        const response = await request.post(`/api/vacations/${id}`, data);
        if (response.error) {
            console.log(response.error);
            dispatch(errorsActions.showErrors([response.error]))
        }
        else {
            console.log(response.data);
            dispatch(fetchVacations());
        }
    }
    catch(err) {
        console.log(err);
        dispatch(errorsActions.showErrors(['Undefined error']));
    }
}

export const deleteVacation = (id) => async dispatch => {
    try {
        const response = await request.deleteReq(`api/vacations/delete/${id}`);
        if (response.error) {
            console.log(response.error);
            dispatch(errorsActions.showErrors([response.error]))
        }
        else {
            console.log(response.data);
            dispatch(fetchVacations());
        }
    }
    catch(err) {
        console.log(err);
        dispatch(errorsActions.showErrors(['Undefined error']));
    }
}