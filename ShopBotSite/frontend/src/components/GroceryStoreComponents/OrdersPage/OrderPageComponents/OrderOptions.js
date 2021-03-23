import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
// import 'bootstrap/dist/css/bootstrap.min.css';

//This is the side bar component that switches between Pending orders and Completed Orders
class OrderOptions extends React.Component{

    //constructor
    constructor(props) {
        super(props);
        this.handleOptionChange = this.handleOptionChange.bind(this)
    }

    handleOptionChange(e){
        this.props.setOrderOption(e.target.value);
    }

    render(){
        return(
            <Container>

                <Row>
                    <Button type="button" value="pending" className="button-clicked" onClick = {this.handleOptionChange} >Pending Orders</Button>
                </Row>
                <Row>
                    <Button  type="button" value="completed" className="button-unclicked" onClick = {this.handleOptionChange}>Completed Orders</Button>
                </Row>

            </Container>

        );
    }
}

export default OrderOptions;