import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import {Container, Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logOut} from '../../../actions/auth';
import logo from '../../../../ShopBot-Logo-Design.jpg';

class ShopBotNavBar extends React.Component{

    static propTypes = {
        logOut: PropTypes.func.isRequired,
        storeName: PropTypes.string
    }

    // <img src={require('../../../../../../ShopBot-Logo-Design.jpg')}/>

    render(){
        return(
            <Navbar expand="lg" bg="dark" variant="dark">
                <Container>
                            <Navbar.Brand><img src={logo} width="80" height="80"/> ShopBot </Navbar.Brand>
                            <Nav fill variant="tabs" justify className="mr-auto">
                                <Nav.Item>
                                <Nav.Link><Button variant="outline-info"><Link to="/OrdersPage">Orders</Link></Button></Nav.Link>
                                </Nav.Item>

                                <Nav.Item>
                                    <Nav.Link><Button variant="outline-info"><Link to="/GroceryStoreProductsPage">Products</Link></Button></Nav.Link>
                                </Nav.Item>

                                <Nav.Item>
                                <Nav.Link> <Button variant="outline-info"><Link to="/EmployeePage">Employees</Link></Button></Nav.Link>
                                </Nav.Item>
                            </Nav>

                            <Navbar.Text >
                                    {this.props.storeName}
                            </Navbar.Text>


                            <Nav fill className="justify-content-end" variant="pills">

                                <Nav.Item>
                                    <Button onClick={this.props.logOut}>Log Out</Button>
                                </Nav.Item>
                            </Nav>
                </Container>
            </Navbar>
        );
    }
}

const mapStateToProps = state => ({
    storeName: state.auth.groceryStore.name,
});

export default connect(mapStateToProps, {logOut})(ShopBotNavBar);