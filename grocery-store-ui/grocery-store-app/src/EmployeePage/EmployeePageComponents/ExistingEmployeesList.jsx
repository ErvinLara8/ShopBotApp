import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


//This is the component that displays an existing employees info
class ExistingEmployeesList extends React.Component{

    render(){
        return(
            <Container>
                <Row>
                    <Col><h3>{this.props.firstName} {this.props.lastName}</h3></Col>
                    <Col><h5>Employee ID Number: {this.props.employeeID}</h5></Col>
                </Row>
            </Container>
        );
    }

}

export default ExistingEmployeesList