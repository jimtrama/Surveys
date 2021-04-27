import selectedEditSurvey from './selectedEditSurvey';
import selectedSurveyStepper from './selectedSurveyStepper'
import userId from './userId';
import isLogged from './isLogged';
import dataForStepper from './dataForStepper';
import User from './User'
import { combineReducers } from 'redux';


const allReducers = combineReducers({selectedEditSurvey,selectedSurveyStepper,
                                    isLogged,userId,dataForStepper,User
                                    });

export default allReducers;