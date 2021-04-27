import React from "react";
import Header from "./Header";
import SurveyStepper from "./SurveyStepper";
import { Grid } from "@material-ui/core";
import { setDataForStepper } from './../actions';
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import './survey.css'
import { withRouter } from "react-router";
import Badge from 'react-bootstrap/Badge'
import { Spinner } from "react-bootstrap";
import { CheckAuth } from "../Auth";
import Footer from "../Footer/SmallFooter";


function Home(props) {
    const dispatch = useDispatch();
    const [surveysToShow, setSurveysToShow] = useState([]);
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(true);
    let surveyToShowSatus = useSelector(state => state.selectedSurveyStepper);
    let userid = useSelector(state => state.userId);
    let data = useSelector(state => state.dataForStepper);
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
                console.log(dataa);
                if (dataa.status === "success") {
                    data = dataa.data;
                    console.log(data);
                    dispatch(setDataForStepper(data));
                    setSurveysToShow(data);
                } else {
                    console.log(dataa.message)
                }
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }

        init();
    }
        , []);

    useEffect(() => {
        let s = [];
        for (const survey of data) {
            if (surveyToShowSatus == "total") {
                s.push(survey);
            } else {
                if (survey["survey-status"] == surveyToShowSatus) {
                    s.push(survey);
                }
            }

        }
        setSurveysToShow(s);
    }, [surveyToShowSatus])

    function Survey({ survey }) {
        return (
            <div style={{
                width: '100%',
                padding: "5px"
            }}>
                <div className="survey">
                    <Grid container alignItems="center" alignContent="center">
                        <Grid item xs={8} >
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
                        <Grid item xs={2} className="survey-col-line">
                            <p className="numbers">{survey['TOTAL_TAKERS']}</p>
                            <p>Votes</p>
                        </Grid>

                    </Grid>
                </div>
            </div>
        );
    }
    return (
        <>
            <Header  history={props.history} />
            <SurveyStepper data={data} />
            <Grid container alignContent="center" alignItems="center" justify="center">
                {loading ? <Spinner style={{ alignSelf: "center", float: "center" }} animation="border" /> : surveysToShow.length != 0 ? surveysToShow.map((survey) => {

                    return <Survey survey={survey} />
                }) : <h1>No Surveys</h1>}

            </Grid>
            <Footer/>
        </>
    )

}

export default withRouter(Home);