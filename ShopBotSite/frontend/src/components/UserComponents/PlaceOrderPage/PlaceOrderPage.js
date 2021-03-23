import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserNavBar from '../UserNavBar/UserNavBar';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import SearchZip from './PlaceOrderComponets/SearchZip';
import ListFoundStores from './PlaceOrderComponets/ListFoundStores';
import StoreProducts from './PlaceOrderComponets/StoreProducts';
import {addNewItemToCart, clearCart, setGlobalStore, setGlobalZip} from '../../../actions/cart';
import Alert from 'react-bootstrap/Alert';

// State Page for Orders 
// This file contains the structure of the Orders Page
// This is where all the functions of the order page occurs 
// and the data is transferred from component to component
class PlaceOrderPage extends React.Component {

    static propTypes = {
        token: PropTypes.string.isRequired,
        cart: PropTypes.object.isRequired,
        globalZip: PropTypes.string.isRequired,
        globalStoreID: PropTypes.number.isRequired
    }

    //constructor
    constructor(props){
        super(props);

        //this are the page variables
        this.state = {
            isLoading: true,
            isTypingZip: true,
            hasSearched: false,
            foundStores: [],
            selectedStore:{},
            selectedStoreID: -1,
            hasSelected: false,
            storeProducts: [],
            wantedOfEachProd: {},
            showAlert: false,
            alertGood: true,
        }

        this.searchStores = this.searchStores.bind(this);
        this.settingZip = this.settingZip.bind(this);
        this.cancelSearch = this.cancelSearch.bind(this);
        this.selectStore = this.selectStore.bind(this);
        this.addItemToCart = this.addItemToCart.bind(this);
    }

    searchStores(){

        // Setting it to loading
        this.setState({isLoading: true, isTypingZip: false})
        
        fetch('/api/auth/UserActionsAPI/search_stores/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.token}`
            },
            body: JSON.stringify({
                "zipcode": this.props.globalZip
            })
            }).then(res => res.json())
            .then((result) => {
    
                this.setState({
                    foundStores: result
                });
            },
            ).then(
                () => {

                    if(this.props.globalStoreID !== -1 && this.props.globalStoreID !== null && this.props.globalStoreID !== "null"){
                        this.selectStore(this.props.globalStoreID)
                    }else{
                        this.setState({hasSearched: true, isLoading: false })
                    }
                
            }).catch(error =>{ console.log(error)});

    }


    selectStore(selected_id){

        this.setState({isLoading: true, hasSearched: false})

        var found = 0
        var i = 0;
        for (; i < this.state.foundStores.length ; i++){
            
            if(this.state.foundStores[i]["store_ID"] === selected_id){
                found = i;
                break;
            }
        }

        this.props.setGlobalStore(selected_id)

        this.setState({selectedStoreID: selected_id, selectStore: this.state.foundStores[found]}, ()=> {


            fetch('/api/auth/UserActionsAPI/selected_store_listings/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${this.props.token}`
                },
                body: JSON.stringify({
                    "store_id": this.state.selectedStoreID
                })
                }).then(res => res.json())
                .then((result) => {
                    this.setState({
                        storeProducts: result
                    });
                },
                ).then(
                    () => this.setState({isLoading: false, hasSelected: true})
                ).catch(error =>{ console.log(error)});
        });



       
    }

    cancelSearch(){
        this.setState({
            zip : "",
            isLoading: false,
            isTypingZip: true,
            hasSearched: false,
            foundStores: [],
            selectedStore:{},
            selectedStoreID: -1,
            hasSelected: false,
            storeProducts: [],
            wantedOfEachProd: {},
            showAlert: false,
            alertGood: true,
        });

        this.props.clearCart();
    }

    settingZip(value){
        this.props.setGlobalZip(value)
    }

    addItemToCart(itemID){

        var item = null;

        for(var i = 0; i < this.state.storeProducts.length; i++){
            if(this.state.storeProducts[i]["listing_ID"] === itemID){
                item = this.state.storeProducts[i];
                break;
            }
        }

        this.props.addNewItemToCart(item, this.state.wantedOfEachProd[itemID])
        this.setState({showAlert: true})
    }

    componentDidMount(){

        if(this.props.globalZip !== "" && this.props.globalZip !== null ){
            this.searchStores()
        }
        else
        {
            this.setState({
                isLoading: false,
                isTypingZip: true
            });
        }
        
    }

    render(){

        var display; 

        if (this.state.isLoading){
            display = "Loading..."
        }
        else if (this.state.isTypingZip) {
            display = 
            <SearchZip
                settingZip = {this.settingZip}
                searchStores = {this.searchStores}
            />
        }
        else if (this.state.hasSearched){

            display = 
            <div>
                <h5>Searched Zip: {this.props.globalZip}</h5>
                <Button variant="outline-secondary" onClick={this.cancelSearch}>Cancel Search</Button>
                <br/>
                <br/>
                <ListFoundStores
                    listOfStores = {this.state.foundStores}
                    selectStore = {this.selectStore}
                />
            </div>
        }else if(this.state.hasSelected){

            var totalCartItems = 0;

            if(this.props.cart !== null ){

                
                if(this.props.cart .length != 0){
                    for(var i = 0; i < this.props.cart .length; i++){
                        totalCartItems += this.props.cart[i][1];
                    }
                }
            }

            var alert = 
            <Alert show={this.state.showAlert} variant="success">
                <Alert.Heading>{totalCartItems} Item(s) Added To Cart!</Alert.Heading>
                <div className="d-flex justify-content-end">
                <Button onClick={() => this.setState({showAlert: false})} variant="outline-success">
                    Close
                </Button>
                </div>
            </Alert>

            display = 
            <div>
                {alert}
                <h5>Searched Zip: {this.props.globalZip}</h5>
                <Button variant="outline-secondary" onClick={this.cancelSearch}>Cancel Search</Button>
                <br/>
                <br/>
                <h5>Selected Store: {this.state.selectStore["name"]}</h5>
                <h5>Address: {this.state.selectStore["street"]} {this.state.selectStore["city"]} {this.state.selectStore["state"]} {this.state.selectStore["zipcode"]}</h5>
                <br/>
                <br/>
                <StoreProducts
                    listOfProducts = {this.state.storeProducts}
                    wantedOfEachProd = {this.state.wantedOfEachProd}
                    addToCart = {this.addItemToCart}
                />
            </div>
        }

        

        //const pageTitle = "ShopBot Grocery Store Log In";
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
            </Container>
        );
        
    }

}

const mapStateToProps = state => ({

    token: state.auth.token,
    cart: state.cart.items,
    globalZip: state.cart.zip,
    globalStoreID: state.cart.storeID
});

export default connect(mapStateToProps, {addNewItemToCart, clearCart, setGlobalStore, setGlobalZip})(PlaceOrderPage);