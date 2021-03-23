import axios from 'axios';

import {
    ADDED_TO_CART,
    SEARCH_ZIP,
    SELECT_STORE,
    REMOVE_FROM_CART,
    CLEAR_CART,
} from './types';

export const addNewItemToCart = (item, amount) => (dispatch, getState) => {

    var currentCart = getState().cart.items

    var addedItems = [item, amount]

    currentCart.push(addedItems);

    dispatch({
        type: ADDED_TO_CART,
        updatedCart: currentCart,
    });
}

export const setGlobalZip = (zip) => (dispatch) => {
    dispatch({
        type: SEARCH_ZIP,
        zipcode: zip
    });
}

export const setGlobalStore = (store) => (dispatch) => {
    dispatch({
        type: SELECT_STORE,
        selectedStore: store
    });
}


export const removeFromCart = (itemNum) => (dispatch, getState) => {
    var currentCart = getState().cart.items

    currentCart.splice(itemNum, 1);

    dispatch({
        type: REMOVE_FROM_CART,
        updatedCart: currentCart
    });
}

export const clearCart = () => (dispatch) => {
    var clearCart = [];
    dispatch({
        type: CLEAR_CART,
        updatedCart: clearCart
    });
}

export const placeOrder = (totalCost) => (dispatch, getState) => {
    
    var orderPlaced = false; 
    var orderInfo = "";
    var itemCount = 0;


    const orderDate = new Date().toJSON().slice(0, 19);

    const token = getState().auth.token
    const userID = getState().auth.userID
    const storeID = getState().cart.storeID
    const cart = getState().cart.items
    

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        }
    }

    for(var i = 0; i < cart.length ; i++){
       itemCount = itemCount + cart[i][1];
    }

    const mainOrderBody = JSON.stringify({
        user_ID: userID,
        store_ID: storeID,
        date: orderDate,
        item_count: itemCount,
        total: totalCost,
        completed: false

    });


    var itemList = [];

    var detailRes = "";

    axios.post('/api/auth/OrdersAPI/create_order/', mainOrderBody, config)
        .then(res => {
            orderInfo = res.data;
        }).then(() => {

            for(var i = 0; i < cart.length ; i++){
                itemList.push(
                    {
                        order_ID: orderInfo.order_ID,
                        wanted_num: cart[i][1],
                        listing_ID: cart[i][0]['listing_ID']
                    }
                );
            }
        
            const orderDetails = JSON.stringify(itemList);

            axios.post('/api/auth/OrdersAPI/add_order_details/', orderDetails, config)
        .then(res => {
            detailRes = res.data;
        }).then(()=>{

            if(detailRes !== 0){
                return true
            }else{
                return false
            }

        }).catch(err =>{

            console.log(err)
            return false
            });

        }).catch(err =>{
            console.log(err)
            return false
        });

    return true

}
