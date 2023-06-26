import React, { useState } from 'react'
import { useGlobalContext } from '../../Context/Context'
import { Link, useNavigate } from 'react-router-dom'
import { EDIT_FAMILY, REMOVE_FROM_STATE } from '../../reducer/Action'
import {BiTrash} from 'react-icons/bi'
import './DetailList.css'
import Search from '../Serach/Search'
function DetailList() {
  const [search,setSearch] = useState("");
  const navigate = useNavigate()
  const {data,dispatch}=useGlobalContext()

  const HandleClick=(id)=>{
    dispatch({type:"EDIT_FAMILY",id})
    navigate('/')
}

const removeItem=(id)=>{
    const filterData = data.filter((item)=>item.id !== id);
      console.log(filterData)
    dispatch({type:REMOVE_FROM_STATE,filterData})
}


if(data?.length<=0){
  return(
    <div className='noFamily'>
      <h1> Sorry No Familyyy is Add!!!</h1>
      <div>
        <Link to='/'>Back To Home</Link>
      </div>
    </div>
  )
}



  return (
    <div className='center'>
        <div class="inputBox_container">
  <svg class="search_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" alt="search icon">
    <path d="M46.599 46.599a4.498 4.498 0 0 1-6.363 0l-7.941-7.941C29.028 40.749 25.167 42 21 42 9.402 42 0 32.598 0 21S9.402 0 21 0s21 9.402 21 21c0 4.167-1.251 8.028-3.342 11.295l7.941 7.941a4.498 4.498 0 0 1 0 6.363zM21 6C12.717 6 6 12.714 6 21s6.717 15 15 15c8.286 0 15-6.714 15-15S29.286 6 21 6z">
    </path>
  </svg>
  <input class="inputBox" id="inputBox" type="text" placeholder="Search For Family" onChange={(e)=>setSearch(e.target.value)}/>
</div>
      <div className='detailList'>
      {data.filter((item)=>{
          const filterData=search.toLowerCase() === ''?item:item.fatherName.toLowerCase().includes(search.toLowerCase()) || search.toLowerCase() === ''?item:item.motherName.toLowerCase().includes(search.toLowerCase())
          return filterData
        })?.map((item,index)=>{
          return<div key={index}>
                <div class="card">
        <div className='title-flex'>
        <h3 class="card__title">Family {index+1} </h3>
        <BiTrash className='card__trash' fontSize={20} onClick={()=>removeItem(item.id)}/>
        </div>
    <p class="card__content">
           FATHER: {item.fatherName}
       </p>
       <p class="card__content">
           MOTHER: {item.motherName}
       </p>
    <div class="card__date">
        <Link to={`child/${item.id}`}>
        CHILD:  {item.child.length}
        </Link>
    </div>
    <div onClick={()=>HandleClick(item.id)} class="card__arrow">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="15" width="15">
            <path fill="#fff" d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z"></path>
        </svg>
    </div>
   
</div>
          </div>
        })}
    </div>
    
    </div>
  )
}

export default DetailList