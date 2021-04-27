import { useSelector } from "react-redux";


export function  CheckAuth(){
    let userId=useSelector(state=>state.userId);
    if(userId!=null){
        return true;
    }else{
        return false;
    }
}