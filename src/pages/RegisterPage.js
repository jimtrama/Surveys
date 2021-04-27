import React, { useState } from "react";
import WelcomeHeader from "../components/WelcomePageHeader";
import { Select, Grid, TextField, makeStyles } from "@material-ui/core";


import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import InputBase from '@material-ui/core/InputBase';

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));


function RegisterPage(props) {
    const classes = useStyles();
    const [gender, setGender] = useState('');
    const [email,setEmail]=useState('');
    const [pass,setPass]=useState('');
    const [name,setName]=useState('');
    const [lastName,setLastName]=useState('');
    const [address,setAddress]=useState('');
    const [country,setCountry]=useState('');
    const [number,setNumber]=useState('');
    const [state,setState]=useState('');
    const [postal,setPostal]=useState('');
    const [city,setCity]=useState('');
    const handleChange = (event) => {
        setGender(event.target.value);
    };
    async function Register(e) {
        e.preventDefault();
        
        let data={
            email,
            password:pass,
            "first-name":name,
            "last-name":lastName,
            address,
            country,
            gender,
            "phone-number":number,
            'role':"user",
            state,
            "pin-code":postal,
            "district":city
        }
        let headers = {
            "method": "POST",
            "headers": {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            },
            "body":JSON.stringify(data)

        }
       
        try {
            let res = await fetch(process.env.REACT_APP_BASE_URL + `/api/user/signup`, headers);
            let data = await res.json();
            console.log(data);
            if (data.status === "success") {
                props.history.replace("/login?registered=true");
            } else {
                console.log(data.message)
            }
        } catch (error) {
            console.log(error);
        }
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
                            <h2 class="title">Registration</h2>
                            <form method="POST">
                                <Grid container alignContent="center" alignItems="center">
                                    <Grid item xs={6}>
                                        <TextField variant="outlined" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="First Name" style={{ margin: "2px" }} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField variant="outlined" value={lastName} onChange={(e)=>{setLastName(e.target.value)}} placeholder="Last Name" style={{ margin: "auto", float: "right" }} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField variant="outlined" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email" style={{ width: "100%", margin: "4px" }} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField variant="outlined" value={pass} onChange={(e)=>{setPass(e.target.value)}} placeholder="password" style={{ width: "100%", margin: "4px" }} />
                                    </Grid>
                                    <Grid item xs={12} >
                                        <FormControl className={classes.margin}>
                                            <InputLabel id="demo-customized-select-label">Gender</InputLabel>
                                            <Select
                                                labelId="demo-customized-select-label"
                                                id="demo-customized-select"
                                                value={gender}
                                                onChange={handleChange}
                                                input={<BootstrapInput />}
                                            >

                                                <MenuItem value={"male"}>Male</MenuItem>
                                                <MenuItem value={"female"}>Female</MenuItem>
                                                <MenuItem value={"other"}>Other</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField variant="outlined" value={address} onChange={(e)=>{setAddress(e.target.value)}} placeholder="Adress" style={{ width: "100%", margin: "4px" }} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField variant="outlined" value={city} onChange={(e)=>{setCity(e.target.value)}}  placeholder="City" style={{ width: "100%", margin: "4px" }} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField variant="outlined" value={state} onChange={(e)=>{setState(e.target.value)}} placeholder="State" style={{ width: "100%", margin: "4px" }} />
                                    </Grid>
                                    <Grid item xs={8}>
                                        <TextField variant="outlined" value={country} onChange={(e)=>{setCountry(e.target.value)}} placeholder="Country" style={{ width: "100%", margin: "4px", marginRight: "3px" }} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField variant="outlined" value={postal} onChange={(e)=>{setPostal(e.target.value)}} placeholder="Postal Code" style={{ margin: "2px" }} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField variant="outlined" value={number} onChange={(e)=>{setNumber(e.target.value)}} placeholder="Phone Num." style={{ margin: "2px", width: "100%" }} />
                                    </Grid>





                                    <div class="p-t-20">
                                        <button class="btn btn--radius btn--green" onClick={Register}>Submit</button>
                                    </div>
                                </Grid>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RegisterPage;