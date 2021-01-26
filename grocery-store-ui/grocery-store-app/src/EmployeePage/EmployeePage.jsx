import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import ShopBotNavBar from '../ShopBotNavBar/ShopBotNavBar';
import EmployeeOptions from './EmployeePageComponents/EmployeeOptions';
import AddedEmployees from './EmployeePageComponents/AddedEmployees';
import ExistingEmployees from './EmployeePageComponents/ExistingEmployees';
import 'bootstrap/dist/css/bootstrap.min.css';

// State Page for Employees
class EmployeePage extends React.Component {

    //constructor
    constructor(props){
        super(props);

        //these are the page variables
        this.state = {
            employeeOption: "adding", 
            numOfExistingEmployees: -1,
            numOfAddedEmployees: -1,
            allExistingEmployees: [],
            allAddedEmployees: [],
        }

        //Here I am binding all functions
        this.setEmployeeOption = this.setEmployeeOption.bind(this);
        this.addedToExisting = this.addedToExisting.bind(this);

    }

    //function to set variable that determines which option is being displayed
    setEmployeeOption(option){
        this.setState({employeeOption: option});
    }

    // this method will be called when an Pending order is completed
    addedToExisting(addedEmployeeID){
        //we will do some backend fetching over here

        //temp Variables 
        var tempEmployee;
        var tempAllAdded;

        //looping through array 
        for(let list of this.state.allAddedEmployees){
            if (list["employeeID"] === addedEmployeeID){ 
                tempEmployee = list; 
                break;
            }
        }
        
        //getting rid of value in pending array 
        tempAllAdded = this.state.allAddedEmployees.filter(list => list["employeeID"] !== addedEmployeeID)

        //setting new arrays 
        this.setState({
            allAddedEmployees: tempAllAdded,
            allExistingEmployees: this.state.allExistingEmployees.concat(tempEmployee)
        })
    }

    //this method is called after the component is mounted to get all the info 
    componentDidMount(){

        fetch("/GetEmployees")
        .then(res => res.json())
        .then((result) => {

            this.setState({
                numOfExistingEmployees: result.existingEmployees.length, 
                numOfAddedEmployees: result.addedEmployees.length,
                allExistingEmployees : result.existingEmployees,
                allAddedEmployees: result.addedEmployees
            });
        },
        (error) => { }
        );

    }



    render(){

        var currOption = "Loading";

        // choosing between pending and completed components
        if(this.state.employeeOption === "existing")
        {
            currOption = <ExistingEmployees 
                            numOfEmployees = {this.state.numOfExistingEmployees}
                            allAddedEmployees = {this.state.allExistingEmployees}
                        />
        }
        else if (this.state.employeeOption === "adding")
        {
            currOption = <AddedEmployees 
                            numOfEmployees = {this.state.numOfAddedEmployees}
                            allAddedEmployees = {this.state.allAddedEmployees}
                            addedToExisting = {this.addedToExisting}
                        />
        }

        //const pageTitle = "ShopBot Grocery Store Log In";
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