const User = (state={},action)=>{
    if(action.type=="User"){
        state=action.payload;
        return state;
    }
    return state;

}
export default User;