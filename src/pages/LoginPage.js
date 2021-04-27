import React, { useState } from 'react';
import WelcomeHeader from '../components/WelcomePageHeader';
import './../styles/RegisterStyle.css'

import TextField from "@material-ui/core/TextField";
import { Grid, Collapse, IconButton } from '@material-ui/core';
import { Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner'
import { useDispatch } from 'react-redux';
import { userId, isLogged, setUser } from '../actions';
import { useEffect } from 'react';
import FacebookLoginWithButton from 'react-facebook-login';
import { withRouter } from 'react-router';
import GoogleLogin from 'react-google-login';
import Alert from "@material-ui/lab/Alert"
import CloseIcon from '@material-ui/icons/Close';
require("dotenv").config();

function LoginPage(props) {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [signedIn, setSignedIn] = useState(false);
    const [registered, setRegistered] = useState(false);
    const [failedLogin, setFailedLogin] = useState(false);
    useEffect(() => {
        if (signedIn) {
            props.history.replace("/home");
        }
    }
        , [signedIn])
    useEffect(() => {
        const params = new URLSearchParams(props.location.search);
        const commingFromRegister = params.get('registered');

        if (commingFromRegister) {
            setRegistered(true);
        }

    }, [])

    async function Login(e) {
        e.preventDefault();
        setLoading(true);
        let email = document.getElementById("email").value;
        let pass = document.getElementById("password").value;
        let headers = {
            "method": "GET",
            "headers": {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            }

        }

        try {
            let res = await fetch(process.env.REACT_APP_BASE_URL + `/api/user/login?email=${email}&password=${pass}`, headers);
            let data = await res.json();
            console.log(data);
            if (data.status === "success") {
                dispatch(setUser(data.data));
                dispatch(userId(data.data["user-id"]));
                dispatch(isLogged(true));
                props.history.replace("/home");
            } else {
                setLoading(false);
                setFailedLogin(true);
                setRegistered(true);

                console.log(data.message)
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            setFailedLogin(true);
            setRegistered(true);
        }

    }
    const responseFacebook = (response) => {
        console.log(response);
        dispatch(setUser(response));
        props.history.replace("/home")

    }
    const responseGoogle = (response) => {
        console.log(response);
        dispatch(setUser(response));
        props.history.replace("/home")
    }
    function CustomAlert({ message, type }) {
        return (
            <Collapse in={registered}>
                <Alert
                    severity={type}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setRegistered(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    {message}
                </Alert>

            </Collapse>
        );
    }
    return (
        <>
            <WelcomeHeader />

            <div class="page-wrapper bg-blue p-t-100 p-b-100 font-robo">
                <div className="bg-image"></div>
                <div class="wrapper wrapper--w680">
                    <div class="card card-1">
                        <div class="card-heading"></div>
                        <div class="card-body">
                            {failedLogin ?
                                <CustomAlert type="error" message="Something went wrong in Login" /> :
                                <CustomAlert type="success" message="Your registration is successful. Login to proceed." />
                            }

                            <h2 class="title">Log In</h2>
                            <form>
                                <Grid container alignContent="center" alignItems="center">
                                    <Grid item xs={12}>
                                        <TextField variant="outlined" placeholder="Email" id="email" style={{ margin: "2px", width: "100%" }} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField variant="outlined" placeholder="Password" type="password" id="password" style={{ margin: "2px", width: "100%" }} />
                                    </Grid>
                                </Grid>

                                <div class="p-t-20">
                                    <Grid container alignItems="center" alignContent="center" style={{ textAlign: "center" }}>
                                        <Grid item xs={12}>
                                            <Button class="btn btn--radius btn--green" style={{ width: "80%", fontSize: "20px", justify: "center" }} onClick={Login}>
                                                {!loading ? "Login" : <><Spinner
                                                    as="span"
                                                    animation="grow"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                />Loading...</>
                                                }
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12} style={{ marginTop: "10px" }}>
                                            <GoogleLogin
                                                clientId="852738334376-c59002qhipurginlcpii5uo18fqvbceu.apps.googleusercontent.com"
                                                buttonText="Log In"
                                                onSuccess={responseGoogle}
                                                render={(renderProps) => (
                                                    <Button onClick={renderProps.onClick} disabled={renderProps.disabled} style={{ width: "80%", fontSize: "20px", fontWeight: "normal" }}>Login With <strong> Google</strong></Button>
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12} style={{ marginTop: "10px" }}>
                                            <FacebookLoginWithButton
                                                appId="512587572898061"
                                                fields="name,email,picture"
                                                callback={responseFacebook}
                                                cssClass="fb-btn"

                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginPage;