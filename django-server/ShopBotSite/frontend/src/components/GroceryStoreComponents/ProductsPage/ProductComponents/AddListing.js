import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';



// State Page for Orders
// This file contains the structure of the Orders Page
// This is where all the functions of the order page occurs
// and the data is transferred from component to component
//





class AddListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          modalShow: false,
          quantity: "",
          price: "",
        };

        this.addListing = this.addListing.bind(this);
      }

    addListing(productID){

      if (this.state.quantity == "" && this.state.price == ""){
        console.log("ALERT")
        return 
       }
       else{
        this.props.addListing(this.state.price, this.state.quantity, productID)
        this.setState({modalShow: false})
       }
      
    }

    //modal to add a new listing from the products in a list 
     AddListingModal(props) {
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Add New Listing
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>{props.productName}</h4>
              <em>Product ID: {props.productID}</em>
              <Form>
                    <Form.Group>
                        <Form.Label>Quantiy</Form.Label>
                        <Form.Control type="text" placeholder="Quantity" onChange={e => props.setQuantity(e.target.value)} />
                        
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" placeholder="Price ($USD)" onChange={e => props.setPrice(e.target.value)}   />
                        
                    </Form.Group>
                    
                    <Button variant="primary" type="button" onClick={props.addListing}>
                    Submit
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
      }


    render(){
        var display;
       
        
        let productName=""
        let productID=""

        if(this.props.numOfProducts === -1)
        {
            display = <h1>Loading products...</h1>
        }
        else if (this.props.numOfProducts > 0)
        {

            var allProducts = this.props.allProducts.map((currProduct)=>(
                <ListGroup.Item>
                    <h3>{currProduct["name"]}</h3><br/>
                    <em>Product ID : {currProduct["product_ID"] }</em><br/>
                    
                    <Button
                    onClick={() => {
                        this.setState({ modalShow:true })
                        this.productName=currProduct.name
                        this.productID=currProduct.product_ID
                        console.log(this.productName)
                    
                    }}
                    >Add Listing</Button>
                    
                </ListGroup.Item>

            ));

            display =<div>
                 <ListGroup>{allProducts}</ListGroup>
                 <this.AddListingModal
                    productName={this.productName}
                    productID={this.productID}
                    show={this.state.modalShow}
                    onHide={() => this.setState({ modalShow:false })}
                    setQuantity = {(value) => this.setState({ quantity: value })}
                    setPrice = {(value) => this.setState({price: value})}
                    addListing = {() => this.addListing(this.productID)}
                 />
                 </div>


        }
        else
        {
            display = <h1>No Products to create listing</h1>
        }

        return(
            display
        );

    }

}

export default AddListing
