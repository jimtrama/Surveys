const selectedSurveyStepper = (state="total",action)=>{
    if(action.type=="upadateSelectedSurveyForStepper"){
        state=action.payload;
        return state;
    }
    return state;

}
export default selectedSurveyStepper;