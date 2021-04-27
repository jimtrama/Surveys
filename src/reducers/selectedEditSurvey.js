const selectedEditSurvey = (state=null,action)=>{
    if(action.type=="upadateSelectedSurveyForEdit"){
        state=action.payload;
        return state;
    }
    return state;

}
export default selectedEditSurvey;