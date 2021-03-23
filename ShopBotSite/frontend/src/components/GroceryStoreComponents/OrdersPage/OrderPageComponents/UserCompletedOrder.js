import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button';

// Image of check maybe

//This is the component that display a completed order of a user
class UserCompletedOrder extends React.Component{

    render(){

        //listing all items in the order
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
                    <Col  md={{ offset: 7 }}>
                        Completed!
                    </Col>
                </Row>
            </Container>
        );
    }

}

export default UserCompletedOrder