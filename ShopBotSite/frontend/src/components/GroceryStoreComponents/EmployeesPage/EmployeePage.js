import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ShopBotNavBar from '../ShopBotNavBar/ShopBotNavBar';
import EmployeeOptions from './EmployeePageComponents/EmployeeOptions';
import OffDutyEmployees from './EmployeePageComponents/OffDutyEmployees';
import OnDutyEmployees from './EmployeePageComponents/OnDutyEmployees';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

// State Page for Employees
class EmployeePage extends React.Component {

    static propTypes = {
        token: PropTypes.string.isRequired,
        managerInfo: PropTypes.object.isRequired,
        storeInfo: PropTypes.object.isRequired,
    }

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
        fetch('/api/auth/GetEmployeesAPI/'+empID+'/update_employee/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.token}`
            },
            body: JSON.stringify({
                is_working: true
            })
            }).catch(error =>{ console.log(error)});  

            this.componentDidMount();
    }

    // this method will be called when an on duty employee clocks out
    onToOffDuty(empID){
        fetch('/api/auth/GetEmployeesAPI/'+empID+'/update_employee/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.token}`
            },
            body: JSON.stringify({
                is_working: false
            })
            }).catch(error =>{ console.log(error)});  

            this.componentDidMount();

    }

    fetchingOffDutyEmp(){

        fetch("/api/auth/GetEmployeesAPI/"+this.props.storeInfo.store_ID+"/fetch_off_duty_employees/", 
        
        {
            method: 'GET',
            headers: {
                'Authorization': `Token ${this.props.token}`
            },
        })
        .then(res => res.json())
        .then((result) => {

            this.setState({
                numOfOffDutyEmployees: result.length,
                allOffDutyEmployees: result
            });
        },
        
        ).catch(error =>{ console.log(error)});  
    }

    fetchingOnDutyEmp(){


        fetch("/api/auth/GetEmployeesAPI/"+this.props.storeInfo.store_ID+"/fetch_working_employees/", 
        
        {
            method: 'GET',
            headers: {
                'Authorization': `Token ${this.props.token}`
            },
        })
        .then(res => res.json())
        .then((result) => {

            this.setState({
                numOfOnDutyEmployees: result.length,
                allOnDutyEmployees: result
            });
        }
        ).catch(error =>{ console.log(error)});

    }

   

    //this method is called after the component is mounted to get all the info 
    componentDidMount(){

        if(this.state.employeeOption === "onDuty"){
            this.fetchingOnDutyEmp();
        }
        else if(this.state.employeeOption === "offDuty"){
            this.fetchingOffDutyEmp();
        }

    }

    render(){

        var currOption = "Loading";

        // choosing between existing and added components
        if(this.state.employeeOption === "onDuty")
        {
            currOption = <OnDutyEmployees 
                           numOfEmployees = {this.state.numOfOnDutyEmployees}
                           allOffDutyEmployees = {this.state.allOnDutyEmployees}
                           onToOffDuty = {this.onToOffDuty}
                        />
        }
        else if (this.state.employeeOption === "offDuty")
        {
            currOption = <OffDutyEmployees 
                            numOfEmployees = {this.state.numOfOffDutyEmployees}
                            allOffDutyEmployees = {this.state.allOffDutyEmployees}
                            offToOnDuty = {this.offToOnDuty}
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

const mapStateToProps = state => ({

    token: state.auth.token,
    managerInfo: state.auth.user,
    storeInfo: state.auth.groceryStore    
});



export default connect(mapStateToProps)(EmployeePage);