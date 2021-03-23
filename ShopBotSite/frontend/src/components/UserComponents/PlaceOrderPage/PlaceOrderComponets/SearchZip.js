import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

class SearchZip extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            
            <Row>
            <h2>Search Store by Zip</h2>
            <br/>
            <InputGroup className="mb-3">
            <FormControl
              placeholder="Search Store By Zip"
              aria-label="Search Store By Zip"
              aria-describedby="basic-addon2"
              onChange={e => this.props.settingZip(e.target.value)}
            />
            <InputGroup.Append>
              <Button variant="outline-secondary" onClick = {this.props.searchStores}>Search</Button>
            </InputGroup.Append>
          </InputGroup>
          </Row>
        );
    }
}

export default SearchZip