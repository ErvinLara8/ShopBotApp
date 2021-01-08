import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserPendingOrder from './UserPendingOrder';
import ListGroup from 'react-bootstrap/ListGroup';


//This is the component that list all the pending orders 
class PendingOrders extends React.Component{

    constructor(props){
        super(props)

        this.handlePendingToComplete = this.handlePendingToComplete.bind(this);
    }

    //method to send the order to complete
    handlePendingToComplete(orderID){
        this.props.pendingToComplete(orderID);
    }

    render(){
        
        var display; 

        if(this.props.numOfOrders === -1)
        {
            display = <h1>Loading Orders...</h1>
        }
        else if (this.props.numOfOrders > 0)
        {
            //looping though all the orders and passing their data to create <UserCompletedOrder/> components
            var allOrders = this.props.allPendingOrders.map((currOrder)=>(
                <ListGroup.Item>
                    <UserPendingOrder 
                        orderID = {currOrder["orderID"]}
                        userID = {currOrder["userID"]}
                        firstName = {currOrder["firstName"]}
                        lastName = {currOrder["lastName"]}
                        wantedProducts = {currOrder["wantedProducts"]}
                        pendingToComplete2 = {this.handlePendingToComplete}
                    />
                </ListGroup.Item>

            ));

            display = <ListGroup>{allOrders}</ListGroup>

        }
        else
        {
            display = <h1>No Pending Orders!</h1>
        }

        return(
            display
        );
    }
}

export default PendingOrders