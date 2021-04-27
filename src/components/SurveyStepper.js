import React from 'react'
import { Card, CardContent, Typography, Grid, makeStyles, CardActions } from '@material-ui/core'
import { useEffect } from 'react';
import { useState } from 'react';

import './SurveyStepperStyle.css'
import { useDispatch, useSelector } from 'react-redux';
import { upadateSelectedSurveyForStepper } from './../actions'


const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 18,
        justify:"center",
        alignItems:"center",
        alignContent:"center",
        textAlign:"center",
        fontWeight:"bold"

    },
    pos: {
        marginBottom: 12,
    },
    number: {
        fontSize: 25,
        justify:"center",
        alignItems:"center",
        alignContent:"center",
        textAlign:"center"
    },
    card:{
        justify:"center",
        alignItems:"center",
        alignContent:"center",
        textAlign:"center"
    }
});

function SurveyStepper({ data }) {
    const dispatch = useDispatch();
    let userid = useSelector(state => state.userId);

    let selectionColor = "#BBB303";
    const classes = useStyles();
    const [num_of_Total_Surveys, setNum_of_Total_Surveys] = useState(0);
    const [num_of_Live_Surveys, setNum_of_Live_Surveys] = useState(0);
    const [num_of_Draft_Surveys, setNum_of_Draft_Surveys] = useState(0);
    const [num_of_Closed_Surveys, setNum_of_Closed_Surveys] = useState(0);
    const [selectedSurvey, setSelectedSurvey] = useState("total");

    useEffect(() => {
        console.log(data);
        setNum_of_Total_Surveys(data.length)
        let draft = 0;
        let live = 0;
        let closed = 0;
        for (const survey of data) {
            if (survey["survey-status"] == "DRAFT") {
                draft++;
            }
            if (survey["survey-status"] == "CLOSED") {
                closed++;
            }
            if (survey["survey-status"] == "LIVE") {
                live++;
            }
        }
        setNum_of_Draft_Surveys(draft);
        setNum_of_Closed_Surveys(closed);
        setNum_of_Live_Surveys(live);

    }, [data]);
    return (
        <div>
            <Grid container style={{ display: "flex" }} >
                <Grid item xs={12} >
                    <Card style={{ margin: "10px" }}>
                        <CardContent>
                            <Grid container>
                                <Grid item xs={3} style={{ padding: "4px" }} >
                                    {selectedSurvey == "total" ? <Card style={{ backgroundColor: selectionColor }} className={"card"} onClick={() => { setSelectedSurvey("total"); dispatch(upadateSelectedSurveyForStepper("total")) }} >
                                        <CardContent className={classes.cards} >
                                            <Typography className={classes.number}>
                                                {num_of_Total_Surveys}
                                            </Typography>
                                            <Typography className={classes.title}>
                                                TOTAL
                                            </Typography>

                                        </CardContent>

                                    </Card> : <Card className={"card"} onClick={() => { setSelectedSurvey("total"); dispatch(upadateSelectedSurveyForStepper("total")) }} >
                                            <CardContent className={classes.cards}>
                                                <Typography className={classes.number}>
                                                    {num_of_Total_Surveys}
                                                </Typography>
                                                <Typography className={classes.title}>
                                                    TOTAL
                                            </Typography>

                                            </CardContent>

                                        </Card>}

                                </Grid>
                                <Grid item xs={3} style={{ padding: "4px" }}>
                                    {selectedSurvey == "live" ? <Card style={{ backgroundColor: selectionColor }} className={"card"} onClick={() => { setSelectedSurvey("live"); dispatch(upadateSelectedSurveyForStepper("LIVE")) }} >
                                        <CardContent className={classes.cards}>
                                            <Typography className={classes.number}>
                                                {num_of_Live_Surveys}
                                            </Typography>
                                            <Typography className={classes.title}>
                                                LIVE
                                            </Typography>

                                        </CardContent>

                                    </Card> : <Card className={"card "} onClick={() => { setSelectedSurvey("live"); dispatch(upadateSelectedSurveyForStepper("LIVE")) }} >
                                            <CardContent className={classes.cards}>
                                                <Typography className={classes.number}>
                                                    {num_of_Live_Surveys}
                                                </Typography>
                                                <Typography className={classes.title}>
                                                    LIVE
                                            </Typography>

                                            </CardContent>

                                        </Card>}

                                </Grid>
                                <Grid item xs={3} style={{ padding: "4px" }}>
                                    {selectedSurvey == "draft" ? <Card style={{ backgroundColor: selectionColor }} className={"card "} onClick={() => { setSelectedSurvey("draft"); dispatch(upadateSelectedSurveyForStepper("DRAFT")) }} >
                                        <CardContent className={classes.cards}>
                                            <Typography className={classes.number}>
                                                {num_of_Draft_Surveys}
                                            </Typography>
                                            <Typography className={classes.title}>
                                                DRAFT
                                            </Typography>

                                        </CardContent>

                                    </Card> : <Card className={"card "} onClick={() => { setSelectedSurvey("draft"); dispatch(upadateSelectedSurveyForStepper("DRAFT")) }} >
                                            <CardContent className={classes.cards}>
                                                <Typography className={classes.number}>
                                                    {num_of_Draft_Surveys}
                                                </Typography>
                                                <Typography className={classes.title}>
                                                    DRAFT
                                            </Typography>

                                            </CardContent>

                                        </Card>}

                                </Grid>
                                <Grid item xs={3} style={{ padding: "4px" }}>
                                    {selectedSurvey == "closed" ? <Card style={{ backgroundColor: selectionColor }} className={"card "} onClick={() => { setSelectedSurvey("closed"); dispatch(upadateSelectedSurveyForStepper("CLOSED")) }} >
                                        <CardContent className={classes.cards}>
                                            <Typography className={classes.number}>
                                                {num_of_Closed_Surveys}
                                            </Typography>
                                            <Typography className={classes.title}>
                                                CLOSED
                                            </Typography>

                                        </CardContent>

                                    </Card> : <Card className={"card "} onClick={() => { setSelectedSurvey("closed"); dispatch(upadateSelectedSurveyForStepper("CLOSED")) }} >
                                            <CardContent className={classes.cards}>
                                                <Typography className={classes.number}>
                                                    {num_of_Closed_Surveys}
                                                </Typography>
                                                <Typography className={classes.title}>
                                                    CLOSED
                                            </Typography>

                                            </CardContent>

                                        </Card>}

                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default SurveyStepper
