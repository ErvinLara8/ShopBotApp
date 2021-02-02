import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const ShopBotLogo = require("./ShopBotLogo.png");

class LogInComp extends React.Component {

    render(){
        return(
            <div>
                <h1 style={{ textAlign: "center" }}>ShopBot Shopping</h1>
                <h1 style={{ textAlign: "center" }}>Your quick and contactless shopping solution!</h1>
                <Col xs={6} md={4}>
                    <Image src={ShopBotLogo} roundedCircle />
                </Col>
                <p></p>
                <Form style={{ textAlign: "center" }}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Store ID</Form.Label>
                        <p></p>
                        <Form.Control type="userEmailAddr" placeholder="Email Address:" />
                    </Form.Group>

                    <p></p>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password </Form.Label>
                        <p></p>
                        <Form.Control type="password" placeholder="Password:" />
                    </Form.Group>
                
                    <p></p>
                    <Button variant="primary" type="submit" >
                        Log In
                    </Button> 

                    <h1 style={{ textAlign: "center" }}>Don't have ShopBot Shopping account? Register today!</h1>

                    <p></p>
                    <Button variant="primary" type="submit" >
                        Register
                    </Button>
                </Form>
            </div>
        );
    }

}

export default LogInComp