import React from "react";
import WelcomeHeader from "../components/WelcomePageHeader";
import bgimg from './../images/landingbackground.png'
import { Card, Button, CardActionArea, CardMedia } from "@material-ui/core";
import { CardContent, Typography, Grid, makeStyles, CardActions } from '@material-ui/core'

import ContactUs from './../ContactUs'

import imgcard1 from './../images/card1.jpg'
import imgcard2 from './../images/card2.jpg'
import imgcard3 from './../images/card3.jpg'
import bglines from "./../images/bglines.png";
import { withRouter } from "react-router";
import Footer from "../Footer";


const useStyles = makeStyles({
    root: {

        minHeight: 300
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});


function WelcomePage(props) {
    const classes = useStyles();
    return (
        <>
            <WelcomeHeader />
            <div style={{width:"100%",justifyContent:"center",alignItems:"center",textAlign:"center",marginTop:"10px"}}>
            <img style={{ width: "90%",height:"50%"}} src={bgimg} alt="" />
            </div>
            <Grid container style={{ display: "flex" }} >
                <Grid item xs={12} >
                    {/* #ECC06A */}
                    <Card style={{ marginTop: "10px", backgroundColor: "#67737E", backgroundImage: { bglines } }}>
                        <CardContent>
                            <Grid container>
                                <Grid item xs={4} style={{ padding: "4px" }} >
                                    <Card className={classes.root}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                alt="Contemplative Reptile"
                                                height="140"
                                                image={imgcard3}
                                                title="Contemplative Reptile"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    Take Survey
          </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    Spend couple of minutes to answer the questions which will help others to get better solution.
          </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button size="small" color="primary" onClick={() => { props.history.replace("/login") }}>
                                                Take Survey
        </Button>
                                        </CardActions>
                                    </Card>


                                </Grid>
                                <Grid item xs={4} style={{ padding: "4px" }} >
                                    <Card className={classes.root}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                alt="Contemplative Reptile"
                                                height="140"
                                                image={imgcard2}
                                                title="Contemplative Reptile"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    See how popular your answers are?
          </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    You will immediately see the score card with the all the answers chosen by other users. The answer with more selections is the popular one.
          </Typography>
                                            </CardContent>
                                        </CardActionArea>

                                    </Card>


                                </Grid>
                                <Grid item xs={4} style={{ padding: "4px" }} >
                                    <Card className={classes.root}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                alt="Contemplative Reptile"
                                                height="140"
                                                image={imgcard1}
                                                title="Contemplative Reptile"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    Start your own survey
          </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    Now its your turn create the survey and publish.
          </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button size="small" color="primary" onClick={() => { props.history.replace("/login") }}>
                                                Create Survey
        </Button>
                                        </CardActions>
                                    </Card>


                                </Grid>

                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <ContactUs/>
            </Grid>
            <Footer/>
        </>
    );
}

export default withRouter(WelcomePage);