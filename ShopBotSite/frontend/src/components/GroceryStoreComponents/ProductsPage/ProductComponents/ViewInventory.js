import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';


// State Page for Orders
// This file contains the structure of the Orders Page
// This is where all the functions of the order page occurs
// and the data is transferred from component to component
//





class ViewInventory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          modalShow: false,
          quantity: "",
          price: "",
          currListingID: 0
        };

        this.updateListing = this.updateListing.bind(this);
      }

    updateListing(listingID){


      var update = {}

      if (this.state.quantity == "" && this.state.price == ""){
       console.log("ALERT")
       return 
      }

      if (this.state.quantity != ""){
        update.quantity = this.state.quantity
      }

      if (this.state.price != ""){
        update.price = this.state.price
      }
      this.props.updateProduct(update, listingID)
      this.setState({modalShow: false})
    }
    

    //modal to update a listing from the ones on the list
    UpdateListingModal(props) {
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Update Listing
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>{props.productName}</h4>
              <em>Product ID: {props.productID}</em>
              <br/>
              <Form>
                    <Form.Group>
                        <Form.Label>Quantiy</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="Quantity "
                          onChange={e => props.setQuantity(e.target.value)} 
                        />
                        
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Price</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="Price ($USD) "
                          onChange={e => props.setPrice(e.target.value)}   
                        />
                    </Form.Group>
                    <Button variant="primary" type="button" onClick ={props.updateListing}>Submit</Button>
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

        if(this.props.numOfProducts === -1)
        {
            display = <h1>Loading products...</h1>
        }
        else if (this.props.numOfProducts > 0)
        {

            var allProducts = this.props.allProducts.map((currProduct)=>(
                <ListGroup.Item>
                    <h3>{currProduct["product_ID"]["name"]}</h3>
                    <em>${currProduct["price"]}</em>
                    <em> | Qnt : {currProduct["quantity"]}</em><br/>
                    <em>Product ID: {currProduct["product_ID"]["product_ID"]}</em>
                    <em> | Listing ID: {currProduct["listing_ID"]}</em>
                    <em> | Store ID :{this.props.storeID} </em>
                    <Button class="btn"
                    onClick={() => {
                        this.setState({ modalShow:true })
                        this.productName=currProduct["product_ID"]["name"]
                        this.productID=currProduct["product_ID"]["product_ID"]
                        this.listingID = currProduct["listing_ID"]                 
                    }}
                    >Update Listing</Button>
                    
                </ListGroup.Item>

            ));

            display =<div>
             <ListGroup>{allProducts}</ListGroup>
             <this.UpdateListingModal
                    productName={this.productName}
                    productID={this.productID}
                    listingID = {this.listingID}
                    show={this.state.modalShow}
                    onHide={() => this.setState({ modalShow:false })}
                    updateListing = {() => this.updateListing(this.listingID)}
                    setQuantity = {(value) => this.setState({ quantity: value })}
                    setPrice = {(value) => this.setState({price: value})}
                 />
             </div>


        }
        else
        {
            display = <h1>No Product Listing!</h1>
        }

        return(
            display
        );

    }

}

export default ViewInventory
