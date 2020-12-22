import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';


class OrdersPage extends React.Component {

    render(){
        //const pageTitle = "ShopBot Grocery Store Log In";
        return(
            <Container>
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

            </Container>
        );
    }

}

export default OrdersPage