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
            numOfProducts: -1,
            allProducts: [],
            allListings: [],
            allListingLength: -1,
            categories: []
        }

        this.setProductOption = this.setProductOption.bind(this);
        this.addingProduct = this.addingProduct.bind(this);
        this.getInventory = this.getInventory.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
        this.getCategories = this.getCategories.bind(this);
        this.getAllProducts = this.getAllProducts.bind(this);
        this.addListing = this.addListing.bind(this);
    }

    //function to set variable that determines which option is being displayed
    setProductOption(option){
        this.setState({productOption: option});
        this.componentDidMount();
        this.componentDidMount();

    }

    getCategories(){

        fetch('api/auth/ProductsAPI/fetch_categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.token}`
            }
            }) 
            .then(res => res.json())
            .then((result) => {
    
                this.setState({
                    categories: result
                });

            },
            ).catch(error =>{ console.log(error)});
    }

    addingProduct(productName, productDescription, category){

        fetch('/api/auth/ProductsAPI/add_product_detail/', {
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
            this.componentDidMount();
            this.componentDidMount();

    }

    addListing(price, quantity, productID){
        fetch('api/auth/ProductsAPI/add_listing/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.token}`
            },
            body: JSON.stringify({
                "price": price,
                "quantity": quantity,
                "product_ID": productID,
                "storeID": this.props.groceryStoreID
            })
            }).catch(error =>{ console.log(error)});

            this.componentDidMount();
            this.componentDidMount();
    }

    updateProduct(update, listingID){

        fetch('api/auth/ProductsAPI/'+listingID+'/update_listing/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.token}`
            },
            body: JSON.stringify(update)
            }).catch(error =>{ console.log(error)});

            this.componentDidMount();
            this.componentDidMount();
    }

    getAllProducts(){

        fetch('/api/auth/ProductsAPI/fetch_products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.token}`
            }
            })
            .then(res => res.json())
            .then((result) => {
    
                this.setState({
                    numOfProducts: result.length,
                    allProducts: result
                });

            },
            ).catch(error =>{ console.log(error)});

    }

    getInventory(){

        fetch('/api/auth/ProductsAPI/'+ this.props.groceryStoreID+'/fetch_listings', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.token}`
            }
            })
            .then(res => res.json())
            .then((result) => {
    
                this.setState({
                    allListingLength: result.length,
                    allListings: result
                });

            },
            ).catch(error =>{ console.log(error)});
        }

    componentDidMount(){

        if (this.state.productOption === "addProduct")
        {
            this.getCategories();
        }
        else if (this.state.productOption === "addListing")
        {
            this.getAllProducts();
        }
        else
        {
            this.getInventory();
        }
    }



    render(){

        var currOption = "Loading";

        // choosing between pending and completed components
        if(this.state.productOption === "addProduct")
        {
            currOption = <AddProduct
                            categories = {this.state.categories}
                            addProduct = {this.addingProduct}
                        />
        }
        else if (this.state.productOption === "addListing")
        {
            currOption = <AddListing
                    numOfProducts={this.state.numOfProducts}
                    allProducts={this.state.allProducts}
                    addListing = {this.addListing}
            />
        }
        else if (this.state.productOption === "inventory")
        {
            currOption = <ViewInventory
                    numOfProducts={this.state.allListingLength}
                    allProducts={this.state.allListings}
                    storeID = {this.props.groceryStoreID}
                    updateProduct = {this.updateProduct}
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
