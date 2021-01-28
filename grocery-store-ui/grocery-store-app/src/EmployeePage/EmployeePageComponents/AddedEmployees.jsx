import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddedEmployeesList from './AddedEmployeesList';
import ListGroup from 'react-bootstrap/ListGroup';


//This is the component that lists all the added employees 
class AddedEmployees extends React.Component{

    constructor(props){
        super(props)

        this.handleAddedtoExisting = this.handleAddedtoExisting.bind(this);
    }

    //method to send the order to complete
    handleAddedtoExisting(employeeID){
        this.props.addedToExisting(employeeID);
    }

    render(){
        
        var display; 

        if(this.props.numOfEmployees === -1)
        {
            display = <h1>Loading Employees...</h1>
        }
        else if (this.props.numOfEmployees > 0)
        {
            //looping though all the employees and passing their data to create <ExistingEmployeesList/> components
            var allEmployees = this.props.allAddedEmployees.map((currEmployee)=>(
                <ListGroup.Item>
                    <AddedEmployeesList 
                        employeeID = {currEmployee["employeeID"]}
                        firstName = {currEmployee["firstName"]}
                        lastName = {currEmployee["lastName"]}
                        password = {currEmployee["password"]}
                        addedToExisting2 = {this.handleAddedtoExisting}
                    />
                </ListGroup.Item>

            ));

            display = <ListGroup>{allEmployees}</ListGroup>

        }
        else
        {
            display = <h1>No New Employees Added!</h1>
        }

        return(
            display
        );
    }
}

export default AddedEmployees