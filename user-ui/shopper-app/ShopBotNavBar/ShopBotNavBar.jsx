import React from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';

const ShopBotLogo = require("./ShopBotLogo.png");

class ShopBotNavBar extends React.Component{

    render(){
        return(
        <Navbar expand="lg" bg="dark" variant="dark">
            <Navbar.Brand>
                <img
                    alt=""
                    src={ShopBotLogo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                Welcome [User Name]
            </Navbar.Brand>
            
            <Nav fill variant="pills" className="mr-auto">
                <Nav.Item>
                    <Nav.Link eventKey="">Shop</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link eventKey="">Cart</Nav.Link>
                </Nav.Item>

            </Nav>

            <Nav justify variant="pills">
                <Nav.Item>
                    <Nav.Link>Log Out</Nav.Link>
                </Nav.Item>
            </Nav>
        </Navbar>
        );
    }
}

export default ShopBotNavBar