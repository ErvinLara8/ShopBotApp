import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import ExistingEmployeesList from './ExistingEmployeesList';
import 'bootstrap/dist/css/bootstrap.min.css';

//This is the component that displays a list of all the existing employees for the chosen grocery store
class ExistingEmployees extends React.Component{
    render(){
        
        var display;

        if(this.props.numOfEmployees === -1)
        {
            display = <h1>Loading Employees...</h1>
        }
        else if (this.props.numOfEmployees > 0)
        {
            //looping though all the employees and passing data to create <ExistingEmployeeList/> components
            var allEmployees = this.props.allExistingEmployees.map((currEmployee)=>(
                <ListGroup.Item>
                    <ExistingEmployeesList 
                        employeeID = {currEmployee["employeeID"]}
                        firstName = {currEmployee["firstName"]}
                        lastName = {currEmployee["lastName"]}
                        password = {currEmployee["password"]}
                    />
                </ListGroup.Item>

            ));

            display = <ListGroup>{allEmployees}</ListGroup>

        }
        else
        {
            display = <h1>No Existing Employees!</h1>
        }

        return(
            display
        );
    }
}

export default ExistingEmployees