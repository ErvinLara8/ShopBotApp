import {
    ADDED_TO_CART,
    SEARCH_ZIP,
    SELECT_STORE,
    REMOVE_FROM_CART,
    CLEAR_CART,
} from '../actions/types'

var objectCart;

if(localStorage.getItem('items') !== null){
    objectCart = JSON.parse( localStorage.getItem('items') );
}else{
    objectCart = []
}

const initialState = {
    items: objectCart,
    zip: localStorage.getItem('zip'),
    storeID: localStorage.getItem('storeID')
}

export default function(state = initialState, action){
    switch(action.type){
        case ADDED_TO_CART:
        case REMOVE_FROM_CART:
            localStorage.setItem('items', JSON.stringify(action.updatedCart))
            return {
                ...state,
                items: action.updatedCart
            }
        case SEARCH_ZIP:
            localStorage.setItem('zip', action.zipcode)
            return{
                ...state,
                zip: localStorage.getItem('zip')
            }
        case SELECT_STORE:
            localStorage.setItem('storeID', action.selectedStore)
            return{
                ...state,
                storeID: localStorage.getItem('storeID')
            }
        case CLEAR_CART:
            localStorage.removeItem('items')
            localStorage.removeItem('zip')
            localStorage.removeItem('storeID')
            return{
                ...state,
                items: action.updatedCart,
                zip: "",
                storeID: -1
            }
        default:
            return state
    }
}