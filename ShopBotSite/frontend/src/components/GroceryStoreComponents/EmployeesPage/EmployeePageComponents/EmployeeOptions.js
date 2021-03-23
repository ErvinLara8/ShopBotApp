import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

//This is the side bar component that switches between All Employees and Add Employees
class EmployeeOptions extends React.Component{

    //constructor
    constructor(props) {
        super(props);
        this.handleOptionChange = this.handleOptionChange.bind(this)
    }

    handleOptionChange(e){
        this.props.setEmployeeOption(e.target.value);
    }

    render(){
        return(
            <Container>

                <Row>
                    <Button type="button" value="onDuty" className="button-clicked" onClick = {this.handleOptionChange}>On Duty Employees</Button>
                </Row>
                <Row>
                    <Button  type="button" value="offDuty" className="button-unclicked" onClick = {this.handleOptionChange}>Off Duty Employees</Button>
                </Row>

            </Container>

        );
    }
}

export default EmployeeOptions;