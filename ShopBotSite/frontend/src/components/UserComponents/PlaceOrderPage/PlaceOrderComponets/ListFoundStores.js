import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table'

class ListFoundStores extends React.Component {
    constructor(props){
        super(props);
        this.selectingStore = this.selectingStore.bind(this);
    }

    selectingStore(e){
        var x = parseInt(e.target.value);
        this.props.selectStore(x);
    }

    render(){

        var display;

        if (this.props.listOfStores.length == 0){
            display = 
            <div>
            <h1>No Stores Found in this Zipcode :(</h1>
            <h2>Please enter a different Zipcode...</h2>
            </div>
        }else{

            var headers = 
            <tr>
                <th>Store Name</th>
                <th>Address</th>
                <th>...</th>
            </tr>

            var allItems = this.props.listOfStores.map((currStore)=>(
                <tr>
                    <th>{currStore["name"]}</th>
                    <th>{currStore["street"]} {currStore["city"]} {currStore["state"]} {currStore["zipcode"]}</th>
                    <th><Button variant="outline-secondary" value = {currStore["store_ID"]} onClick = {this.selectingStore}>Select</Button></th>
                </tr>

            ));

            display = 
            <Table striped bordered hover>
                <thead>
                    {headers}
                </thead>
                <tbody>
                    {allItems}
                </tbody>
            </Table>
        }
        
        return(
            <Row>
            {display}
            </Row>
        )
    }
}

export default ListFoundStores