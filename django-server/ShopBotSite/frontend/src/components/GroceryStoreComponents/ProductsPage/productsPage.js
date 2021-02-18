import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import ShopBotNavBar from '../ShopBotNavBar/ShopBotNavBar';
import ProductOptions from './ProductComponents/ProductOptions';
import AddProduct from './ProductComponents/AddProduct';
import AddListing from './ProductComponents/AddListing';
import ViewInventory from './ProductComponents/ViewInventory';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

// State Page for Orders
// This file contains the structure of the Orders Page
// This is where all the functions of the order page occurs
// and the data is transferred from component to component


//demo product data
const AllProducts=[
    {
        "product_id":"abc233",
        "product_name":"cup",
        "product_price":5.99,
        "store_id":"cvb56"
    },
    {
        "product_id":"abc233",
        "product_name":"cup",
        "product_price":5.99,
        "store_id":"cvb56"
    }
]

class ProductsPage extends React.Component {

    static propTypes = {
        token: PropTypes.string.isRequired,
        groceryStoreID: PropTypes.number.isRequired
    }

    //constructor
    constructor(props){
        super(props);

        //this are the page variables
        this.state = {
            productOption: "addProduct", 
            numOfProducts: 2,
            allProducts: AllProducts,
        }

        //Here I am binding all functions
      // this.setOrderOption = this.setOrderOption.bind(this);
        //this.pendingToComplete = this.pendingToComplete.bind(this);
        this.setProductOption = this.setProductOption.bind(this);
        this.addingProduct = this.addingProduct(this);
        this.getInventory = this.getInventory(this);

    }

    //function to set variable that determines which option is being displayed
    setProductOption(option){
        this.setState({productOption: option});
    }


    addingProduct(productName, productDescription, category){

        fetch('/api/auth/ProductsAPI/add_product/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.token}`
            },
            body: JSON.stringify({
                name : productName,
                description: productDescription,
                category_ID: category
            })
            }).catch(error =>{ console.log(error)});

    }

    getInventory(){

    }


    //this method is called after the component is mounted to get all the info
  /*  componentDidMount(){

        fetch("/GetProducts")
        .then(res => res.json())
        .then((result) => {

            this.setState({
                numOfProducts: result.products.length,
                allProducts: result.products,
            });
        },
        (error) => { }
        );

    }*/



    render(){

        var currOption = "Loading";

        // choosing between pending and completed components
        if(this.state.productOption === "addProduct")
        {
            currOption = <AddProduct/>
        }
        else if (this.state.productOption === "addListing")
        {
            currOption = <AddListing
                    numOfProducts={this.state.numOfProducts}
                    allProducts={this.state.allProducts}
            />
        }
        else if (this.state.productOption === "inventory")
        {
            currOption = <ViewInventory
                    numOfProducts={this.state.numOfProducts}
                    allProducts={this.state.allProducts}
            />
        }

        //const pageTitle = "ShopBot Grocery Store Log In";
        return(
            <Container>
                <Row sm={1} md={1} lg ={1}>
                    <ShopBotNavBar/>
                </Row>

                <Row>
                    <Col sm={2} md={2} lg ={2}>
                    <ProductOptions 
                            setProductOption = {this.setProductOption}
                        />
                    </Col>
                    <Col sm={10} md={10} lg ={10}>
                        {currOption}
                    </Col>
                </Row>




            </Container>
        );
    }

}

const mapStateToProps = state => ({

    token: state.auth.token,
    groceryStoreID: state.auth.groceryStore.store_ID
    
});

export default connect(mapStateToProps)(ProductsPage);
