import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

//This is the side bar component that switches between Pending orders and Completed Orders
class ProductOptions extends React.Component{

    //constructor
    constructor(props) {
        super(props);
        this.handleOptionChange = this.handleOptionChange.bind(this)
    }

    handleOptionChange(e){
        this.props.setProductOption(e.target.value);
    }

    render(){
        return(
            <Container>

                <Row>
                    <Button type="button" value="addProduct" className="button-clicked" onClick = {this.handleOptionChange} >Add Product</Button>
                </Row>
                <Row>
                    <Button type="button" value="addListing" className="button-clicked" onClick = {this.handleOptionChange} >Add Listing</Button>
                </Row>
                <Row>
                    <Button  type="button" value="inventory" className="button-unclicked" onClick = {this.handleOptionChange}>View Inventory</Button>
                </Row>
            </Container>

        );
    }
}

export default ProductOptions;