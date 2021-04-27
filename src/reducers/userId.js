const userID = (state=4,action)=>{
    if(action.type=="userId"){
        state=action.payload;
        return state;
    }
    return state;

}
export default userID;