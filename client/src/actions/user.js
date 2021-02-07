import { LOGIN } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const login = (user) => async (dispatch) => {
    try {
        const {data} = await api.login(user);
        dispatch({ type: LOGIN, payload: data });
        localStorage.setItem('token', data.token);
    } catch (error) {
        console.log(error.message)
    }
}

export const getUser = () => async (dispatch) => {
    try {
        const {data} = await api.user();
        dispatch({type: LOGIN, payload: data});
        localStorage.setItem('token', data.token);
    } catch (error) {
        console.log(error.message)
        localStorage.removeItem('token')
    }
}
