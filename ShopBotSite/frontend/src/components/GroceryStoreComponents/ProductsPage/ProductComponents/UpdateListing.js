import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

//This is the side bar component that switches between Pending orders and Completed Orders
class UpdateListing extends React.Component{

    //constructor
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            
          };
        this.handleOptionChange = this.handleOptionChange.bind(this)
    }

    handleOptionChange(e){
        this.props.setOrderOption(e.target.value);
    }

      

    render(){
        let productName=""
        let productID=""

        return(
            <Container>
                <Form>
                    <Form.Group>
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter product name"/>
                        
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Product Description</Form.Label>
                        <Form.Control as="textarea" rows={3}/>
                        
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Select Category</Form.Label>
                        <Form.Control as="select">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                    Submit
                    </Button>
                </Form>

            </Container>

        );
    }
}

export default UpdateListing;