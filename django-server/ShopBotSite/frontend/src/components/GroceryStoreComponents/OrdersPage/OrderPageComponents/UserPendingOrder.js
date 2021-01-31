import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button';

//this is the component that list a pending order of a user 
class UserPendingOrder extends React.Component{

    constructor(props){
        super(props)

        this.handlePendingToComplete = this.handlePendingToComplete.bind(this);
    }

    //sending the orderID to be transferred to completed 
    handlePendingToComplete(e){
        this.props.pendingToComplete2(e.target.value);
    }

    render(){

        //looping though all items
        var allItems = this.props.wantedProducts.map((currItem)=>(
            <ListGroup.Item>{currItem["wanted_num"]} x {currItem["listing_ID"]["product_ID"]["name"]} .......... {currItem["listing_ID"]["price"]}/each</ListGroup.Item>
        ));

        var productList = <ListGroup>{allItems}</ListGroup>



        return(
            <Container>
                <Row>
                    <Col><h3>{this.props.firstName} {this.props.lastName}</h3></Col>
                    <Col><h5>Order Number: {this.props.orderID}</h5></Col>
                </Row>
                <Row>
                    <Col>{productList}</Col>
                </Row>
                <Row>
                    <Col><Button>View Full Order</Button></Col>
                    <Col  md={{ offset: 7 }}><Button onClick={this.handlePendingToComplete} value={this.props.orderID}>Complete Order</Button></Col>
                </Row>
            </Container>
        );
    }

}

export default UserPendingOrder