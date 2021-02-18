import React from 'react';
import ReactDOM from 'react-dom';
import LogInComp from './GroceryStoreComponents/LogIn/LogInComp';
import OrdersPage from './GroceryStoreComponents/OrdersPage/OrdersPage';
import EmployeePage from './GroceryStoreComponents/EmployeesPage/EmployeePage';
import { BrowserRouter,Route, Switch} from "react-router-dom";
import {Provider} from 'react-redux';
import store from '../store';
import PrivateGroceryRoute from './common/PrivateGroceryRoute'; 
import ProductsPage from './GroceryStoreComponents/ProductsPage/productsPage'; 
import {loadUser} from '../actions/auth'

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
                    <Route path="/" exact component={LogInComp} />
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