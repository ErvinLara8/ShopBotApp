import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

//this is the component that lists an added employee 
class OffDutyEmployeesList extends React.Component{ //TODO: Saara edit this to reflect the proper data to be displayed

    constructor(props){
        super(props)

        this.handleOffToOnDuty = this.handleOffToOnDuty.bind(this);
    }

    //sending the employeeID to be transferred to existing 
    handleOffToOnDuty(e){
        this.props.offToOnDuty2(e.target.value);
    }

    render(){
        return(
            <Container>
                <Row>
                    <Col><h3>{this.props.firstName} {this.props.lastName}</h3></Col>
                    <Col><h5>ID#: {this.props.employeeID}</h5></Col>
                </Row>
                <Row>
                    <Col  md={{ offset: 7 }}><Button onClick={this.handleOffToOnDuty} value={this.props.employeeID}>Clock In</Button></Col>
                </Row>
            </Container>
        );
    }

}

export default OffDutyEmployeesList