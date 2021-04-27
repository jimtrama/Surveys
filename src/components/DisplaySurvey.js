import React, { Component } from "react";
import {Table, Row, Col} from 'react-bootstrap'
import Header from "./Header";

class DisplaySurvey extends Component{

    state = {
        question: 'What is the popular technology in 2020 ?',
        options: ['Micro Services', 'DevOps', 'ReactJS', 'AWS', 'VueJS', 'Azure'],
        results: [
            {name:'Micro Services', count: 76}, 
            {name: 'DevOps', count: 49},
            {name: 'ReactJS', count: 42},
            {name: 'AWS', count: 21},
            {name: 'VueJS', count: 15},
            {name: 'Azure', count: 63}
        ],
        isSurveyTaken: false,
        totalUsersTookSurvey: 300,
        
    }

    showResult = () =>{
        this.setState({isSurveyTaken: true})
        console.log(this.state.results);
    }

    render() {

        const optionsData = this.state.options.map((opt, index) => {
            return (
                <div className="radio" key={index}>
                    <label><input type="radio" name="optradio" />{opt}</label>
                </div>
            )
        });

        let resultData = null;
        let columnsData = null;

        if(this.state.isSurveyTaken){

            columnsData =Object.keys(this.state.results[0]).map((col, index) => {
                return (
                    <th>{col}</th>
                );
            });
            
            resultData = this.state.results.map((option, index) => {
                return (

                    <tr>
                        <td>{option.name}</td>
                        <td>{option.count}</td>
                    </tr>

                );
            });
        }
        

        return (
            
            <div>
            <Header/>
            <div className="container" >
              <div className="jumbotron">
                <h1>{this.state.question}</h1>
                <p>({this.state.totalUsersTookSurvey} people took this survey)</p>

                {optionsData}
        
                <button className="btn btn-success" disabled={this.state.isSurveyTaken} onClick={this.showResult}>Submit</button>
              </div>
            </div>
            
            <Row>
                <Col></Col>
                <Col lg={10}>
                    {
                        this.state.isSurveyTaken ? <h3>Thank you for vote. Result is below:</h3> : null
                    }
            
                    <Table responsive style={{width: 300}}>
                        <tbody>
                            <tr>{columnsData}</tr>
                            {resultData}
                        </tbody>
                    </Table>
                </Col>
                <Col></Col>
            </Row>
            </div>
        )

        }

}

export default DisplaySurvey;