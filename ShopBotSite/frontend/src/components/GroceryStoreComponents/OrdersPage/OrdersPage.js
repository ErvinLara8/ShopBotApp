import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ShopBotNavBar from '../ShopBotNavBar/ShopBotNavBar';
import OrderOptions from './OrderPageComponents/OrderOptions';
import PendingOrders from './OrderPageComponents/PendingOrders';
import CompletedOrders from './OrderPageComponents/CompletedOrders';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';


// State Page for Orders 
// This file contains the structure of the Orders Page
// This is where all the functions of the order page occurs 
// and the data is transferred from component to component
class OrdersPage extends React.Component {

    static propTypes = {
        token: PropTypes.string.isRequired,
        groceryStoreID: PropTypes.number.isRequired
    }

    //constructor
    constructor(props){
        super(props);

        //this are the page variables
        this.state = {
            orderOption: "pending", 
            numOfPendingOrders: -1,
            numberOfCompletedOrders: -1,
            allPendingOrders: [],
            allCompletedOrders: [],
        }

        //Here I am binding all functions
        this.setOrderOption = this.setOrderOption.bind(this);
        this.pendingToComplete = this.pendingToComplete.bind(this);
        this.fetchingCompletedOrders = this.fetchingCompletedOrders.bind(this);
        this.fetchingPendingOrders = this.fetchingPendingOrders.bind(this)
    }

    //function to set variable that determines which option is being displayed
    setOrderOption(option){
        this.setState({orderOption: option}, ()=>{
            this.componentDidMount();
        });
        
    }

    // this method will be called when an Pending order is completed
    pendingToComplete(completedOrderID){
        //we will do some backend fetching over here

        // fetch('/api/auth/OrdersAPI/'+completedOrderID+'/update_order/', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Token ${this.props.token}`
        //     },
        //     body: JSON.stringify({
        //         "completed": true
        //     })
        //     }).then(()=>{this.componentDidMount();}).catch(error =>{ console.log(error)});

        fetch('/api/auth/OrdersAPI/'+completedOrderID+'/update_order/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.token}`
            },
            body: JSON.stringify({
                "completed": true
            })
            }).then(()=>{ this.fetchingPendingOrders()}).then(()=>{this.componentDidMount}).catch(error =>{ console.log(error)});

        
            
    }


    fetchingCompletedOrders(){

        fetch("/api/auth/OrdersAPI/"+this.props.groceryStoreID+"/fetching_completed_orders",
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.token}`
            },
        }
        )
        .then(res => res.json())
        .then((result) => {

            this.setState({
                numberOfCompletedOrders: result.length,
                allCompletedOrders: result
            });
        },
        ).catch(error =>{ console.log(error)});
    }


    fetchingPendingOrders(){
        fetch("/api/auth/OrdersAPI/"+this.props.groceryStoreID+"/fetching_pending_orders",
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.token}`
            },
        }
        )
        .then(res => res.json())
        .then((result) => {

            this.setState({
                numOfPendingOrders: result.length,
                allPendingOrders : result, 
            });
        },
        ).catch(error =>{ console.log(error)});;

    }




    //this method is called after the component is mounted to get all the info 
    componentDidMount(){

        if(this.state.orderOption === "pending"){
            this.fetchingPendingOrders();
        } 
        else if (this.state.orderOption === "completed")
        {
            this.fetchingCompletedOrders();
        }
    }



    render(){

        

            var currOption = "Loading";

            // choosing between pending and completed components
            if(this.state.orderOption === "pending")
            {
                currOption = <PendingOrders 
                                numOfOrders = {this.state.numOfPendingOrders}
                                allPendingOrders = {this.state.allPendingOrders}
                                pendingToComplete = {this.pendingToComplete}
                            />
            }
            else if (this.state.orderOption === "completed")
            {
                currOption = <CompletedOrders 
                                numOfOrders = {this.state.numberOfCompletedOrders}
                                allPendingOrders = {this.state.allCompletedOrders}
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
                            <OrderOptions 
                                setOrderOption = {this.setOrderOption}
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

export default connect(mapStateToProps)(OrdersPage);