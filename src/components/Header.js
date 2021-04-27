import React from 'react';
import { Navbar, Nav, NavDropdown, Dropdown } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userId, setUser } from '../actions';
import { IconButton, Avatar, Menu, MenuItem, Divider } from '@material-ui/core';
import { useState } from 'react';
import { useEffect } from 'react';



function Header({ history }) {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [path,setPath]=useState('');
    let user=useSelector(state=>state.User);
    useEffect(()=>{
        let p = window.location.href;
        if(p.includes("home")){
            setPath('home');
        }
        if(p.includes("surveys")){
            setPath('surveys');
        }
        if(p.includes("takensurveys")){
            setPath('takensurveys');
        }
        
    },[]);
    console.log(path);
    const handleMenu = (e) => {
        setAnchorEl(e.currentTarget);
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    function signOut() {
        dispatch(userId(null));
        dispatch(setUser(null));

        

        history.replace("/");
        window.sessionStorage.clear();

    }
    return (
        <Navbar collapseOnSelect expand="lg" bg="success" variant="dark" style={{marginBottom:"20px"}}>
            <Navbar.Brand to="/home" style={{fontSize:"40px"}}>SmartCivitas</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                {path=="home"?<Nav.Link  style={{color:"white",fontSize:"20px"}} onClick={() => { history.replace("/home") }}>Home</Nav.Link>:<Nav.Link  style={{fontSize:"20px"}} onClick={() => { history.replace("/home") }}>Home</Nav.Link>}
                {path=="surveys"?<Nav.Link  style={{color:"white",fontSize:"20px"}} onClick={() => { history.replace("/surveys") }}>Surveys</Nav.Link>:<Nav.Link  style={{fontSize:"20px"}} onClick={() => { history.replace("/surveys") }}>Surveys</Nav.Link>} 
                {path=="takensurveys"?<Nav.Link  style={{color:"white",fontSize:"20px"}} onClick={() => { history.replace("/takensurveys") }}>Taken Surveys</Nav.Link>:<Nav.Link  style={{fontSize:"20px"}} onClick={() => { history.replace("/takensurveys") }}>Taken Surveys</Nav.Link>}
                    
                    <Dropdown>
                        <Dropdown.Toggle style={{ fontSize:"20px",cursor: "pointer" }} className="nav-link" as="a" variant="dark" id="dropdown-basic">
                            Create Surveys
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item style={{fontSize:"20px"}} onClick={() => { history.replace("/create-from-scratch") }}>Create from scratch</Dropdown.Item>
                            <Dropdown.Item style={{fontSize:"20px"}} onClick={() => { history.replace("/clone-existing-survey") }} >Clone Existing Survey</Dropdown.Item>
                            <Dropdown.Item style={{fontSize:"20px"}} onClick={() => { history.replace("/create-from-template") }} >Create from template</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                </Nav>
                <Nav>

                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"

                        style={{ display: "flex" }}
                    >
                        < Avatar src={user.profileObj?user.profileObj.imageUrl:user.picture?user.picture.data.url:""} />
                    </IconButton>
                    <Menu
                        id="menu-appbar"

                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                    >
                        <MenuItem >Welcome {user.profileObj?user.profileObj.name:user.name?user.name:user["first-name"]}</MenuItem>
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <Divider />

                        <MenuItem onClick={signOut}>Log Out</MenuItem>
                    </Menu>

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );

}

export default withRouter(Header);