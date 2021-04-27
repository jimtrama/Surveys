const isLogged = (state=false,action)=>{
    if(action.type=="isLogged"){
        state=action.payload;
        return state;
    }
    return state;

}
export default isLogged;