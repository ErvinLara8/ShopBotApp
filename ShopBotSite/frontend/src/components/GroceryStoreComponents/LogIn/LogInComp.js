import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Container, Row, Col} from 'react-bootstrap';
import {Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logInGrocery} from '../../../actions/auth'


class LogInComp extends React.Component {

    static propTypes = {
        logInGrocery: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        isEmployee: PropTypes.bool
    }


    //constructor
    constructor(props){
        super(props);

         //this are the page variables
         this.state = {
             email : "",
             storeID: 0,
             password : ""
        }

        this.submitLogIn = this.submitLogIn.bind(this)
       
    }

    submitLogIn(e){

        e.preventDefault();


        this.props.logInGrocery(this.state.email, parseInt(this.state.storeID), this.state.password )

        
    }

    render(){

        var display; 

        if(this.props.isEmployee && this.props.isAuthenticated){
           display = <Redirect to= "/OrdersPage"/>
        }
        else
        {
            display =              
                (<Container>
                    <Row>
                    <h1 style={{ textAlign: "center" }}>ShopBot Grocery Store Log In</h1>
                    </Row>


                    <Row>
                    <Col>
                    </Col>
                    <Col>
                    <br/>
                    <Form style={{ textAlign: "center" }} >

                        <Row>
                        <Form.Group controlId="formBasicStoreID">

                            <Form.Label>Manager Email</Form.Label>
                            <br/>
                            <Form.Control 
                                type="managerEmail" 
                                placeholder="Enter Manager Email" 
                                onChange={e => this.setState({ email: e.target.value })}
                            />
                                
                        </Form.Group>
                        </Row>
                        <br/>

                        <Row>
                        <Form.Group controlId="formBasicStoreID">

                            <Form.Label>Store ID</Form.Label>
                            <br/>
                            <Form.Control 
                                type="storeId" 
                                placeholder="Enter Grocery Store ID" 
                                onChange={e => this.setState({ storeID: e.target.value })}
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
                            </Col>
                            <Col sm= {3}>
                                <Button variant="primary" type="button" onClick ={this.submitLogIn}>
                                    Sign In
                                </Button> 
                            </Col>
                            <Col sm= {3}>
                                <Button variant="primary" type="button" onClick ={this.submitLogIn}>
                                    Register
                                </Button> 
                            </Col>
                            <Col sm= {3}>
                            </Col>
                        </Row>
                    </Form>
                    
                    </Col>
                    <Col>
                    </Col>
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

export default connect(mapStateToProps, {logInGrocery})(LogInComp)