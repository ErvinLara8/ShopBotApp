import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class LogInComp extends React.Component {

    render(){
        //const pageTitle = "ShopBot Grocery Store Log In";
        return(
            <div>
                <h1 style={{ textAlign: "center" }}>ShopBot Grocery Store Log In</h1>
                <p></p>
                <Form style={{ textAlign: "center" }}>
                    <Form.Group controlId="formBasicStoreID">
                        <Form.Label>Store ID</Form.Label>
                        <p></p>
                        <Form.Control type="storeId" placeholder="Enter Grocery Store ID" />
                    </Form.Group>

                    <p></p>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password </Form.Label>
                        <p></p>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                
                    <p></p>
                    <Button variant="primary" type="submit" >
                        Submit
                    </Button> 
                </Form>
            </div>
        );
    }

}

export default LogInComp