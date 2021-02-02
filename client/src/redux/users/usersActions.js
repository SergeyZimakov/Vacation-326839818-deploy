import * as request from '../../components/utils/apiFunctions';
import * as errorsActions from '../errors/errorsActions';

export const USER_LOGGED_IN = 'user_logged_in';
export const USER_REGISTERED = 'user_registered';
export const USER_NOT_REGISTERED = 'user_not_registered';
export const USER_LOGGED_OUT = 'user_logged_out';

export const logIn = (data) => async dispatch => {
    try {

        const response = await request.post('/api/users/login', data);
        if (response.error) {
            console.log(response.error);
            dispatch(errorsActions.showErrors([response.error]))
        }
        else {
            dispatch({type: USER_LOGGED_IN, user: response.data});
        }
    }
    catch(err) {
        console.log(err);
        dispatch(errorsActions.showErrors(['Undefined error']));
    }
}

export const register = (data) => async dispatch => {
    try {

        const response = await request.post('/api/users/register', data);
        if (response.error) {
            console.log(response.error);
            dispatch(errorsActions.showErrors([response.error]))
        }
        else {
            console.log(response.data);
            dispatch({type: USER_REGISTERED});
        }
    }
    catch(err) {
        console.log(err);
        dispatch(errorsActions.showErrors(['Undefined error']));
    }
}

export const logout = () => async dispatch => {
    try {
        const response = await request.post('api/users/logout');
        if (response.error) {
            console.log(response.error);
            dispatch(errorsActions.showErrors([response.error]));
        }
        else {
            console.log(response.data);
            dispatch({type: USER_LOGGED_OUT});
        }
    }
    catch(err) {
        console.log(err);
        dispatch(errorsActions.showErrors(['Undefined error']));
    }
}

export const setUserNotRegistered = () => dispatch => {
    dispatch({type: USER_NOT_REGISTERED});
}