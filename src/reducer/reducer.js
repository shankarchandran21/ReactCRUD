import { ADD_FAMILY,EDIT_FAMILY,EDIT_FAMILY_ID,EDIT__COMPLETE,ADD_CHILD ,UPDATE_CHILD_AND_STATE} from "./Action"


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
    }else if(UPDATE_CHILD_AND_STATE){
        return {...state,data:action.childUpdateState}
    }else{
        return{... state}
    }
    
   return

}