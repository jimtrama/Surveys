import React from "react";
import { Component } from "react";
import { Row, Col, Form } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css'


class Option extends Component{
    
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Row>
                <Col xs={1}>
                    <Form.Control disabled  type="radio" />
                </Col>
                <Col>
                    <Form.Control  type="text" />
                </Col>
                <Col xs={2}>
                    <i className="fa fa-plus-circle"></i> <i className="fa fa-minus-circle"></i>
                </Col>
            </Row>
        )
    }
}

export default Option;