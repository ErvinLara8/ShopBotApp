import {CHECK_STORE_LOGIN } from '../actions/types.js';

const initialState = {
    grocery_is_logged_in: false
}

export default function(state = initialState, action){
    switch(action.type){
        case CHECK_STORE_LOGIN :
            return {
                ...state,
                grocery_is_logged_in: action.checked_login
            }
        default:
            return state
    }
}