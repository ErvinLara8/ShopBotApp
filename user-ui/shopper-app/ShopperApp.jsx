import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import LogInComp from './LogIn/LogInComp';
import {BrowserRouter, Route, Switch} from "react-router-dom";


class ShopperApp extends React.Component{

    render(){

        return(
            <Container>
                <Row>
                    <Col><LogInComp /></Col> 
                </Row>
            </Container>

        // All of the apps routes are determined here
        // <BrowserRouter>

        //     {/*Switch allows only on route to render at a time.
        //     Routes render from first to last, if the route is not
        //     found we render a 404 error*/}
        //     <Switch>
        //         <Route path="/" exact component={LogInComp} />
        //         <Route path="/Register" exact component={RegisterComp} />
        //         <Route path="/Shop" exact component={ShoppingPage}/>
        //         <Route path="/Cart" exact component={CartPage}/>
        //     </Switch>

        // </BrowserRouter>
        );
    }
}

export default ShopperApp