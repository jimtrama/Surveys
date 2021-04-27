import React, { useState } from 'react';
import { Redirect } from 'react-router'
import { Container, Row, Col, Form, Button, ButtonGroup, Card, Alert } from 'react-bootstrap';
import Option from './Option'
import './survey.css'
import Stepper from 'react-stepper-horizontal'
import axios from 'axios'
import { useEffect } from 'react';
import { data } from './../surveys'
import { Grid, IconButton, Typography, FormControlLabel, Switch } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { upadateSelectedSurveyForEdit, userId } from './../actions'
import Header from './Header';
import AddBoxIcon from '@material-ui/icons/AddBox';



function CreateSurveyFromScratch(props) {
    const dispatch = useDispatch();
    const [surveyType, setSurveyType] = useState("ONE");
    const [surveyAccess, setSurveyAccess] = useState("PUBLIC");
    const [action, setAction] = useState(null);
    const [parentId, setParentId] = useState(null);
    const [isInMiddleOfCreation, setIsInMiddleOfCreation] = useState(false);
    const [surveyName, setSurveyName] = useState(null);
    const [numberOfQuestions, setNumberOfQuestions] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [questionTypes, setQuestionTypes] = useState(['SINGLE_OPTION_SELECTION', 'MULTI_OPTION_SELECTION', 'TEXT_FIELD']);
    const [sampleRadioOptionsQuestion, setSampleRadioOptionsQuestion] = useState(null);
    const [sampleCheckboxesQuestion, setSampleCheckboxesQuestion] = useState(null);
    const [sampleTextQuestion, setSampleTextQuestion] = useState("");
    const [selectedQuestionType, setSelectedQuestionType] = useState(null);
    const [step, setStep] = useState(0);
    const [options, setOptions] = useState([{ option: "" }, { option: "" }]);
    const [newQuestionName, setNewQuestionName] = useState('');
    const [alertStatus, setAlertStatus] = useState(false);
    const [saveSurveyFlag, setSaveSurveyFlag] = useState(false);
    const [EditQuestion, setEditQuestion] = useState(false);
    const [indexToEditQuestion, setIndexToEditQuestion] = useState(null);
    const [steps, setSteps] = useState([
        {
            title: 'Create Survey',
            onClick: (e) => {
                e.preventDefault()
                goToStep(0)
            }
        },
        {
            title: 'Add Questions',
            onClick: (e) => {
                e.preventDefault()
                goToStep(1)
            }
        },
        {
            title: 'Preview',
            onClick: (e) => {
                e.preventDefault()
                goToStep(2)
            }
        },
        {
            title: 'Submit & Share',
            onClick: (e) => {
                e.preventDefault()
                console.log('onClick', 4)
            }
        }]);


    let userid = useSelector(state => state.userId);
    function setShow(flag) {
        setAlertStatus(flag)
    }

    function goToStep(nstep) {

        setStep(nstep)

    }

    function getSelectedQuestionType(questiontype) {

        setSelectedQuestionType(questiontype)



    }

    function getSurveyName(e) {


        setSurveyName(e.target.value)

    }

    function getNumberOfQuestions(e) {


        setNumberOfQuestions(e.target.value);

    }

    function createSurvey() {
        const active_step = step;
        if (surveyName === null) {

            setAlertStatus(true);

        } else {

            setStep(step + 1)

        }

    }

    function loadRatioOptionsQuestion() {
        const _sampleRadioOptionsQuestion = sampleRadioOptionsQuestion;
    }



    function deleteOption(index) {
        let _options = [];
        if (options.length > 2) {
            for (let i = 0; i < options.length; i++) {
                if (index == i) {

                } else {

                    _options.push(options[i]);
                }
            }

            setOptions(_options);
        }
    }

    function storeOption(e, index) {
        let _options = options;
        const newoption = `${e.target.value}`;
        for (let i = 0; i < _options.length; i++) {
            if (i == index) {
                _options[i].option = newoption;
            }

        }

        setOptions(_options)

    }

    function storeNewQuestionName(e) {

        setNewQuestionName(e.target.value)

    }

    function addNewQuestion(qType) {

        if (qType == "TEXTBOX_OPTION") {
            if (newQuestionName == '') {
                setAlertStatus(true);
                return;
            }
        } else {
            if (newQuestionName == '') {
                setAlertStatus(true);
                return;
            }
            for (const option of options) {
                if (option.option == "") {
                    setAlertStatus(true);
                    return;
                }
            }
        }

        const _options = options;


        const _newQuestion = ({
            "question-type": qType,
            question: newQuestionName,
            options: _options
        })

        const resetOptions = [{ option: "" }, { option: "" }];
        setQuestions(questions.concat(_newQuestion));
        setOptions(resetOptions);
        setNewQuestionName("");
        setSelectedQuestionType(null);

    }

    function nextStep(stepNum) {
        if (questions.length > 0) {
            setStep(stepNum)
        }

    }
    let loadExistingSurvey = useSelector(state => state.selectedEditSurvey);
    useEffect(() => {

        const params = new URLSearchParams(props.location.search);
        const surveyId = params.get('survey_id');
        const action = params.get('action');
        console.log('SurveyID', params.get('survey_id'));
        console.log('ACTION', params.get('action'));
        if (loadExistingSurvey) {
            setSurveyName(loadExistingSurvey.title);
            setQuestions(loadExistingSurvey.questions);
            setStep(1);
            return;

        }
        if (surveyId !== null && action !== null) {
            let headers = {
                "method": "GET",
                "headers": {
                    'Content-Type': 'application/json',
                    "Accept": "application/json"
                }

            }


            fetch(process.env.REACT_APP_BASE_URL + `/api/survey/get/${surveyId}`, headers).then(res => res.json()).then(data => {
                if (data.status === "success") {
                    console.log(data.data);
                    setSurveyAccess(data.data["is-open-survey"]);
                    setSurveyType(data.data.question_display_style);
                    for (let question of data.data.questions) {
                        delete question["question-id"];
                        delete question.surveyId;
                        for (let option of question.options) {
                            delete option["option-id"];
                            delete option.questionId;
                        }

                    }

                    setQuestions(data.data.questions);
                    console.log(data.data.questions);
                    setSurveyName(data.data.title);
                    setAction(action);
                    setParentId(surveyId);

                } else {
                    console.log(data.message)
                }
            }).catch(e => {
                console.log(e);
            })





        }

    }, []);

    async function saveSurvey() {


        if (loadExistingSurvey) {
            console.log(questions);
            for (let question of questions) {
                delete question["question-id"];
                delete question.surveyId;
                for (let option of question.options) {
                    delete option["option-id"];
                    delete option.questionId;
                }

            }
            let dataBody = {
                "question_display_style": surveyType,
                "questions": questions,
                "survey-status": "DRAFT",
                "title": surveyName,
                "total_question": questions.length,
                "is-open-survey": surveyAccess,
                "surveyId": loadExistingSurvey.surveyId,
                "userId": userid



            }
            let headers = {
                "method": "POST",
                "headers": {
                    'Content-Type': 'application/json',
                    "Accept": "application/json"
                },
                "body": JSON.stringify(dataBody)

            }

            try {
                let res = await fetch(process.env.REACT_APP_BASE_URL + `/api/survey/save?edit-flag=true`, headers);
                let dataa = await res.json();
                console.log(dataa);
                if (dataa.status === "success") {
                    dispatch(upadateSelectedSurveyForEdit(null));
                    props.history.push("/surveys");
                } else {
                    console.log(dataa)
                }
            } catch (error) {
                console.log(error);
            }
            dispatch(upadateSelectedSurveyForEdit(null));
            props.history.push("/surveys");

        } else if (action != null) {


            for (let question of questions) {
                delete question["question-id"];
                delete question.surveyId;
                for (let option of question.options) {
                    delete option["option-id"];
                    delete option.questionId;
                }

            }
            let dataBody = {
                "question_display_style": surveyType,
                "questions": questions,
                "survey-status": "DRAFT",
                "title": surveyName,
                "total_question": questions.length,
                "is-open-survey": surveyAccess,
                "userId": userid


            }
            let headers = {
                "method": "POST",
                "headers": {
                    'Content-Type': 'application/json',
                    "Accept": "application/json"
                },
                "body": JSON.stringify(dataBody)

            }

            try {
                let res = await fetch(process.env.REACT_APP_BASE_URL + `/api/survey/save?clone-flag=true&parent-survey=${parentId}`, headers);
                let dataa = await res.json();
                console.log(dataa.status);
                if (dataa.status === "save-success") {
                    props.history.push("/surveys");
                } else {
                    console.log(dataa)
                }
            } catch (error) {
                console.log(error);
            }

        }
        else {
            let dataBody = {
                "question_display_style": surveyType,
                "questions": questions,
                "survey-status": "DRAFT",
                "title": surveyName,
                "total_question": questions.length,
                "is-open-survey": surveyAccess,
                "userId": userid


            }
            let headers = {
                "method": "POST",
                "headers": {
                    'Content-Type': 'application/json',
                    "Accept": "application/json"
                },
                "body": JSON.stringify(dataBody)

            }

            try {
                let res = await fetch(process.env.REACT_APP_BASE_URL + `/api/survey/save`, headers);
                let dataa = await res.json();
                console.log(dataa.status);
                if (dataa.status === "save-success") {
                    props.history.push("/surveys");
                } else {
                    console.log(dataa)
                }
            } catch (error) {
                console.log(error);
            }

        }




    }
    function StoreEditQuestion() {
        const resetOptions = [{ option: "" }, { option: "" }];
        questions[indexToEditQuestion].question = newQuestionName;
        questions[indexToEditQuestion].options = options;
        setEditQuestion(false);
        setOptions(resetOptions);
        setNewQuestionName("");
        setSelectedQuestionType(null);

    }
    function editQuestion(index, question) {
        _newQuestion = question;
        console.log(question);
        setEditQuestion(true);
        setNewQuestionName(question.question);
        setOptions(question.options)
        setSelectedQuestionType(question["question-type"]);
        setIndexToEditQuestion(index);

    }
    function deleteQuestion(index) {
        let _questions = [];
        for (let i = 0; i < questions.length; i++) {
            if (i == index) {

            } else {
                _questions.push(questions[i]);
            }
        }
        setQuestions(_questions);
    }



    const handleChange = (event) => {

        if (event.target.name == "Type") {
            if (event.target.checked) {
                setSurveyType("ALL");
            } else {
                setSurveyType("ONE");
            }

        }
        if (event.target.name == "Private") {
            if (event.target.checked) {
                setSurveyAccess("PRIVATE");
            } else {
                setSurveyAccess("PUBLIC");
            }

        }


    }


    let createSurveyResult = null;
    let previewResult = 'Not yet initialized!';

    let surveyDisplayHeader = null;

    let _newQuestion = null;
    let _allQuestionsPreview=null;

    let _allQuestions = null;

    let customButton = null;
    let alert = null;
    let _options = options


    let actionTxt;

    if (action === 'clone') {
        actionTxt = (<Alert variant="danger">
            <Alert.Heading>You are cloning the survey!!</Alert.Heading>
        </Alert>);

    }

    if (saveSurveyFlag) {
        createSurveyResult = (
            <Redirect to="/surveys" />
        )
    }

    if (step === 0) {
        if (alertStatus) {
            alert = (<Alert variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Error Occured</Alert.Heading>
                <p>
                    The Survey Name shouldn't be blank. Please enter valid survey name and try again.
                </p>
            </Alert>);
        }


        surveyDisplayHeader = 'Create New Survey'
        createSurveyResult = (
            <div style={{ width: "100%" }}>
                {alert}
                <Form>
                    <Form.Group controlId="surveyTitle">

                        <Form.Control type="text" onChange={e => getSurveyName(e)} placeholder="Enter Survey Name" style={{ marginTop: "10px" }} value={surveyName} />
                    </Form.Group>


                    <Form.Group style={{ width: "100%" }} controlId="allQuestionInSamePage">
                        <Grid container >
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={surveyType !== "ONE"}
                                        onChange={handleChange}
                                        name="Type"
                                        color="primary"
                                    />
                                }
                                label="All Questions In one Page"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={surveyAccess === "PRIVATE"}
                                        onChange={handleChange}
                                        name="Private"
                                        color="primary"
                                    />
                                }
                                label="Private Survey"
                            />
                        </Grid>
                    </Form.Group>
                    <Button variant="dark" type="submit" onClick={createSurvey}>
                        Proceed to create questions
                        </Button>
                </Form>
            </div>
        )
    }
    _allQuestionsPreview = questions.map((question, index) => {

        let _optionName = index + '_option'

        let qType = null;

        if (question["question-type"] === 'RADIO_OPTION') {
            qType = 'radio'
        }

        if (question["question-type"] === 'CHECKBOX_OPTION') {
            qType = 'checkbox'
        }
        if (question["question-type"] === 'TEXTBOX_OPTION') {
            qType = 'textbox'
        }

        const _options = question.options.map((option, ind) => {
            if (qType === 'checkbox') {
                _optionName = _optionName + '_' + ind;
            }

            return (

                <Row>
                    <Col xs={1}>
                        <Form.Check
                            type={qType}
                            label={option.option}
                            name={_optionName}
                            id={index}
                        />

                    </Col>

                </Row>


            )


        })
        if (qType == "textbox") {

            return (
                <div className="question" style={{ width: "100%" }}>
                    <Row>
                        <Col xs={1}>
                            Q{index + 1}
                        </Col>
                        <Col>
                            {question.question}
                        </Col>

                        
                        
                    </Row>



                </div>
            )
        } else {


            return (
                <div className="question" style={{ width: "100%" }}>
                    <Row>
                        <Col xs={1}>
                            Q{index + 1}
                        </Col>
                        <Col>
                            {question.question}
                        </Col>

                        
                        
                    </Row>
                    {_options}


                </div>
            )
        }
    })
    _allQuestions = questions.map((question, index) => {

        let _optionName = index + '_option'

        let qType = null;

        if (question["question-type"] === 'RADIO_OPTION') {
            qType = 'radio'
        }

        if (question["question-type"] === 'CHECKBOX_OPTION') {
            qType = 'checkbox'
        }
        if (question["question-type"] === 'TEXTBOX_OPTION') {
            qType = 'textbox'
        }

        const _options = question.options.map((option, ind) => {
            if (qType === 'checkbox') {
                _optionName = _optionName + '_' + ind;
            }

            return (

                <Row>
                    <Col xs={1}>
                        <Form.Check
                            style={{width:"100%"}}
                            type={qType}
                            label={option.option}
                            name={_optionName}
                            id={index}
                        />

                    </Col>

                </Row>


            )


        })
        if (qType == "textbox") {

            return (
                <div className="question" style={{ width: "100%" }}>
                    <Row>
                        <Col xs={1}>
                            Q{index + 1}
                        </Col>
                        <Col>
                            {question.question}
                        </Col>

                        <IconButton variant="danger" style={{ float: "right", alignText: "center", marginRight: "8px" }} onClick={() => { deleteQuestion(index) }}><DeleteIcon /></IconButton>
                        <IconButton variant="danger" style={{ float: "right", alignText: "center", marginRight: "8px" }} onClick={() => { editQuestion(index, question) }}><EditIcon /></IconButton>
                    </Row>



                </div>
            )
        } else {


            return (
                <div className="question" style={{ width: "100%" }}>
                    <Row>
                        <Col xs={1}>
                            Q{index + 1}
                        </Col>
                        <Col>
                            {question.question}
                        </Col>

                        <IconButton variant="danger" style={{ float: "right", alignText: "center", marginRight: "8px" }} onClick={() => { deleteQuestion(index) }}><DeleteIcon /></IconButton>
                        <IconButton variant="danger" style={{ float: "right", alignText: "center", marginRight: "8px" }} onClick={() => { editQuestion(index, question) }}><EditIcon /></IconButton>
                    </Row>
                    {_options}


                </div>
            )
        }
    })

    if (selectedQuestionType === 'RADIO_OPTION') {


        if (alertStatus) {
            alert = (<Alert variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Error Occured</Alert.Heading>
                <p>
                    All Fieds Should Not Be Empty!
                </p>
            </Alert>);
        }
        _options = options.map((opt, index) => {

            return (


                <Grid container alignItems="center" alignContent="center" style={{ margin: "5px" }}>
                    <Grid item xs={1} style={{ fontSize: "20px" }}>
                        <i className="fad fa-circle"></i>
                    </Grid>
                    <Grid item xs={8}>
                        <Form.Control onChange={(e) => storeOption(e, index)} type="text" defaultValue={opt.option} />
                    </Grid>
                    <Grid item xs={2} style={{ textAlign: "center" }}>
                        <span onClick={() => setOptions([...options, { option: "" }])}><i style={{ color: "green", fontSize: "25px", marginRight: "3px",cursor:"pointer" }} className="fa fa-plus-circle"></i></span>
                        <span onClick={() => deleteOption(index)}><i style={{ color: "red", fontSize: "25px",cursor:"pointer" }} className="fa fa-minus-circle"></i></span>
                    </Grid>

                </Grid>

            )
        })


        _newQuestion = (
            <div className="question">
                {alert}
                <Form>

                    <Row>
                        <Col xs={1}>
                            Q{questions.length + 1}
                        </Col>
                        <Col>
                            <Form.Control onChange={(e) => storeNewQuestionName(e)} type="text" placeholder="Enter Question" value={newQuestionName} />
                        </Col>
                    </Row>

                    Options:

                    {_options}

                    {EditQuestion ? <Button variant="primary" onClick={StoreEditQuestion}>Edit Question</Button> : <Button variant="success" onClick={() => addNewQuestion(selectedQuestionType)}>Add Question</Button>}

                </Form>
            </div>
        )
    }

    if (selectedQuestionType === 'CHECKBOX_OPTION') {

        if (alertStatus) {
            alert = (<Alert variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Error Occured</Alert.Heading>
                <p>
                    All Fieds Should Not Be Empty!
                </p>
            </Alert>);
        }

        _options = options.map((opt, index) => {

            return (

                <Grid container alignContent="center" alignItems="center" style={{ margin: "5px" }}>

                    <Grid item xs={1} style={{ fontSize: "20px" }}>
                        <i className="fad fa-square"></i>

                    </Grid>
                    <Grid item xs={8}>
                        <Form.Control style={{ width: "100%" }} onChange={(e) => storeOption(e, index)} type="text" defaultValue={opt.option} />
                    </Grid>
                    <Grid xs={2} style={{ textAlign: "center" }}>
                        <span onClick={() => setOptions([...options, { option: "" }])}><i style={{ color: "green", fontSize: "25px", marginRight: "3px",cursor:"pointer" }} className="fa fa-plus-circle"></i></span>
                        <span onClick={() => deleteOption(index)}><i style={{ color: "red", fontSize: "25px",cursor:"pointer" }} className="fa fa-minus-circle"></i></span>
                    </Grid>
                </Grid>
            )
        })


        _newQuestion = (
            <div className="question">
                {alert}
                <Form>

                    <Grid container>
                        <Grid item xs={2}>
                            Q{questions.length + 1}
                        </Grid>
                        <Grid item xs={10}>
                            <Form.Control onChange={(e) => storeNewQuestionName(e)} type="text" placeholder="Enter Question" value={newQuestionName} />
                        </Grid>
                    </Grid>

                    Options:

                    {_options}

                    {EditQuestion ? <Button variant="primary" onClick={StoreEditQuestion}>Edit Question</Button> : <Button variant="success" onClick={() => addNewQuestion(selectedQuestionType)}>Add Question</Button>}
                </Form>
            </div>
        )
    }
    if (selectedQuestionType === 'TEXTBOX_OPTION') {


        if (alertStatus) {
            alert = (<Alert variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Error Occured</Alert.Heading>
                <p>
                    All Fieds Should Not Be Empty!
                </p>
            </Alert>);
        }



        _newQuestion = (
            <div className="question">
                {alert}
                <Form>

                    <Grid container>
                        <Grid item xs={2}>
                            Q{questions.length + 1}
                        </Grid>
                        <Grid item xs={10}>
                            <Form.Control onChange={(e) => { setNewQuestionName(e.target.value); setOptions([{ option: "" }]) }} type="text" placeholder="Enter Question" value={newQuestionName} />
                        </Grid>
                    </Grid>



                    {EditQuestion ? <Button variant="primary" onClick={StoreEditQuestion}>Edit Question</Button> : <Button variant="success" onClick={() => addNewQuestion(selectedQuestionType)}>Add Question</Button>}
                </Form>
            </div>
        )
    }

    if (step === 1) {

        surveyDisplayHeader = 'Add Questions for "' + surveyName + '"';

        customButton = (

            (questions.length > 0) ?
                <Button onClick={() => nextStep(2)} size="sm" variant="primary" style={{
                    marginTop: '1%',marginBottom:"10px",maxHeight:"60px"
                }}>Preview</Button>
                : ''

        )

        const ColoredLine = ({ color }) => (
            <hr
                style={{
                    color: color,
                    backgroundColor: color,
                    height: 3
                }}
            />
        );

        createSurveyResult = (
            <div>
                <ColoredLine color="green" />

                <div style={{
                    marginBottom: '1%'
                }}>
                    {_allQuestions}
                </div>

                      Select Question Type: {'  '}
                <ButtonGroup aria-label="Question Types">
                    <Button size="sm" className="button-border" variant="secondary" onClick={() => getSelectedQuestionType('RADIO_OPTION')}>Radio Buttons</Button>
                    <Button size="sm" className="button-border" variant="secondary" onClick={() => getSelectedQuestionType('CHECKBOX_OPTION')}>Checkbox</Button>
                    <Button size="sm" variant="secondary" onClick={() => getSelectedQuestionType('TEXTBOX_OPTION')}>Text Input</Button>
                </ButtonGroup>

                {_newQuestion}


            </div>
        )
    }

    if (step === 2) {
        surveyDisplayHeader=(<h2>{surveyName}</h2>);
        customButton = (

            (questions.length > 0) ? <div style={{ display: "flex" }}>
                <Button style={{ marginRight: "3px" }} onClick={() => nextStep(1)} size="sm" variant="primary">Go Back</Button>
                <Button onClick={() => nextStep(3)} size="sm" variant="primary">Proceed to Save</Button>
            </div>
                : ''

        )
        createSurveyResult = (
            <div>
                
                <div style={{marginBottom: '1%',minWidth:"200px"}}>
                    {_allQuestionsPreview}
                </div>



            </div>
        )
    }

    if (step === 3) {
        surveyDisplayHeader=(<h2>{surveyName}</h2>);
        customButton = (

            (questions.length > 0) ?
                <div style={{ display: "flex" }}>
                    <Button style={{ marginRight: "3px" }} onClick={() => nextStep(2)} size="sm" variant="primary">Go Back</Button>
                    <Button size="sm" variant="primary" onClick={saveSurvey} >Submit</Button>
                </div>
                : ''

        )

        createSurveyResult = (
            <div>
                

                <h4>Total Questions: {questions.length}</h4>

            </div>
        )
    }

    return (
        <>
            <Header />
            <Container style={{
                paddingTop: '1%'
            }}>
                <Row>
                    <Col></Col>
                    <Col>{actionTxt}</Col>
                    <Col></Col>

                </Row>
                <Row>
                    <Stepper style={{ cursor: "pointer" }} steps={steps} activeStep={step} />
                </Row>


                <div className="jumbotron" style={{
                    width: '100%'
                }}>
                    <Grid container alignItems="center" alignContent="center">


                        <Grid item xs={12} style={{display:"flex"}}>
                            <h2 style={{marginRight:"15%"}}>{surveyDisplayHeader}</h2>
                            {customButton}
                        </Grid>
                        
                        <Grid item xs={12}>

                        {createSurveyResult}
                        </Grid>
                    </Grid>
                </div>

            </Container>
        </>
    )


}

export default CreateSurveyFromScratch;