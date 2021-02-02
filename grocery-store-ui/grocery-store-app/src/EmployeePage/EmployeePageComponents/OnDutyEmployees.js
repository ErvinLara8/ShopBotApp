import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import OnDutyEmployeesList from './OnDutyEmployeesList';
import 'bootstrap/dist/css/bootstrap.min.css';

//This is the component that displays a list of all the existing employees for the chosen grocery store
class OnDutyEmployees extends React.Component{

    constructor(props){
        super(props)

        this.handleOnToOffDuty = this.handleOnToOffDuty.bind(this);
    }

    //method to send the on duty employee to the off duty employee list
    handleOnToOffDuty(employeeID){
        this.props.onToOffDuty(employeeID);
    }

    render(){
        
        var display;

        if(this.props.numOfEmployees === -1)
        {
            display = <h1>Loading Employees...</h1>
        }
        else if (this.props.numOfEmployees > 0)
        {
            //looping though all the employees and passing data to create <OnDutyEmployeesList/> components
            var allEmployees = this.props.allOffDutyEmployees.map((currEmployee)=>(
                <ListGroup.Item>
                    <OnDutyEmployeesList 
                        employeeID = {currEmployee["employeeID"]}
                        firstName = {currEmployee["firstName"]}
                        lastName = {currEmployee["lastName"]}
                        password = {currEmployee["password"]}
                        isAdmin = {currEmployee["isAdmin"]}
                        isWorking = {currEmployee["isWorking"]}
                        onToOffDuty2 = {this.handleOnToOffDuty}
                    />
                </ListGroup.Item>

            ));

            display = <ListGroup>{allEmployees}</ListGroup>

        }
        else
        {
            display = <h1>No On Duty Employees!</h1>
        }

        return(
            display
        );
    }
}

export default OnDutyEmployees