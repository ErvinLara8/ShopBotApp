import React from 'react';
import UserNavBar from '../UserNavBar/UserNavBar';
import UserIndividualOrder from './OrderHistoryComponents/UserIndividualOrder';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';


class OrderHistoryPage extends React.Component {

    static propTypes = {
        token: PropTypes.string.isRequired,
        userID: PropTypes.number.isRequired
    }

    //constructor
    constructor(props){
        super(props);

        //this are the page variables
        this.state = {
            numOfOrders: -1,
            allOrders: [],
            ordersLoaded: false
        }
    }
    
    componentDidMount(){

        if(!this.state.ordersLoaded){
            fetch("/api/auth/OrdersAPI/"+ this.props.userID +"/fetching_single_user_orders",
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
                    numOfOrders: result.length,
                    allOrders: result,
                    ordersLoaded: true
                });
            }).then(()=> {this.componentDidMount()}).catch(error =>{ console.log(error)});
        }
    }

    render(){
        var display;

        if(this.state.numOfOrders === -1)
        {
            display = <h1>Loading Orders...</h1>
        }
        else if (this.state.numOfOrders > 0)
        {

            var ordersHistory = this.state.allOrders.map((currOrder)=>(
                <ListGroup.Item>
                     <UserIndividualOrder 
                        orderID = {currOrder["order_ID"]}
                        userID = {currOrder["user_ID"]["id"]}
                        firstName = {currOrder["user_ID"]["first_name"]}
                        lastName = {currOrder["user_ID"]["last_name"]}
                        wantedProducts = {currOrder["order_list"]}
                        isCompleted = {currOrder["completed"]}
                    />
                </ListGroup.Item>

            ));

            display =<div>
             <ListGroup>{ordersHistory}</ListGroup>
             </div>

        }
        else
        {
            display = <h1>No Order history!</h1>
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
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    token: state.auth.token,
    userID: state.auth.userID
});

export default connect(mapStateToProps)(OrderHistoryPage);