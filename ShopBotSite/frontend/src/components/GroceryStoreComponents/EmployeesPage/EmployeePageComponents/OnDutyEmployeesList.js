import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


//This is the component that displays the on-duty employees info
class OnDutyEmployeesList extends React.Component{

    constructor(props){
        super(props)

        this.handleOnToOffDuty = this.handleOnToOffDuty.bind(this);
    }

    //sending the employeeID to be transferred to existing 
    handleOnToOffDuty(e){
        this.props.onToOffDuty2(e.target.value);
    }

    getEmployeeStatus(){
        var employeeStatus = "Store Associate";
        if(this.props.isAdmin === "true"){
            this.employeeStatus = "Store Administrator";
        }
        else {
            this.employeeStatus = employeeStatus;
        }
        return this.employeeStatus;
    }

   
    render(){

        return(
            <Container>
                <Row>
                    <Col><h3>{this.props.firstName} {this.props.lastName}</h3></Col>
                    <Col><h5>ID#: {this.props.employeeID}</h5></Col>
                </Row>
                <Row>
                    <Col><h3>{this.getEmployeeStatus}</h3></Col>
                </Row>
                <Row>
                    <Col  md={{ offset: 7 }}><Button onClick={this.handleOnToOffDuty} value={this.props.employeeID}>Clock Out</Button></Col>
                </Row>
            </Container>
        );
    }

}

export default OnDutyEmployeesList