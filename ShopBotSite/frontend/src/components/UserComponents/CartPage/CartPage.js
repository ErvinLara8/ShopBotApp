import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserNavBar from '../UserNavBar/UserNavBar';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {clearCart, removeFromCart, placeOrder} from '../../../actions/cart';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';


// State Page for Orders 
// This file contains the structure of the Orders Page
// This is where all the functions of the order page occurs 
// and the data is transferred from component to component
class CartPage extends React.Component {

    static propTypes = {
        token: PropTypes.string.isRequired,
        cart: PropTypes.object.isRequired
    }

    //constructor
    constructor(props){
        super(props);

         //this are the page variables
         this.state = {
            price: 0,
            showModal: false,
            orderPlaced: "loading"
        }

        this.removeItem = this.removeItem.bind(this);
        this.clearAll = this.clearAll.bind(this);
        this.placeCurrentOrder = this.placeCurrentOrder.bind(this);

    }

    removeItem(e){
        this.props.removeFromCart(e.target.value); 
        this.forceUpdate()
    }

    clearAll(){
        this.props.clearCart();
        this.forceUpdate()
    }

    placeCurrentOrder(){

        this.setState({showModal: true, orderPlaced: "loading"},()=> {
            
            if ( this.props.placeOrder(this.state.price)){
                this.setState({orderPlaced: "success"})
            }else{
                this.setState({orderPlaced: "fail"})
            }
        });

    }


    render(){

        var display;

        if (this.props.cart.length == 0){
            display = 
            <div>
                <h5>Your Cart is Empty</h5>
                <br/>
                <h6>Search for a store and add items to your cart in the <Link  to="/PlaceOrderPage">Place Order page</Link></h6>
            </div>
        }else {

            var listedItems = [];

            var priceBeforeTax = 0;

            for(var i = 0; i < this.props.cart.length ; i++){
                listedItems.push(
                <ListGroup.Item>
                    <Container>
                        <Row>
                            <Col xs={12} md={8}>
                                {this.props.cart[i][1]} x {this.props.cart[i][0]["product_ID"]["name"]}
                            </Col>
                            <Col xs={3} md={2}>
                                ${this.props.cart[i][0]["price"]} / each
                            </Col>
                            <Col xs={3} md={2}>
                                <Button variant="outline-danger" value={i} onClick= {this.removeItem}>X Remove</Button>
                            </Col>
                        </Row>
                    </Container>
                </ListGroup.Item>);

                priceBeforeTax= priceBeforeTax +( this.props.cart[i][1] * parseFloat(this.props.cart[i][0]["price"]) )
            }

            var salesTax = parseFloat(priceBeforeTax) * 0.0635;
            this.state.price = parseInt(priceBeforeTax) + parseFloat( salesTax.toFixed(2));


            display = 
            <div>
            <Row>
            <ListGroup variant="flush">{listedItems}</ListGroup>
            </Row>
            <br/>
            <hr/>

            <br/>
            <Row>
                <Col xs={12} md={8}>
                <h6>Cost: ${priceBeforeTax}</h6>
                <h6>Tax: ${salesTax.toFixed(2)}</h6>
                <h4>Total: ${this.state.price}</h4>    
                </Col>
                <Col xs={6} md={4}>
                <Button variant="outline-danger" onClick={this.clearAll}>Clear Cart</Button>
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={8}>
                <Button variant = "outline-success" onClick={this.placeCurrentOrder}>Place Order!</Button>
                </Col>
                <Col xs={6} md={4}>
                
                </Col>
            </Row>

            </div>
        }
        
        var modalOfOrder;

        if(this.state.orderPlaced == "loading"){

            modalOfOrder =  
            <Modal
                show={this.state.showModal}
                onHide={()=> {this.setState({showModal: false})}}
                backdrop="static"
                keyboard={false}
            >
                <Alert variant='secondary'>
                <Modal.Header>
                <Modal.Title>Placing Order...</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                </Modal.Body>
                </Alert>
            </Modal>

        } else if(this.state.orderPlaced == "success"){

            modalOfOrder =  
            <Modal
                show={this.state.showModal}
                onHide={()=> {this.setState({showModal: false})}}
                backdrop="static"
                keyboard={false}
            >
                <Alert variant='success'>
                <Modal.Header>
                <Modal.Title>Order Was Placed!!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Button variant="secondary" onClick={()=> {this.setState({showModal: false, orderPlaced: "loading"}); this.props.clearCart()}}>
                    Close
                </Button>
                </Modal.Body>
                </Alert>
            </Modal>
        }else{

            modalOfOrder =  
            <Modal
                show={this.state.showModal}
                onHide={()=> {this.setState({showModal: false})}}
                backdrop="static"
                keyboard={false}
            >
                <Alert variant='danger'>
                <Modal.Header>
                <Modal.Title>Something Went Wrong!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Button variant="secondary" onClick={()=> {this.setState({showModal: false, orderPlaced: "loading"})}}>
                    Close
                </Button>
                </Modal.Body>
                </Alert>
            </Modal>
        }
            

        return(
            <Container>
                
                <Row sm={1} md={1} lg ={1}>
                    <UserNavBar/>
                </Row>

                <Row>
                    <Col sm={10} md={10} lg ={10}>
                    <br/>
                        {display}
                    </Col>
                </Row>

                <div>
                    {modalOfOrder}
                </div>
               
            </Container>
        );
    }
}

const mapStateToProps = state => ({

    token: state.auth.token,
    cart: state.cart.items
});

export default connect(mapStateToProps, {clearCart, removeFromCart, placeOrder})(CartPage);