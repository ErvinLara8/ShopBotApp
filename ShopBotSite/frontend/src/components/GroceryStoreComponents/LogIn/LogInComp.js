import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Container, Row, Col} from 'react-bootstrap';
import {Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logInGrocery} from '../../../actions/auth';
import Alert from 'react-bootstrap/Alert';
import {Link} from 'react-router-dom';



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
             password : "",
             alertType: "loading",
             showAlert: false
        }

        this.submitLogIn = this.submitLogIn.bind(this)
       
    }

    submitLogIn(e){

        this.setState({alertType: "loading", showAlert: true});

        e.preventDefault();
        this.props.logInGrocery(this.state.email, parseInt(this.state.storeID), this.state.password )
        
        this.setState({alertType: "fail", showAlert: true});
        
    }

    render(){

        var display; 

        if(this.props.isEmployee && this.props.isAuthenticated){
           display = <Redirect to= "/OrdersPage"/>
        }
        else
        {
            var currAlert; 
            if(this.state.alertType === 'loading'){
                currAlert = <Alert show={this.state.showAlert} variant="secondary">
                <Alert.Heading>Invalid Log In!</Alert.Heading>
                    <div className="d-flex justify-content-end">
                    <Button onClick={() => this.setState({showAlert: false})} variant="outline-secondary">
                        Close
                    </Button>
                    </div>
                </Alert>
            }else{
                currAlert = <Alert show={this.state.showAlert} variant="danger">
                <Alert.Heading>Invalid Log In!</Alert.Heading>
                    <div className="d-flex justify-content-end">
                    <Button onClick={() => this.setState({showAlert: false})} variant="outline-danger">
                        Close
                    </Button>
                    </div>
                </Alert>
            }


            display =              
                (<Container>
                    {currAlert}

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
                            <Link to='/'>
                                <Button variant="primary" type="button">
                                   User Log In
                                </Button>
                                </Link>
                            </Col>
                        </Row>
                    </Form>
                    
                    </Col>
                    <Col>
                    </Col>
                    </Row>

                    <Row>
                       
                    </Row>

                    <Row>
                    <br/>
                    <p>
                        <br/>
                        For anyone interested in viewing the Grocery Store management Page here are the credentials:
                        <br/>
                        <br/>
                        Store One:<br/>
                        
                            Email: billBaker@gmail.com <br/>
                            Store ID: 1 <br/>
                            Password: 123 <br/>
                        <br/>
                        Store Two: <br/>
                            Email: bobSponge@gmail.com<br/>
                            Store ID: 2<br/>
                            Password: 123<br/>
                    </p>
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