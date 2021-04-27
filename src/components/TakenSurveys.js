import React, { useState } from 'react'
import Header from './Header';
import { Container, Row } from 'react-bootstrap';
import { Grid, ButtonGroup } from '@material-ui/core';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import {surveys} from './../SampleResponses'

function TakenSurveys() {
    function ModalAnswers({ survey }) {
        const [show, setShow] = useState(false);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        return (
            <>
                <Button variant="success" onClick={handleShow}>
                    Your Answers
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are You Sure To Delete?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Grid Container>
                            <Grid item xs={12}>
                                <h4> <strong>Survey</strong>:{survey.title}</h4>
                            </Grid>
                            <Grid item xs={12} style={{ marginTop: "10px" }}>
                                <h4> <strong>Questions</strong>:{survey.num_of_questions}(Will be Deleted)</h4>
                            </Grid>

                        </Grid>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => { handleClose(); }}>
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
        surveys.data["taken-surveys"].map((survey, index) => {


            return (
                <div className="survey">
                    <Grid container alignItems="center" alignContent="center">
                        <Grid item xs={5} >
                            <Grid item xs={12} className="status-col" >

                            </Grid>
                            <Grid item xs={12} className="survey-title" style={{marginLeft:"10px"}}>
                                {survey.title}
                            </Grid>
                        </Grid>
                        <Grid item xs={2} className="survey-col-line">
                            <p className="numbers">{survey.questions.length}</p>
                            <p>Questions</p>
                        </Grid>
                        <Grid item xs={2} className="survey-col-line" justify="center">
                            {<>
                                <p className="numbers">{survey['TOTAL_TAKERS']}</p>
                                <p>Votes</p></>}

                        </Grid>
                        <Grid item xs={3} className="survey-col-line" style={{ width: "100%" }}>

                            <ButtonGroup size="sm" vertical>
                                <ModalAnswers survey={survey} />
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
                        <h2 style={{ marginBottom: "10px" }}>Taken Surveys:</h2>

                        {allSurveys}
                    </div>

                </Row>
            </Container>
        </>
    )
}

export default TakenSurveys;
