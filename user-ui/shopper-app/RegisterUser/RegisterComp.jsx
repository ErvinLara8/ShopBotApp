import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const ShopBotLogo = require("./ShopBotLogo.png");

class RegisterComp extends React.Component {

    render(){
        return(
            <div>
                <h1 style={{ textAlign: "center" }}>Register to become a ShopBot Shopper</h1>
                <h1 style={{ textAlign: "center" }}>Please fill out the following fields:</h1>
                <Col xs={6} md={4}>
                    <Image src={ShopBotLogo} roundedCircle />
                </Col>
                <p></p>
                <Form style={{ textAlign: "center" }}>
                    <Form.Group controlId="formBasicUserID">
                        <Form.Label>User ID</Form.Label>
                        <p></p>
                        <Form.Control type="userID" placeholder="please enter a numeric user ID" />
                    </Form.Group>

                    <p></p>

                    <Form.Group controlId="formBasicFirstName">
                        <Form.Label>First Name</Form.Label>
                        <p></p>
                        <Form.Control type="firstName" placeholder="first name" />
                    </Form.Group>

                    <p></p>

                    <Form.Group controlId="formBasicLastName">
                        <Form.Label>Last Name</Form.Label>
                        <p></p>
                        <Form.Control type="lastName" placeholder="last name" />
                    </Form.Group>

                    <p></p>

                    <Form.Group controlId="formBasicUserEmail">
                        <Form.Label>Email Address</Form.Label>
                        <p></p>
                        <Form.Control type="emailAddr" placeholder="email address" />
                    </Form.Group>

                    <p></p>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <p></p>
                        <Form.Control type="password" placeholder="password" />
                    </Form.Group>
                
                    <p></p>
                    <Button variant="primary" type="submit" >
                        Register!
                    </Button>
                </Form>
            </div>
        );
    }

}

export default RegisterComp