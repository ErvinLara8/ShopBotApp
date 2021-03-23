import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {Container, Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../../../../ShopBot-Logo-Design.jpg';
import {logOut} from '../../../actions/auth';

class UserNavBar extends React.Component{

    static propTypes = {
        logOut: PropTypes.func.isRequired,
        user: PropTypes.object
    }


    render(){

        var name = this.props.user.data ? this.props.user.data.first_name + " " +this.props.user.data.last_name : this.props.user.first_name + " " + this.props.user.last_name
        return(
            <Navbar expand="lg" bg="dark" variant="dark">
                <Container>
                            <Navbar.Brand><img src={logo} width="80" height="80"/> ShopBot</Navbar.Brand>
                            <Nav fill variant="tabs" justify className="mr-auto">
                                <Nav.Item>
                                <Nav.Link><Button variant="outline-info"><Link to="/PlaceOrderPage">Order</Link></Button></Nav.Link>
                                </Nav.Item>

                                <Nav.Item>
                                <Nav.Link><Button variant="outline-info"><Link to="/CartPage">Cart</Link></Button></Nav.Link>
                                </Nav.Item>

                                <Nav.Item>
                                <Nav.Link ><Button variant="outline-info"><Link to="/UserOrderHistory">History</Link></Button></Nav.Link>
                                </Nav.Item>
                            </Nav>

                            <Navbar.Text >
                                    User: {name}
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
    user: state.auth.user
});

export default connect(mapStateToProps, {logOut})(UserNavBar);