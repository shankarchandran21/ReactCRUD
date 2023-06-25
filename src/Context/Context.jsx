import React, { useEffect } from 'react'
import { createContext,useContext,useReducer } from "react";
import {reducer} from '../reducer/reducer'
const FamilyData= localStorage.getItem("Family")
    ? JSON.parse(localStorage.getItem("Family"))
    : [];


    const GlobalContext =createContext();
export const useGlobalContext = ()=>useContext(GlobalContext);

const initialState = {
    data:FamilyData,
    editId:'',
    isEdit:false,
}

function Context({children}) {

    const [state,dispatch] =useReducer(reducer,initialState)
    useEffect(()=>{
        localStorage.setItem('Family',JSON.stringify(state.data));
    },[state.data])



  return (
    <GlobalContext.Provider value={{...state,dispatch}}>{children}</GlobalContext.Provider>
  )
}

export default Context