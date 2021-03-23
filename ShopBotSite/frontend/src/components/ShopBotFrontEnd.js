import React from 'react';
import ReactDOM from 'react-dom';
import LogInComp from './GroceryStoreComponents/LogIn/LogInComp';
import OrdersPage from './GroceryStoreComponents/OrdersPage/OrdersPage';
import EmployeePage from './GroceryStoreComponents/EmployeesPage/EmployeePage';
import { BrowserRouter,Route, Switch} from "react-router-dom";
import {Provider} from 'react-redux';
import store from '../store';
import PrivateGroceryRoute from './common/PrivateGroceryRoute'; 
import PrivateUserRoute from './common/PrivateUserRoute';
import ProductsPage from './GroceryStoreComponents/ProductsPage/productsPage'; 
import UserLogInComp from './UserComponents/UserLogIn/UserLogIn';
import PlaceOrderPage from './UserComponents/PlaceOrderPage/PlaceOrderPage';
import CartPage from './UserComponents/CartPage/CartPage';
import OrderHistoryPage from './UserComponents/OrderHistory/OrderHistoryPage';
import UserRegistration from './UserComponents/UserRegistration/UserRegistration';
import {loadUser} from '../actions/auth';


class ShopBotFrontEnd extends React.Component{
    componentDidMount(){
        store.dispatch(loadUser());
    }

    render(){ 

        return(
        <Provider store={store}>
            
            {/* // All of the apps routes are determined here */}
            
                <BrowserRouter>
                {/*Switch allows only on route to render at a time.
                Routes render from first to last, if the route is not
                found we render a 404 error*/}
                <Switch>
                    <Route path="/" exact component={UserLogInComp} />
                    <Route path="/UserRegistration" exact component={UserRegistration}/>
                    <Route path="/GroceryStoreLogIn" exact component={LogInComp} />
                    <PrivateUserRoute path="/PlaceOrderPage" exact component={PlaceOrderPage} />
                    <PrivateUserRoute path="/CartPage" exact component={CartPage} />
                    <PrivateUserRoute path="/UserOrderHistory" exact component={OrderHistoryPage} />
                    <PrivateGroceryRoute path="/OrdersPage" exact component={OrdersPage}/>
                    <PrivateGroceryRoute path="/EmployeePage" exact component={EmployeePage}/>
                    <PrivateGroceryRoute path="/GroceryStoreProductsPage" exact component={ProductsPage}/>
                </Switch>
                </BrowserRouter>
        </Provider>

        );
    }
}


ReactDOM.render(
    <React.StrictMode>
      <ShopBotFrontEnd />
    </React.StrictMode>,
    document.getElementById('app')
  );