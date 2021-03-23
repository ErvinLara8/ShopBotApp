import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Container, Row, Col} from 'react-bootstrap';
import {Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logInUser} from '../../../actions/auth';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import {Link} from 'react-router-dom';



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
             firstName: "",
             lastName: "",
             email : "",
             password : "",
             repeatedPass:"",
             createdSuccess: "fail",
             showModal: false,
             isCreated: false
        }

        this.submitRegistration = this.submitRegistration.bind(this);
       
    }

    submitRegistration(e){

        e.preventDefault();

        if(this.state.password !== this.state.repeatedPass){
            this.setState({createdSuccess: "fail",showModal: true});
        }else{
           
            const username = this.state.firstName + this.state.lastName;
            

            fetch("/api/auth/UserLogInAPI/create_user/",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: this.state.password,
                    first_name: this.state.firstName,
                    last_name: this.state.lastName,
                    email: this.state.email,
                    is_staff: false,
                    is_active:true,
                    date_joined: new Date().toJSON().slice(0, 19)
                })
            }
            )
            .then(res => res.json())
            .then((result) => {

                if (result.username.length === 1){
                    this.setState({createdSuccess: "exist", showModal: true});
                }else {
                    this.setState({createdSuccess: "created", showModal: true});
                }
            }).catch(error =>{ console.log(error)});

        }

        
        
    }

    render(){

         

        var accountCreated;

        
        var display =              
            (<Container>
                <form>
            <h3>Register</h3>

            <div className="form-group">
                <label>First name</label>
                <input type="text" className="form-control" placeholder="First name" name="firstname" onChange={e => this.setState({ firstName: e.target.value })} />
            </div>

            <br/>

            <div className="form-group">
                <label>Last name</label>
                <input type="text" className="form-control" placeholder="Last name" name="lastname" onChange={e => this.setState({ lastName: e.target.value })}/>
            </div>

            <br/>

            <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" placeholder="Enter email" name="email" onChange={e => this.setState({ email: e.target.value })}/>
            </div>

            <br/>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" name="password" onChange={e => this.setState({ password: e.target.value })} />
            </div>

            <br/>

            <div className="form-group">
                <label>Repeat Password</label>
                <input type="password" className="form-control" placeholder="Enter password" name="pasword2" onChange={e => this.setState({ repeatedPass: e.target.value })}/>
            </div>

            <br/>

            <button type="button" className="btn btn-success btn-lg btn-block" onClick={this.submitRegistration}>Register</button>
            <p className="forgot-password text-right">
                Already registered <a href="login">log in</a>
            </p>
        </form>

        </Container>
        )
    


        if(this.state.createdSuccess == "created"){
            accountCreated =   
            <Modal
                show={this.state.showModal}
                onHide={()=> {this.setState({showModal: false})}}
                backdrop="static"
                keyboard={false}
            >
                <Alert variant='success'>
                <Modal.Header>
                <Modal.Title>Account Created!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Button variant="secondary">
                    <Link to="/">
                    Close
                    </Link>
                </Button>
                </Modal.Body>
                </Alert>
            </Modal>
        }
        else if(this.state.createdSuccess == "exist"){
            accountCreated =   
            <Modal
                show={this.state.showModal}
                onHide={()=> {this.setState({showModal: false})}}
                backdrop="static"
                keyboard={false}
            >
                <Alert variant='secondary'>
                <Modal.Header>
                <Modal.Title>Email Taken Already!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Button variant="secondary" onClick={()=> {this.setState({showModal: false})}}>
                    Close
                </Button>
                </Modal.Body>
                </Alert>
            </Modal>
        }
        else {
            accountCreated =   
            <Modal
                show={this.state.showModal}
                onHide={()=> {this.setState({showModal: false})}}
                backdrop="static"
                keyboard={false}
            >
                <Alert variant='danger'>
                <Modal.Header>
                <Modal.Title>Passwords do not match!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Button variant="secondary" onClick={()=> {this.setState({showModal: false})}}>
                    Close
                </Button>
                </Modal.Body>
                </Alert>
            </Modal>
        }
        return(
            <div>
            {accountCreated}
            <br/>
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