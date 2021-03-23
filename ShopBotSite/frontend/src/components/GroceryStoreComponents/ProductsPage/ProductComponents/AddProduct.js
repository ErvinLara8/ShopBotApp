import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


class AddProduct extends React.Component{

    //constructor
    constructor(props) {
        super(props);
        this.state = {
           name: "",
           description: "",
           categoryID: 1
          };
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.addProduct = this.addProduct.bind(this);
    }

    handleOptionChange(e){
        this.props.setOrderOption(e.target.value);
    }

    addProduct(){
        this.props.addProduct(this.state.name, this.state.description, this.state.categoryID)
    }

    render(){
      

        return(
            <Container>
                <Form>
                    <Form.Group>
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter product name" onChange={e => this.setState({ name: e.target.value })}/>
                        
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Product Description</Form.Label>
                        <Form.Control as="textarea" rows={3} onChange={e => this.setState({ description: e.target.value })}/>
                        
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Select Category</Form.Label>
                        <Form.Control as="select" onChange={e => this.setState({ categoryID: parseInt(e.target.value) })}>
                        {
                            this.props.categories.map((option) => {
                            return (<option value={option['category_ID']}>{option['categoryName']}</option>)
                            })
                        }
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="reset" onClick={this.addProduct}>
                    Submit
                    </Button>
                </Form>

            </Container>

        );
    }
}

export default AddProduct;