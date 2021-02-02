import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import ShopBotNavBar from '../ShopBotNavBar/ShopBotNavBar';
import EmployeeOptions from './EmployeePageComponents/EmployeeOptions';
import OffDutyEmployees from './EmployeePageComponents/OffDutyEmployees';
import OnDutyEmployees from './EmployeePageComponents/OnDutyEmployees';
import 'bootstrap/dist/css/bootstrap.min.css';

// State Page for Employees
class EmployeePage extends React.Component {

    //constructor
    constructor(props){
        super(props);

        //these are the page variables
        this.state = {
            employeeOption: "onDuty", 
            numOfOnDutyEmployees: -1, 
            numOfOffDutyEmployees: -1, 
            allOnDutyEmployees: [],
            allOffDutyEmployees: [],
        }

        //Here I am binding all functions
        this.setEmployeeOption = this.setEmployeeOption.bind(this);
        this.offToOnDuty = this.offToOnDuty.bind(this);
        this.onToOffDuty = this.onToOffDuty.bind(this);
        this.fetchingOnDutyEmp = this.fetchingOnDutyEmp.bind(this);
        this.fetchingOffDutyEmp = this.fetchingOffDutyEmp.bind(this);

        //this.addedToExisting = this.addedToExisting.bind(this);
    }

    //function to set variable that determines which option is being displayed
    setEmployeeOption(option){
        this.setState({employeeOption: option});
        this.componentDidMount();
    }

    // this method will be called when an off duty employee clocks in
    offToOnDuty(empID){
        fetch('/api/EmployeesAPI/'+empID+'/update_employees/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "isWorking": true
            })
            })

            this.componentDidMount();
    }

    // this method will be called when an on duty employee clocks out
    onToOffDuty(empID){
        fetch('/api/EmployeesAPI/'+empID+'/update_employees/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "isWorking": false
            })
            })

            this.componentDidMount();

    }

    fetchingOffDutyEmp(){
        fetch("/api/EmployeesAPI/fetching_offDuty_employees")
        .then(res => res.json())
        .then((result) => {

            this.setState({
                numOfOffDutyEmployees: result.length,
                allOffDutyEmployees: result
            });
        },
        (error) => { }
        );  
    }

    fetchingOnDutyEmp(){
        fetch("/api/EmployeesAPI/fetching_onDuty_employees")
        .then(res => res.json())
        .then((result) => {

            this.setState({
                numOfOnDutyEmployees: result.length,
                allOnDutyEmployees: result
            });
        },
        (error) => { }
        );  
    }

    // addedToExisting(existingEmployeeID){
    //     //we will do some backend fetching over here

    //     //temp Variables 
    //     var tempEmployee;
    //     var tempAllAdded;

    //     //looping through array 
    //     for(let list of this.state.allOffDutyEmployees){
    //         if (list["employeeID"] === existingEmployeeID){ 
    //             tempEmployee = list; 
    //             break;
    //         }
    //     }
        
    //     //getting rid of value in pending array 
    //     tempAllAdded = this.state.allOffDutyEmployees.filter(list => list["employeeID"] !== existingEmployeeID)

    //     //setting new arrays 
    //     this.setState({
    //         allOffDutyEmployees: tempAllAdded,
    //         allOnDutyEmployees: this.state.allOnDutyEmployees.concat(tempEmployee)
    //     })
    // }

    //this method is called after the component is mounted to get all the info 
    componentDidMount(){

        if(this.state.employeeOption === "onDuty"){
            this.fetchingOnDutyEmp();
        }
        else if(this.state.employeeOption === "offDuty"){
            this.fetchingOffDutyEmp();
        }

    //     fetch("/GetEmployees")
    //     .then(res => res.json())
    //     .then((result) => {

    //         this.setState({
    //             numOfOnDutyEmployees: result.onDutyEmployees.length, 
    //             numOfOffDutyEmployees: result.offDutyEmployees.length,
    //             allOnDutyEmployees : result.onDutyEmployees,
    //             allOffDutyEmployees: result.offDutyEmployees
    //         });
    //         console.log(result.onDutyEmployees);
    //     },
    //     (error) => { }
    //     );

    }

    render(){

        var currOption = "Loading";

        // choosing between existing and added components
        if(this.state.employeeOption === "onDuty")
        {
            currOption = <OnDutyEmployees 
                           numOfEmployees = {this.state.numOfOnDutyEmployees}
                           allOffDutyEmployees = {this.state.allOnDutyEmployees}
                           offToOnDuty = {this.offToOnDuty}
                        />
        }
        else if (this.state.employeeOption === "offDuty")
        {
            currOption = <OffDutyEmployees 
                            numOfEmployees = {this.state.numOfOffDutyEmployees}
                            allOffDutyEmployees = {this.state.allOffDutyEmployees}
                            onToOffDuty = {this.onToOffDuty}
                        />
        }

        return(
            <Container>
                <Row sm={1} md={1} lg ={1}>
                    <ShopBotNavBar/>
                </Row>

                <Row>
                    <Col sm={2} md={2} lg ={2}>
                        <EmployeeOptions 
                            setEmployeeOption = {this.setEmployeeOption}
                        />
                    </Col>
                    <Col sm={10} md={10} lg ={10}>
                        {currOption}
                    </Col>
                </Row>

            </Container>
        );
    }

}

export default EmployeePage