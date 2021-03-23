import axios from 'axios';

import {
    USER_AUTH_ERROR,
    USER_LOG_IN_FAIL,
    USER_LOG_IN_SUCCESS,
    USER_LOADED,
    GROCERY_AUTH_ERROR,
    GROCERY_USER_LOADED,
    USER_LOADING,
    GROCERY_LOG_IN_FAIL,
    GROCERY_LOG_IN_SUCCESS,
    USER_LOG_OUT
} from './types';

// Checks Token & Loads User
export const loadUser = () => (dispatch, getState) => {

    // // user loading
    dispatch({ type: USER_LOADING });

    // getting token from state
    const token = getState().auth.token

    // checking if employee
    const isEmployee = getState().auth.isEmployee

    // getting user ID
    const userID = getState().auth.userID

    // Headers 
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }

    // if token exist add to header
    if(token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    if(isEmployee === true){

        const body = JSON.stringify({
            user_ID: userID
        });

        axios.post('/api/auth/GetEmployeesAPI/get_manager_and_store/', body, config)
        .then(res => {
            dispatch({
                type: GROCERY_USER_LOADED,
                userInfo: res.user_id,
                groceryInfo: res.store_ID
            })
        }).catch(err =>{
            console.log(err)
            dispatch({
                type:GROCERY_AUTH_ERROR
            })
        });
    }else {

        console.log(userID)
        const body = JSON.stringify({
            user_ID: userID
        });

        axios.post('/api/auth/UserActionsAPI/get_user/', body, config)
        .then(res => {
            console.log(res)
            dispatch({
                type: USER_LOADED,
                userInfo: res,
            })
        }).catch(err =>{
            console.log(err)
            dispatch({
                type: USER_AUTH_ERROR
            })
        });

    }
}


// log in for store
export const logInGrocery = (email, storeID, password) => dispatch => {
     
    // Headers 
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }

    const body = JSON.stringify({
        email: email,
        store_ID: storeID,
        password: password
    });

    axios.post('/api/auth/EmployeesStoreAPI/grocery_admin_log_in/', body, config)
        .then(res => {
           
            dispatch({
                type: GROCERY_LOG_IN_SUCCESS,
                newToken: res.data.token,
                userID: res.data.user_info.id,
                userInfo: res.data.user_info,
                groceryInfo: res.data.store_info
            });
            
        }).catch(err =>{
            console.log(err)
            dispatch({
                type:GROCERY_LOG_IN_FAIL
            })
        });
}

// log in for User
export const logInUser = (email, password) => dispatch => {
     
    // Headers 
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }

    const body = JSON.stringify({
        email: email,
        password: password
    });

    axios.post('/api/auth/UserLogInAPI/user_log_in/', body, config)
        .then(res => {
            dispatch({
                type: USER_LOG_IN_SUCCESS,
                newToken: res.data.token,
                userID: res.data.user_info.id,
                userInfo: res.data.user_info,
            })
            
        }).then(()=>{return true}).catch(err =>{
            console.log(err)
            dispatch({
                type:USER_LOG_IN_FAIL
            })
        }).then(()=>{return false});
}



// log out for either user or store

export const logOut = () => (dispatch, getState) =>{

    // getting token from state
    const token = getState().auth.token

    // Headers 
    // const config = {
    //     headers: {
    //         'Authorization': `Token ${token}`,
    //     }
    // }

    // console.log(config.headers)

    fetch('/api/auth/logout/',
    {
        method: 'POST',
        headers: {
            'Authorization': `Token ${token}`
        },
    }
    )
        .then(
            dispatch({
                type: USER_LOG_OUT,
            })
        ).catch(err =>{
            console.log(err)
            dispatch({
                type: GROCERY_AUTH_ERROR
            })
        });
}