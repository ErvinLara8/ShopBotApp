import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import LogInComp from './LogIn/LogInComp';
import OrdersPage from './OrdersPage/OrdersPage';
import EmployeePage from './EmployeePage/EmployeePage';
import {BrowserRouter, Route, Switch} from "react-router-dom";


class GroceryStoreApp extends React.Component{

    render(){

        return(
            // <Container>
            //     <Row>
            //         <Col><LogInComp /></Col>
            //     </Row>
            // </Container>

        // All of the apps routes are determined here
        <BrowserRouter>

            {/*Switch allows only on route to render at a time.
            Routes render from first to last, if the route is not
            found we render a 404 error*/}
            <Switch>
                <Route path="/" exact component={LogInComp} />
                <Route path="/OrdersPage" exact component={OrdersPage}/>
                <Route path="/EmployeePage" exact component={EmployeePage}/>
            </Switch>

        </BrowserRouter>
        );
    }
}

export default GroceryStoreApp