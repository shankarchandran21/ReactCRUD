import React, { useState } from 'react'
import "./childlist.css"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useGlobalContext } from '../../Context/Context'
import { EDIT_CHILD_DETAIL, REMOVE_CHILD_IN_STATE_AND_CHILD } from '../../reducer/Action'




function ChildList() {
  const navigate = useNavigate()


  const {data,dispatch} = useGlobalContext()
  const {id}=useParams()
  const findDetail = data.find((item)=>id===item.id)
  

const FillDetails =(name,child,parent)=>{
  if(!(name.trim())){
    // parent id and child id passed in url
    navigate(`/childForm/${parent}/${child}`)
  }
  return
}

const HandleClick = (childId,isMarriageStatus,parentId)=>{
      dispatch({type:EDIT_CHILD_DETAIL,childId})
      navigate(`/childForm/${parentId}/${childId}`)
}

const removeChild=(child_id)=>{
    const removeChildState = data.map((item)=>item.id !== child_id);
    const removeChild = data.map ((item)=>{
          if(item.id === id){
            return  {...item,child:item.child.filter((list)=>list.id !== child_id)}
          }
          return item
    }) 
    dispatch({type:REMOVE_CHILD_IN_STATE_AND_CHILD,removeChild})
}
  if(findDetail.child.length<=0){
    return <div className='noFamily'>
    <h1> Sorry No Child is Add!!!</h1>
    <div>
      <Link to='/list'>Back To Home</Link>
    </div>
  </div>
  }
  return (
    <div className='child'>
      {findDetail.child.map((item)=>(
          <div key={item.id} class="child__card" onClick={()=>FillDetails(item.name,item.id,findDetail.id)}>
            {item.name? <>
               <div className='child__card-names'>
               <h4>Name:</h4>
                 <p>{item.name}</p>
               </div>
                 <div>
                    {item.isMarriageStatus&&(
                          <div>
                            <div className='child__card-names'>
                            <h4>PartnerName:</h4>
                            <p>{item.partnerName}</p>
                            </div>
                           <div className='child__card-names'>
                           <h4>Child:</h4>
                            <p>{item.child.length}</p>
                           </div>
                          </div>
      
                      )}
                    
                 </div>
                 <div onClick={()=>HandleClick(item.id,item.isMarriageStatus,findDetail.id)} class="child__arrow">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="15" width="15">
                        <path fill="#fff" d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z"></path>
                    </svg>
                 </div>
                 <div onClick={()=>removeChild(item.id)} class="child__arrow_remove">
                    Remove
                 </div>
            </>
           :(
              <div>
                <h4 style={{fontSize:"1.5em"}}> Fill THE DETAIL</h4>
              </div>

            )}
          </div>
      ))}
    </div>
  )
}

export default ChildList