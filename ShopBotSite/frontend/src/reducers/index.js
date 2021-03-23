import {combineReducers } from 'redux';
import auth from './auth.js';
import cart from './cart.js';

export default combineReducers({
    auth,
    cart
});