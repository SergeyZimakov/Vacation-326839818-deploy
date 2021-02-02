export const SHOW_ERRORS = 'show/errors';
export const CLEAR_ERRORS = 'clear/errors';


export const clearErrors = () => dispatch => {
    dispatch({type: CLEAR_ERRORS})
}

export const showErrors = (err) => dispatch => {
    const errorsList = [];
    err[0].forEach(e => errorsList.push(e));
    dispatch({type: SHOW_ERRORS, errorsList})
}