import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import ShopBotNavBar from '../ShopBotNavBar/ShopBotNavBar';
import OrderOptions from './OrderPageComponents/OrderOptions';
import PendingOrders from './OrderPageComponents/PendingOrders';
import CompletedOrders from './OrderPageComponents/CompletedOrders';
import 'bootstrap/dist/css/bootstrap.min.css';

// State Page for Orders 
// This file contains the structure of the Orders Page
// This is where all the functions of the order page occurs 
// and the data is transferred from component to component
class OrdersPage extends React.Component {

    //constructor
    constructor(props){
        super(props);

        //this are the page variables
        this.state = {
            orderOption: "pending"
        }
        
        //Here I am binding all functions
        this.setOrderOption = this.setOrderOption.bind(this);

    }

    //function to set variable that determines which option is being displayed
    setOrderOption(option){
        this.setState({orderOption: option});
    }



    render(){

        var currOption = "Loading";

        if(this.state.orderOption === "pending")
        {
            currOption = <PendingOrders />
        }
        else if (this.state.orderOption === "completed")
        {
            currOption = <CompletedOrders />
        }

        //const pageTitle = "ShopBot Grocery Store Log In";
        return(
            <Container>
                <Row>
                    <ShopBotNavBar/>
                </Row>

                <Row>
                    <Col>
                        <OrderOptions 
                            setOrderOption = {this.setOrderOption}
                        />
                    </Col>
                    <Col>
                        {currOption}
                    </Col>
                </Row>




            </Container>
        );
    }

}

export default OrdersPage