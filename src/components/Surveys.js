import React, { Component, useState } from 'react'
import { Container, Row, Col, ButtonGroup, Button, Modal, Badge } from 'react-bootstrap'
import { Link } from "react-router-dom";
import './survey.css'
import Dialog from 'react-bootstrap-dialog'
import Header from './Header';
import { Grid, TextField, List, ListSubheader, ListItem, ListItemText, Box, CircularProgress, Typography, Accordion, AccordionSummary, AccordionDetails, Divider } from '@material-ui/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { upadateSelectedSurveyForEdit } from './../actions/index';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { CheckAuth } from '../Auth';


function Surveys(props) {
    const dispatch = useDispatch();
    const [surveys, setSurveys] = useState([]);
    let data = [];
    let userid = useSelector(state => state.userId);
    if (!CheckAuth()) {
        props.history.replace("/");
    }
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
                    console.log(data.message)
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

                <Button variant="primary" onClick={handleShow} style={{ lineHeight: "0px", fontSize: "13px", maxWidth: "120px", maxHeight: "35px", paddingRight: "0px", paddingLeft: "0px", paddingTop: "10px", paddingBottom: "10px", width: "100%", whiteSpace: "normal" }}>
                    Preview
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Preview : {survey.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <List style={{ maxHeight: "300px", overflow: 'auto' }} subheader={<li />}>
                            {survey.questions.map((question,index) => {

                                return (
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography variant="h6">Q{index+1} : {question.question}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                        
                                            <Grid container >
                                            <Grid item xs={12}>
                                            
                                            <Typography>Options ({question["question-type"]})</Typography>
                                            </Grid>
                                                {question.options.map((option, i) => {

                                                    if (question["question-type"] != "TEXTBOX_OPTION") {
                                                        return (
                                                            <>
                                                                <Grid item xs={12} style={{ width: "100%" }}>
                                                                    <Typography  >{i+1}. {option.option}</Typography>
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

    function ModalEdit({ survey, title, questions }) {
        function EditSurvey() {
            dispatch(upadateSelectedSurveyForEdit(survey));
            props.history.replace("/create-from-scratch");
        }
        const [show, setShow] = useState(false);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        return (
            <>

                <Button variant="danger" onClick={handleShow}>
                    Edit
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit "{title}"</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Grid Container>
                            <Grid item xs={12}>
                                <h4> Total Number of Questions {questions}</h4>
                            </Grid>

                        </Grid>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={() => { EditSurvey(); handleClose(); }}>
                            Edit
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
    function ModalResults({ id, title, votes, questions }) {
        const [show, setShow] = useState(false);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        return (
            <>

                <Button variant="primary" onClick={handleShow}>
                    Results
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Results </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <List style={{ maxHeight: "300px", overflow: 'auto' }} subheader={<li />}>
                            {questions.map((question,index) => {

                                let optionsCount = [];
                                let totalVotes = 0;
                                for (let option of question.options) {
                                    optionsCount.push(option.votedUsers.length - 1);
                                    totalVotes += option.votedUsers.length - 1;
                                }

                                return (
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography variant="h6">Q{index+1}:{question.question}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Grid container >
                                                {question.options.map((option, i) => {
                                                    let persent = 0;
                                                    if (totalVotes != 0) {
                                                        persent = optionsCount[i] * 100 / totalVotes;
                                                    }
                                                    if (question["question-type"] != "TEXTBOX_OPTION") {
                                                        return (
                                                            <>
                                                                <Grid item xs={6} style={{ justifyContent: "center", alignItems: "center", display: "flex", width: "100%" }}>
                                                                    <Typography  >{option.option}</Typography>
                                                                </Grid>
                                                                <Grid item xs={6}>
                                                                    <Typography>
                                                                        <Box position="relative" >
                                                                            <CircularProgress variant="static" value={persent} />
                                                                            <Box
                                                                                top={0}
                                                                                left={0}
                                                                                bottom={0}
                                                                                right={0}
                                                                                position="absolute"
                                                                                display="flex"
                                                                                alignItems="center"
                                                                                justifyContent="center"
                                                                            >
                                                                                <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
                                                                                    persent
                                                                                )}%`}</Typography>
                                                                            </Box>
                                                                        </Box>
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item xs={12}>
                                                                    <Divider />
                                                                </Grid>
                                                            </>);
                                                    } else {
                                                        return (
                                                            <Button>Load Answers</Button>
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
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>

                    </Modal.Footer>
                </Modal>
            </>
        );
    }
    function ModalExampleShare({ id, title, url }) {
        const [show, setShow] = useState(false);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        function CopyLink() {
            var copyText = document.getElementById("url");
            navigator.clipboard.writeText(copyText.value);
            alert("Copyied to clipboard!");


        }
        return (
            <>

                <Button variant="success" onClick={handleShow}>
                    Share
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Share "{title}"</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Grid Container>
                            <Grid item xs={12}>
                                <h4> You can copy the bellow survey URL</h4>
                            </Grid>
                            <Grid item xs={12} style={{ marginTop: "10px" }}>
                                <h4> and Share to your friends</h4>
                            </Grid>
                            <Grid item xs={12} style={{ marginTop: "10px", display: "flex", width: "100%", alignItems: "center" }}>
                                <TextField id="url" disabled="true" multiline="true" rows="3" style={{ width: "100%" }} value={process.env.REACT_APP_BASE_URL.replace("8082", "8080")+"/smartcivitas/#" + url} />


                            </Grid>


                        </Grid>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" style={{ marginLeft: "auto" }} onClick={CopyLink}>Copy</Button>
                        <Button variant="success" onClick={() => { alert("WhatsApp Message Sent"); handleClose(); }}>
                            Whatsapp
                        </Button>
                        <Button variant="primary" onClick={() => { alert("Email Sent"); handleClose(); }}>
                            Email
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
    async function ChangeStatus(survey, status) {
        let dataBody = {
            "survey-status": status,
        }
        let headers = {
            "method": "PUT",
            "headers": {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            },
            "body": JSON.stringify(dataBody)

        }

        try {
            let res = await fetch(process.env.REACT_APP_BASE_URL + `/api/survey/${survey.surveyId}/field-update`, headers);
            let dataa = await res.json();
            if (dataa.status === "success") {
                console.log(dataa);
            } else {
                console.log(data.message)
            }
        } catch (error) {
            console.log(error);
        }
        let newSurveys = [];
        for (let tsurvey of surveys) {
            if (tsurvey.surveyId == survey.surveyId) {
                tsurvey["survey-status"] = "LIVE";
                newSurveys.push(tsurvey);
            } else {
                newSurveys.push(tsurvey);
            }
        }
        setSurveys(newSurveys);

    }
    async function deleteSurvey(survey_id) {

        console.log(survey_id);
        let newSurveys = [];
        for (let survey of surveys) {
            if (survey.surveyId == survey_id) {

            } else {
                newSurveys.push(survey);
            }
        }
        let headers = {
            "method": "PUT",
            "headers": {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            }

        }

        try {
            let res = await fetch(process.env.REACT_APP_BASE_URL + `/api/survey/delete/${survey_id}`, headers);
            let dataa = await res.json();
            console.log(dataa);
            if (dataa["survey-deleted"] === "true") {
                setSurveys(newSurveys);
            } else {
                console.log(dataa)
            }
        } catch (error) {
            console.log(error);
        }


    }
    function ModalExampleDeleteConfirm({ id, title, num_of_questions }) {
        const [show, setShow] = useState(false);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        return (
            <>
                <Button variant="success" onClick={handleShow}>
                    Delete
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are You Sure To Delete?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Grid Container>
                            <Grid item xs={12}>
                                <h4> <strong>Survey</strong>:{title}</h4>
                            </Grid>
                            <Grid item xs={12} style={{ marginTop: "10px" }}>
                                <h4> <strong>Questions</strong>:{num_of_questions}(Will be Deleted)</h4>
                            </Grid>

                        </Grid>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => { deleteSurvey(id); handleClose(); }}>
                            Delete
                        </Button>
                        <Button variant="danger" onClick={handleClose}>
                            Cancel
                        </Button>

                    </Modal.Footer>
                </Modal>
            </>
        );
    }





    const allSurveys =
        surveys.map((survey, index) => {


            return (
                <div className="survey">
                    <Grid container alignItems="center" alignContent="center">
                        <Grid item xs={5} >
                            <Grid item xs={12} className="status-col" >
                                <div className="rotate-text">
                                    {survey["survey-status"] == "DRAFT" ?
                                        <Badge variant="primary">{survey["survey-status"]}</Badge> :
                                        survey["survey-status"] == "CLOSED" ? <Badge variant="danger">{survey["survey-status"]}</Badge> : <Badge variant="success">{survey["survey-status"]}</Badge>}

                                </div>
                            </Grid>
                            <Grid item xs={12} className="survey-title">
                                {survey.title}
                            </Grid>
                        </Grid>
                        <Grid item xs={2} className="survey-col-line">
                            <p className="numbers">{survey.questions.length}</p>
                            <p>Questions</p>
                        </Grid>
                        <Grid item xs={2} className="survey-col-line" justify="center">
                            {survey['survey-status'] == 'DRAFT' ? <> <Button variant="dark" style={{ lineHeight: "0px", fontSize: "13px", maxWidth: "120px", maxHeight: "35px", paddingRight: "0px", paddingLeft: "0px", paddingTop: "10px", paddingBottom: "10px", width: "100%", whiteSpace: "normal" }} onClick={() => ChangeStatus(survey, "LIVE")}>Go Live</Button><ModalPreview survey={survey} /></>
                                : <> <p className="numbers">{survey['TOTAL_TAKERS']}</p>
                                    <p>Votes</p></>}

                        </Grid>
                        <Grid item xs={3} className="survey-col-line" style={{ width: "100%" }}>

                            <ButtonGroup size="sm" vertical>
                                {survey["survey-status"] == "DRAFT" ? <Button variant="success" onClick={() => { alert("The Survey needs to be live") }}>Share</Button>
                                    :
                                    <ModalExampleShare style={{ float: "right" }} id={survey.surveyId} title={survey.title} url={"/survey/start" + survey.url} />}
                                {survey["survey-status"] == "CLOSED" || survey["survey-status"] == "LIVE" ? <ModalResults id={survey.surveyId} title={survey.title} votes={survey.TOTAL_TAKERS} questions={survey.questions} /> : <ModalEdit survey={survey} title={survey.title} questions={survey.total_question} />}
                                <ModalExampleDeleteConfirm style={{ float: "right" }} id={survey.surveyId} title={survey.title} num_of_questions={survey.total_question} />
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </div>
            )
        })


    return (
        <>
            <Header />
            <Container>
                <Row style={{ paddingTop: "20px" }}>

                    <div className="jumbotron" style={{
                        width: '100%'
                    }}>
                        <h2 style={{ marginBottom: "10px" }}>Your Surveys:</h2>

                        {allSurveys}
                    </div>

                </Row>
            </Container>
        </>
    )



}

export default Surveys; 