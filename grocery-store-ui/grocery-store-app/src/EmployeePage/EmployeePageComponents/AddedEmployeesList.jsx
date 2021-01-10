import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button';

//this is the component that lists an added employee 
class AddedEmployeesList extends React.Component{ //TODO: Saara edit this to reflect the proper data to be displayed

    constructor(props){
        super(props)

        this.handleAddedtoExisting = this.handleAddedtoExisting.bind(this);
    }

    //sending the employeeID to be transferred to existing 
    handleAddedtoExisting(e){
        this.props.addedToExisting2(e.target.value);
    }

    render(){

        //looping though all items
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
                    <Col  md={{ offset: 7 }}><Button onClick={this.handleAddedtoExisting} value={this.props.orderID}>Complete Order</Button></Col>
                </Row>
            </Container>
        );
    }

}

export default AddedEmployeesList