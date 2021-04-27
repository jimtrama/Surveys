import React from 'react';
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import Header from './components/Header';
import Home from './components/Home';
import DisplaySurvey from './components/DisplaySurvey'
import { BrowserRouter, HashRouter,Switch } from 'react-router-dom'
import { Route } from 'react-router'
import Surveys from './components/Surveys'
import CreateSurveyFromScratch from './components/CreateSurveyFromScratch'
import CloneSurvey from "./components/CloneSurvey";
import SurveyInProgress from './components/SurveyInProgress'
import LoginPage from './pages/LoginPage';
import WelcomePage from './pages/WelcomePage';
import RegisterPage from './pages/RegisterPage';
import TakenSurveys from './components/TakenSurveys';



function App() {
    return (

        <HashRouter basename="/">
            
            <Switch>
                <Route exact path="/"  component={WelcomePage} />
                <Route exact path="/login"  component={LoginPage} />
                <Route exact path="/register"  component={RegisterPage} />
                <Route exact path="/home"  component={Home} />
                <Route exact path="/survey"  component={DisplaySurvey} />
                <Route exact path="/surveys"  component={Surveys} />
                <Route exact path="/create-from-scratch"  component={CreateSurveyFromScratch} />
                <Route exact path="/clone-existing-survey"  component={CloneSurvey} />
                <Route exact path="/takensurveys"  component={TakenSurveys} />

                <Route exact path="/survey/start/:name-:surname-:surveyId/lang=EN"  component={SurveyInProgress} />
            </Switch>
            
        </HashRouter >

    );
}

export default App;
