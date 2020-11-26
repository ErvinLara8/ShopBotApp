import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import LogInComp from './LogIn/LogInComp';


class GroceryStoreApp extends React.Component{

    render(){

        return(
            <Container>
                <Row>
                    <Col><LogInComp /></Col>
                </Row>
            </Container>
        );
    }
}

export default GroceryStoreApp