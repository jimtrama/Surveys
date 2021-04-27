import React, { useEffect } from 'react'
import axios from 'axios'
import { Jumbotron, Button, Container, Row, Col } from 'react-bootstrap'
import './survey.css'
import { useState } from 'react';
import { LinearProgress, Card, Grid, Typography, RadioGroup, FormControlLabel, Radio, TextField, FormControl, FormGroup, Checkbox } from '@material-ui/core';
import { useSelector } from 'react-redux';

function SurveyInProgress(props) {

    const [survey, setSurvey] = useState(null);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [activeStep, setActiveStep] = useState(0);
    const [completedQuestions, setCompletedQuestions] = useState(1);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answerToQuestion, setAnswerToQuestion] = useState({ "question-id": -1, "selected-option-ids": ["-1"] });

    const [questions, setQuestions] = useState([]);

    var userId = useSelector(state => state.userId);

    useEffect(async () => {

        const nameparam = props.match.params.name;
        const surnameparam = props.match.params.surname;
        const surveyId = props.match.params.surveyId;

        let headers = {
            "method": "GET",
            "headers": {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            }

        }

        let res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/survey/get/${surveyId}`, headers);
        let data = await res.json();

        console.log(data);

        setSurvey(data.data);
        console.log(survey);
        setTotalQuestions(data.data.questions.length);

    }, []);

    const startSurvey = () => {
        setActiveStep(1);
    }

    const nextQuestion = () => {



        setCurrentQuestion(currentQuestion + 1);
        setCompletedQuestions(completedQuestions + 1);
        setQuestions([...questions, answerToQuestion]);
        setAnswerToQuestion({
            "question-id": -1,
            "selected-option-ids": []
        });
        if(currentQuestion==totalQuestions-1){
            setActiveStep(activeStep+1);
        }

        console.log(questions);
    }


    const getQuestionsOne = () => {
        let questionDisplayData = null;

        survey.questions.map((question, i) => {

            const handleChangeRadio = (event) => {
                setAnswerToQuestion({
                    "question-id": question["question-id"],
                    "selected-option-ids": [parseInt(event.target.value)]
                });

            };
            const handelCheckboxChange = (event) => {
                if (event.target.checked) {

                    setAnswerToQuestion({
                        "question-id": question["question-id"],
                        "selected-option-ids": [...answerToQuestion["selected-option-ids"], parseInt(event.target.value)]
                    });

                } else {
                    answerToQuestion["selected-option-ids"].splice(answerToQuestion["selected-option-ids"].indexOf(parseInt(event.target.value)), 1)
                    setAnswerToQuestion({
                        "question-id": question["question-id"],
                        "selected-option-ids": answerToQuestion["selected-option-ids"]
                    });
                }


            };
            const handelTextboxChange = (event) => {
                setAnswerToQuestion({
                    "question-id": question["question-id"],
                    "userInput": event.target.value
                });


            };
            const _questionNumber = i;

            if (currentQuestion === _questionNumber) {



                var optionsData;
                if (question["question-type"] == "RADIO_OPTION") {
                    optionsData = (
                        <Grid item xs={4}>
                            <div className="radio option-spacing" key={i} >
                                <FormControl component="fieldset" >
                                    <RadioGroup aria-label="gender" name="gender1" value={answerToQuestion["selected-option-ids"][0].toString()} onChange={handleChangeRadio} >
                                        {question.options.map((opt) => { return <FormControlLabel value={opt["option-id"].toString()} control={<Radio />} label={opt.option} /> })}
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </Grid>);

                }
                if (question["question-type"] == "TEXTBOX_OPTION") {
                    optionsData = (
                        <Grid item xs={8}>
                            <div style={{ padding: "30px", width: "100%" }} >
                                <TextField autoFocus="true" variant="outlined" placeholder="Enter Your Answer" value={answerToQuestion.userInput} onChange={handelTextboxChange} />
                            </div>
                        </Grid>
                    )
                }
                if (question["question-type"] == "CHECKBOX_OPTION") {
                    optionsData = (
                        <Grid item xs={8}>
                            <div style={{ padding: "30px", width: "100%" }}>
                                <FormGroup aria-label="position" row>
                                    {question.options.map((v) => {
                                        return <FormControlLabel
                                            control={<Checkbox checked={-1 !== answerToQuestion["selected-option-ids"].indexOf(v["option-id"])} value={v["option-id"].toString()} onChange={handelCheckboxChange} color="primary" />}
                                            label={v.option}
                                            labelPlacement="start"
                                        />
                                    })}


                                </FormGroup>
                            </div>
                        </Grid>
                    )
                }



                questionDisplayData = (
                    <>
                        <div style={{ display: "flex" }}>
                            <h4>Q{i + 1}: </h4> <h4 style={{ color: "green" }}>{question.question}</h4>
                        </div>
                        <div style={{ display: "flex" }}>
                            <Grid container>
                                {optionsData}
                            </Grid>
                        </div>
                    </>
                )
            }
        })

        return questionDisplayData;
    }
    
    async function submitAnswer() {
        console.log(questions);
        let open ="PUBLIC"===survey["is-open-survey"];
        let body = {
            "surveyid": parseInt(survey.surveyId),
            "userId": parseInt(userId),
            "questions":questions,
            "openSurvey": open,


        }
        let headers = {
            "method": "PUT",
            "headers": {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            },
            "body": JSON.stringify(body)

        }

        let res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/survey/progress-update`, headers);
        let data = await res.json();

        console.log(data);

    }

    function NextButton() {

        
            return (
                <button className="btn btn-success" onClick={nextQuestion}>Next</button>
            );
        

    }

    function FinishButton() {

        
            return (
                <button className="btn btn-success" onClick={submitAnswer}>Finish</button>
            );
        

    }





    function StepOne() {
        if (survey) {
            return (
                <Jumbotron>
                    <h1>{survey.title}</h1>
                    <p>
                        This has <strong>{totalQuestions}</strong> questions.
                    </p>
                    <p>
                        Please click below button to start the survey.
                    </p>
                    <p>
                        <Button onClick={startSurvey} variant="primary">Start Survey</Button>
                    </p>
                </Jumbotron>
            )
        } else {
            return (
                <h1>Loding</h1>)
        }
    }

    function Progress() {
        return (<p style={{ padding: "20px" }}>
            Status:(Q{currentQuestion + 1}/{totalQuestions})
            <LinearProgress variant="determinate" value={(completedQuestions / totalQuestions) * 100} />

        </p>)
    }

    function StepTwo() {

        const questionData = getQuestionsOne();
        if (survey) {

            return (
                <Jumbotron>
                    <h1>{survey.title}</h1>
                    <Progress />

                    <Card >
                        {questionData}
                    </Card>
                </Jumbotron>

            )
        } else {
            return (
                <h1>Loding</h1>)
        }

    }
    function StepThree() {

        
        if (survey) {

            return (
                <Jumbotron>
                    <h1>{survey.title}</h1>
                    <FinishButton/>
                </Jumbotron>

            )
        } else {
            return (
                <h1>Loding</h1>)
        }

    }

    return (
        <Container style={{
            paddingTop: '2%'
        }}>
            <Row>
                <Col></Col>
                <Col lg={12}>
                    <div>
                        {activeStep === 0 && <StepOne />}
                        {activeStep === 1 && <StepTwo />}
                        {survey && activeStep === 1 && <NextButton />}
                        {survey && activeStep === 2 && <StepThree/>}
                    </div>
                </Col>
                <Col></Col>

            </Row>

        </Container>
    )


}

export default SurveyInProgress;