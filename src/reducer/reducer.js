import { ADD_FAMILY,EDIT_FAMILY,EDIT_FAMILY_ID,EDIT__COMPLETE,ADD_CHILD ,UPDATE_CHILD_AND_STATE,EDIT_CHILD_STATE,EDIT_CHILD_DETAIL,CHILD_EDIT_SATE,REMOVE_CHILD_IN_STATE_AND_CHILD} from "./Action"


export const reducer = (state,action)=>{
    if(action.type ===ADD_FAMILY){
        console.log(action.details)
        return {...state,data:[action.details,...state?.data]}
    }else if(action.type ===EDIT_FAMILY){
        console.log(action.id)
        return {...state, editId:action.id, isEdit:true}
    }else if(action.type === "EDIT_FALSE"){
        return {...state,  isEdit:true}
    }else if(action.type === EDIT__COMPLETE){
        return {...state, editId:"", isEdit:false,data:action.editDetail}
    } else if(action.type === ADD_CHILD){
        
        return {...state,data:action.childUpdate}
    }else if(action.type === UPDATE_CHILD_AND_STATE){
        return {...state,data:action.childUpdateState}
    }else if(action.type === EDIT_CHILD_STATE){
       
        return {...state,data:action.editChildAndState,isEdit:false,editId:""}
    }else if(action.type === EDIT_CHILD_DETAIL){
        console.log("ENTER")
        return{...state,isEdit:true,editId:action.childId}
    }else if(action.type === CHILD_EDIT_SATE){
        return {...state,editId:"",isEdit:false,data:action.childUpdateState}
    }else if(action.type === REMOVE_CHILD_IN_STATE_AND_CHILD){
        return{...state,data:action.removeChild}
    }else{
        return{...state}
    }
   

}