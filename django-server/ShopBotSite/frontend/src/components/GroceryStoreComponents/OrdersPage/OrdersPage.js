import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import ShopBotNavBar from '../ShopBotNavBar/ShopBotNavBar';
import OrderOptions from './OrderPageComponents/OrderOptions';
import PendingOrders from './OrderPageComponents/PendingOrders';
import CompletedOrders from './OrderPageComponents/CompletedOrders';
// import 'bootstrap/dist/css/bootstrap.min.css';

// State Page for Orders 
// This file contains the structure of the Orders Page
// This is where all the functions of the order page occurs 
// and the data is transferred from component to component
class OrdersPage extends React.Component {

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
        this.setState({orderOption: option});
        this.componentDidMount();
    }

    // this method will be called when an Pending order is completed
    pendingToComplete(completedOrderID){
        //we will do some backend fetching over here

        fetch('/api/OrdersAPI/'+completedOrderID+'/update_order/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "completed": true
            })
            })

            this.componentDidMount();

        // //temp Variables 
        // var tempOrder ;
        // var tempAllPending;

        // //looping through array 
        // for(let list of this.state.allPendingOrders){
        //     if (list["orderID"] == completedOrderID){ 
        //         tempOrder = list; 
        //         break;
        //     }
        // }
        
        // //getting rid of value in pending array 
        // tempAllPending = this.state.allPendingOrders.filter(list => list["orderID"] != completedOrderID)

        // //setting new arrays 
        // this.setState({
        //     allPendingOrders: tempAllPending,
        //     allCompletedOrders: this.state.allCompletedOrders.concat(tempOrder)
        // })
    }


    fetchingCompletedOrders(){

        fetch("/api/OrdersAPI/fetching_completed_orders")
        .then(res => res.json())
        .then((result) => {

            this.setState({
                numberOfCompletedOrders: result.length,
                allCompletedOrders: result
            });
        },
        (error) => { }
        );
    }


    fetchingPendingOrders(){
        fetch("/api/OrdersAPI/fetching_pending_orders")
        .then(res => res.json())
        .then((result) => {

            this.setState({
                numOfPendingOrders: result.length,
                allPendingOrders : result,
                
            });
        },
        (error) => { }
        );

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

export default OrdersPage