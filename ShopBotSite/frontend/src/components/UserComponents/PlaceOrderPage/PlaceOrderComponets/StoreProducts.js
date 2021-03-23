import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table'

class StoreProducts extends React.Component {
    constructor(props){
        super(props);
    }

    render(){

        var display;

        if (this.props.listOfProducts.length == 0){
            display = 
            <div>
            <h1>This Store Has no Products</h1>
            <h2>Please Select a different Store...</h2>
            </div>
        }else{
            var headers = 
            <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Available</th>
                <th>Num Wanted</th>
                <th>...</th>
            </tr>

            var numSelections = {}

            for(var i = 0; i < this.props.listOfProducts.length; i++){
                var currSelection = []

                for(var j = 1; j <= this.props.listOfProducts[i]["quantity"]; j++){
                    currSelection.push(<option>{j}</option>);
                }
                numSelections[this.props.listOfProducts[i]["listing_ID"]] = currSelection;
                this.props.wantedOfEachProd[this.props.listOfProducts[i]["listing_ID"]] = 1
            }
            
            var allItems = this.props.listOfProducts.map((currProduct)=>(
                <tr>
                    <th>{currProduct["product_ID"]["name"]}</th>
                    <th>{currProduct["product_ID"]["category_ID"]["categoryName"]}</th>
                    <th>${currProduct["price"]}/each</th>
                    <th>{currProduct["quantity"]}</th>
                    <th>
                    <FormControl as="select" onChange= { e => {this.props.wantedOfEachProd[currProduct["listing_ID"]] = parseInt(e.target.value)}}>
                        {numSelections[currProduct["listing_ID"]]}
                    </FormControl>
                    </th>
                    <th><Button variant="outline-secondary" value = {currProduct["listing_ID"]} onClick={e => {this.props.addToCart(parseInt(e.target.value))}}>Add To Cart</Button></th>
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

export default StoreProducts