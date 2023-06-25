import React, { useState } from 'react'
import "./childlist.css"
import { useNavigate, useParams } from 'react-router-dom'
import { useGlobalContext } from '../../Context/Context'




function ChildList() {
  const navigate = useNavigate()


  const {data} = useGlobalContext()
  const {id}=useParams()
  const findDetail = data.find((item)=>id===item.id)
  

const FillDetails =(name,child,parent)=>{
  if(!(name.trim())){
    navigate(`/childForm/${parent}/${child}`)
  }
  return
}

const HandleClick = (id,isMarriageStatus)=>{
  console.log(isMarriageStatus)
}



  return (
    <div className='child'>
      {findDetail.child.map((item)=>(
          <div class="child__card" onClick={()=>FillDetails(item.name,item.id,findDetail.id)}>
            {item.name? <>
               <div>
               <h4>Name:</h4>
                 <p>{item.name}</p>
               </div>
                 <div>
                    {item.isMarriageStatus&&(
                          <div>
                            <div>
                            <h4>PartnerName:</h4>
                            <p>{item.partnerName}</p>
                            </div>
                            <p>Child:{item.child.length}</p>
                          </div>
      
                      )}
                    
                 </div>
                 <div onClick={()=>HandleClick(item.id,item.isMarriageStatus)} class="child__arrow">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="15" width="15">
                        <path fill="#fff" d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z"></path>
                    </svg>
                 </div>
            </>
           :(
              <div>
                <h4>Fill THE DETAIL</h4>
              </div>

            )}
          </div>
      ))}
    </div>
  )
}

export default ChildList