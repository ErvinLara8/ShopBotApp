import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Container, Row, Col} from 'react-bootstrap';
import {Redirect} from "react-router-dom";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../../../../ShopBot-Logo-Design.jpg';
import {logInUser} from '../../../actions/auth';
import Alert from 'react-bootstrap/Alert';


class UserLogInComp extends React.Component {

    static propTypes = {
        logInUser: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
    }


    //constructor
    constructor(props){
        super(props);

         //this are the page variables
         this.state = {
             email : "",
             password : "",
             showAlert: false
        }

        this.submitLogIn = this.submitLogIn.bind(this)
       
    }

    submitLogIn(e){

        e.preventDefault();

        this.props.logInUser(this.state.email, this.state.password)

        // HERE IS THE BUG WITH THE ALERT
        this.setState({showAlert: true});
    }

    render(){

        var display; 

        if(this.props.isAuthenticated){
           display = <Redirect to= "/PlaceOrderPage"/>
        }
        else
        {
            display =              
                (<Container>
                    <Alert show={this.state.showAlert} variant="danger">
                        <Alert.Heading>Invalid Log In!</Alert.Heading>
                        <div className="d-flex justify-content-end">
                        <Button onClick={() => this.setState({showAlert: false})} variant="outline-danger">
                            Close
                        </Button>
                        </div>
                    </Alert>


                    <Row>
                    <h1 style={{ textAlign: "center" }}>ShopBot User Store Log In</h1>
                    </Row>


                    <Row>
                    <Col></Col>
                    <Col sm ={4} md= {4}>
                        <img src={logo} width="350" height="350"/>
                    </Col>
                    <Col sm ={4} md= {4}>
                    <br/>
                    <Form style={{ textAlign: "center" }} >

                        <Row>
                        <Form.Group controlId="formBasicStoreID">

                            <Form.Label>User Email</Form.Label>
                            <br/>
                            <Form.Control 
                                type="userEmail" 
                                placeholder="Enter User Email" 
                                onChange={e => this.setState({ email: e.target.value })}
                            />
                                
                        </Form.Group>
                        </Row>
                        <br/>


                        <Row>   
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password </Form.Label>
                            <br/>
                            <Form.Control 
                                type="password" 
                                placeholder="Password"
                                onChange={e => this.setState({ password: e.target.value })} 
                            />
                        </Form.Group>
                        </Row>
                        <br/>
                        <Row>
                            <Col sm= {3}>
                                <Button variant="primary" type="button" onClick ={this.submitLogIn}>
                                    Sign In
                                </Button> 
                            </Col>
                            <Col sm= {3}>
                                <Link to='/UserRegistration'>
                                <Button variant="primary" type="button">
                                    Register
                                </Button>
                                </Link>
                            </Col>
                            <Col sm= {3}>
                            <Link to='/GroceryStoreLogIn'>
                                <Button variant="primary" type="button">
                                    Grocery Log In
                                </Button>
                                </Link>
                            </Col>
                        </Row>
                    </Form>
                    
                    </Col>
                    <Col></Col>
                    </Row>

                </Container>
            )
        }
        return(
            <div>
            {display}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isEmployee: state.auth.isEmployee
});

export default connect(mapStateToProps, {logInUser})(UserLogInComp)