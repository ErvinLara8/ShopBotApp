import React from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';

class ShopBotNavBar extends React.Component{

    render(){
        return(
        <Navbar expand="lg" bg="dark" variant="dark">
            <Navbar.Brand>ShopBot</Navbar.Brand>
            
            <Nav fill variant="pills" className="mr-auto">
                <Nav.Item>
                    <Nav.Link href="/OrdersPage">Orders</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link eventKey="">Products</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link eventKey="">Employees</Nav.Link>
                </Nav.Item>
            </Nav>

            <Nav justify variant="pills">
                <Navbar.Text>
                    Signed in as: Blank
                </Navbar.Text>
                <Nav.Item>
                    <Nav.Link>Log Out</Nav.Link>
                </Nav.Item>
            </Nav>
        </Navbar>
        );
    }
}

export default ShopBotNavBar