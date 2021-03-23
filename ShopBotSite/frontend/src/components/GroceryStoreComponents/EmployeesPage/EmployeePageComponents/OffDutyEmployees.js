import React from 'react';
import OffDutyEmployeesList from './OffDutyEmployeesList';
import ListGroup from 'react-bootstrap/ListGroup';


//This is the component that lists all the added employees 
class OffDutyEmployees extends React.Component{

    constructor(props){
        super(props)

        this.handleOffToOnDuty = this.handleOffToOnDuty.bind(this);
    }

    //method to send the off duty employee to the on duty employee list
    handleOffToOnDuty(employeeID){
        this.props.offToOnDuty(employeeID);
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
            var allEmployees = this.props.allOffDutyEmployees.map((currEmployee)=>(
                <ListGroup.Item>
                    <OffDutyEmployeesList 
                        employeeID = {currEmployee["employee_ID"]}
                        firstName = {currEmployee["user_id"]["first_name"]}
                        lastName = {currEmployee["user_id"]["last_name"]}
                        isAdmin = {currEmployee["is_admin"]}
                        isWorking = {currEmployee["is_working"]}
                        offToOnDuty2 = {this.handleOffToOnDuty}
                    />
                </ListGroup.Item>

            ));

            display = <ListGroup>{allEmployees}</ListGroup>

        }
        else
        {
            display = <h1>No Off Duty Employees!</h1>
        }

        return(
            display
        );
    }
}

export default OffDutyEmployees