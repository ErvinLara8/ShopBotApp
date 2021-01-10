import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button';

const checkImg = require("./CheckImage.jpg");

//This is the component that displays an existing employees info
class ExistingEmployeesList extends React.Component{

    render(){

        //listing all items in the order
        var allItems = this.props.wantedProducts.map((currItem)=>(
            <ListGroup.Item>{currItem}</ListGroup.Item>
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
                        <img 
                            src={checkImg}
                        /> 
                    </Col>
                </Row>
            </Container>
        );
    }

}

export default ExistingEmployeesList