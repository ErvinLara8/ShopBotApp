import {
    USER_LOADING,
    USER_LOADED,
    USER_AUTH_ERROR,
    USER_LOG_IN_FAIL,
    USER_LOG_IN_SUCCESS,
    GROCERY_USER_LOADED,
    GROCERY_AUTH_ERROR,
    GROCERY_LOG_IN_SUCCESS,
    GROCERY_LOG_IN_FAIL,
    USER_LOG_OUT
} from '../actions/types'


const initialSate = {
     token: localStorage.getItem('token'),
     isAuthenticated: false,
     isLoading: false,
     isEmployee: localStorage.getItem('is_employee'),
     user: null,
     userID: localStorage.getItem('userID'),
     groceryStore: null,
}

export default function(state = initialSate, action){
    switch(action.type){

        case USER_LOADING:
            return {
                ...state,
                isLoading: true,
                isAuthenticated: true
            }
        case GROCERY_LOG_IN_SUCCESS:
            localStorage.setItem('token', action.newToken),
            localStorage.setItem('is_employee', true),
            localStorage.setItem('userID', action.userID)
            return{
                ...state,
                token: localStorage.getItem('token'),
                isAuthenticated: true,
                isLoading: false,
                isEmployee: localStorage.getItem('is_employee'),
                user: action.userInfo,
                userID: localStorage.getItem('userID'),
                groceryStore: action.groceryInfo
            }
        case USER_LOG_IN_SUCCESS:
            localStorage.setItem('token', action.newToken),
            localStorage.setItem('is_employee', false),
            localStorage.setItem('userID', action.userID)
            return{
                ...state,
                token: localStorage.getItem('token'),
                isAuthenticated: true,
                isLoading: false,
                isEmployee: false,
                user: action.userInfo,
                userID: localStorage.getItem('userID'),
                groceryStore: null
            }
    
        case GROCERY_USER_LOADED:
            return{
                ...state,
                isAuthenticated: true,
                isLoading:false,
                user: action.userInfo,
                groceryStore: action.groceryInfo
            }
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated: true,
                isLoading:false,
                isEmployee: false,
                user: action.userInfo,
                groceryStore: null
            }
        case GROCERY_AUTH_ERROR:
        case GROCERY_LOG_IN_FAIL:
        case USER_AUTH_ERROR:
        case USER_LOG_IN_FAIL:
        case USER_LOG_OUT:
            localStorage.removeItem('token');
            localStorage.removeItem('is_employee');
            localStorage.removeItem('userID');
            return{
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                isEmployee: null,
                user: null,
                userID: null,
                groceryStore: null,
            }

        default:
            return state;
    }
}