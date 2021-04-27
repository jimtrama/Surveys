import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, ListGroup, Col, Form, ButtonGroup, Card, Alert, Modal } from 'react-bootstrap';
import './surveyClone.css'
import axios from 'axios'
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import Button from '@material-ui/core/Button'
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { List, Accordion, AccordionSummary, AccordionDetails, Typography, Grid, Divider } from "@material-ui/core";

function CloneSurvey() {

    const [surveys, setSurveys] = useState([]);
    let userid = useSelector(state => state.userId);
    useEffect(() => {

        async function init() {
            let headers = {
                "method": "GET",
                "headers": {
                    'Content-Type': 'application/json',
                    "Accept": "application/json"
                }

            }

            try {
                let res = await fetch(process.env.REACT_APP_BASE_URL + `/api/survey/get-surveys/${userid}`, headers);
                let dataa = await res.json();
                if (dataa.status === "success") {
                    setSurveys(dataa.data)
                    console.log(dataa.data);
                } else {
                    console.log(dataa.message)
                }
            } catch (error) {
                console.log(error);
            }
        } init()
    }, []);

    function ModalPreview({ survey }) {
        console.log(survey);
        const [show, setShow] = useState(false);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        return (
            <>

                <Button variant="contained" style={{ width: "100%", marginTop: "5px" }} color="primary" onClick={handleShow} >
                    Preview
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Preview : {survey.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <List style={{ maxHeight: "300px", overflow: 'auto' }} subheader={<li />}>
                            {survey.questions.map((question, index) => {

                                return (
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography variant="h6">Q{index + 1}:{question.question}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Grid container >
                                                {question.options.map((option, i) => {

                                                    if (question["question-type"] != "TEXTBOX_OPTION") {
                                                        return (
                                                            <>
                                                                <Grid item xs={12} style={{ width: "100%" }}>
                                                                    <Typography  >Option{i + 1}:{option.option}</Typography>
                                                                </Grid>
                                                                <Grid item xs={12}>
                                                                    <Divider />
                                                                </Grid>

                                                            </>);
                                                    } else {
                                                        return (
                                                            <Typography>TextBox Question</Typography>
                                                        )
                                                    }

                                                })}
                                            </Grid>
                                        </AccordionDetails>
                                    </Accordion>
                                );

                            })}
                        </List>
                    </Modal.Body>

                </Modal>
            </>
        );
    }


    const allSurveys = surveys.map((survey, index) => {
        console.log(survey);
        return (
            <div className="survey">
                <Row>
                    <Col className="survey-titlec">
                        {survey.title}
                    </Col>
                    <Col className="survey-col-line">
                        <p className="numbers">{survey.questions.length}</p>
                        <p>Questions</p>
                    </Col>
                    <Col className="survey-col-line">
                        <p className="numbers">{survey.TOTAL_TAKERS}</p>
                        <p>Votes</p>
                    </Col>
                    <Col className="survey-col-line">
                        <p className="numbers">{survey["total-clones"]}</p>
                        <p>Clones</p>
                    </Col>
                    <Col className="survey-col-line-button">
                        <ButtonGroup size="sm" vertical>
                            <Button variant="contained" color="primary">
                                <Link style={{ color: "white" }} to={{
                                    pathname: "/create-from-scratch",
                                    search: "?action=clone&survey_id=" + survey.surveyId
                                }}>Clone Survey</Link>
                            </Button>
                            <ModalPreview survey={survey}/>
                        </ButtonGroup>
                    </Col>
                </Row>
            </div>
        )

    })


    return (
        <>
            <Header />
            <Container>
                <Row>

                    <div className="jumbotron" style={{
                        width: '100%'
                    }}>
                        <h2>Your Surveys:</h2>
                        {allSurveys}
                    </div>
                </Row>
            </Container>
        </>
    )

}

export default CloneSurvey;