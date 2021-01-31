import React from 'react';
import ReactDOM from 'react-dom';
import {Container, Row, Col} from 'react-bootstrap';
import LogInComp from './GroceryStoreComponents/LogIn/LogInComp';
import OrdersPage from './GroceryStoreComponents/OrdersPage/OrdersPage';
import {BrowserRouter, Route, Switch} from "react-router-dom";


class ShopBotFrontEnd extends React.Component{

    render(){

        return(

        // All of the apps routes are determined here
        <BrowserRouter>

            {/*Switch allows only on route to render at a time.
            Routes render from first to last, if the route is not
            found we render a 404 error*/}
            <Switch>
                <Route path="/" exact component={LogInComp} />
                <Route path="/OrdersPage" exact component={OrdersPage}/>
            </Switch>

        </BrowserRouter>

        );
    }
}


ReactDOM.render(
    <React.StrictMode>
      <ShopBotFrontEnd />
    </React.StrictMode>,
    document.getElementById('app')
  );