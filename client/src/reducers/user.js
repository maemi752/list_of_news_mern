import {LOGIN, LOGOUT} from '../constants/actionTypes';


const defaultState = {
    currentUser: {},
    isAuth: false
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true
            }
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                currentUser: {},
                isAuth: false
            }
        default:
            return state
    }
}

export const logout = () => ({type: LOGOUT})

export default reducer;
