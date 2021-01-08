import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import UserCompletedOrder from './UserCompletedOrder';
import 'bootstrap/dist/css/bootstrap.min.css';

//This is the component that displays a list of all the
//completed orders for that day
class CompletedOrders extends React.Component{
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
                    <UserCompletedOrder 
                        orderID = {currOrder["orderID"]}
                        userID = {currOrder["userID"]}
                        firstName = {currOrder["firstName"]}
                        lastName = {currOrder["lastName"]}
                        wantedProducts = {currOrder["wantedProducts"]}
                    />
                </ListGroup.Item>

            ));

            display = <ListGroup>{allOrders}</ListGroup>

        }
        else
        {
            display = <h1>No Completed Orders!</h1>
        }

        return(
            display
        );
    }
}

export default CompletedOrders