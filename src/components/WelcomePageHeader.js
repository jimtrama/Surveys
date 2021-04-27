import React, { Component } from 'react';
import {Navbar, Nav, NavDropdown, Dropdown,Button} from 'react-bootstrap'
//import Button from '@material-ui/core/Button'

import { withRouter } from 'react-router';

function WelcomeHeader  (props){

    
        //#E1A224
        return (            
            <Navbar collapseOnSelect expand="lg" style={{background:"#164C82"}} variant="dark">
          <Navbar.Brand href="/" style={{fontSize:"40px"}}>SmartCivitas</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              
            </Nav>
            
            
            <Button variant="outline-light" style={{margin:"4px"}} onClick={()=>{props.history.replace('/login')}}>Login</Button>
            <Button variant="outline-light" onClick={()=>{props.history.replace('/register')}} >Register</Button>
            
          </Navbar.Collapse>
        </Navbar>
        );
    
}

export default withRouter(WelcomeHeader);