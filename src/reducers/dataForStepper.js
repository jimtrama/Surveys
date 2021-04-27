const dataForStepper = (state=[],action)=>{
    if(action.type=="setDataForStepper"){
        state=action.payload;
        return state;
    }
    return state;

}
export default dataForStepper;