import React, { useState } from 'react'
import './childForm.css'
import { BsArrowDownCircle, BsArrowUpCircle } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import Family from "../../assets/pexels-pixabay-51953.jpg"
import { useGlobalContext } from '../../Context/Context';
import { ADD_CHILD } from '../../reducer/Action';
function ChildForm() {
  const [name,setName]=useState("");
  const [partnerName,setPartnerName]=useState("")
  const[isMarriageStatus,setIsMarriageStatus] =useState(false);
  const [gender,setGender] =useState("");
  const [childs,setChilds] = useState([])
  const {parent,child} = useParams()
  const {data,dispatch}=useGlobalContext()
  const navigate = useNavigate()


const handleSubmit =(e)=>{
  e.preventDefault();
   
    if(gender&&name && !(isMarriageStatus)  ){

    const childUpdate=  data.map((item)=>{
        if(item.id === parent  ){
           return {...item , child: item.child.map((list)=>{
            if(list.id === child){
              console.log(name)
              console.log(list)
              return {...list,name:name,partnerName,isMarriageStatus,gender,childs}
            }else{
              return list
            }
        })}
        }else{
          return item
        }
      })
      

       dispatch({type:ADD_CHILD,childUpdate})
       navigate(`list/child/${parent}`)
       
      
    }else if(isMarriageStatus && name.trim() && parent.trim() && gender){
      const childUpdate=  data.map((item)=>{
        if(item.id === parent  ){
           return {...item , child: item.child.map((list)=>{
            if(list.id === child){
              console.log(name)
              console.log(list)
              return {...list,name:name,partnerName,isMarriageStatus,gender,childs}
            }else{
              return list
            }
        })}
        }else{
          return item
        }
      })
     
      const childUpdateState = gender === "male" ?[...childUpdate,{id:child,fatherName:name,motherName:partnerName,child:childs}]:[...childUpdate,{id:child,fatherName:partnerName,motherName:name,child:childs}]
      dispatch({type:"UPDATE_CHILD_AND_STATE",childUpdateState})
      navigate("/list")
    }


  }
  const addChild = (newChild) => {
    setChilds(prevState => {
      const updatedChild = [...prevState, newChild];
      return [... updatedChild ];
    });
  };
  
  const removeLastChild = () => {
    setChilds(prevState => {
     
      const updatedChild = [...prevState];
      updatedChild.pop();
      return [ ... updatedChild ];
    });
  };

  console.log(isMarriageStatus)
  
  return (
    <div className='childForm'>
    <img src={Family} alt='~'></img>
    <div className='childForm__content'>
        <div className='childForm__content-center'>
                <form>
                   <h1 style={{textAlign:"center"}}>Child Details</h1>
                   {/* Gender and status */}
                  <div className='childForm__content-gender'>
                    <div className='childForm__content-gender__button'>
                      <p>Male:</p>
                     <input type="radio" name='gender' value="male" onChange={(e)=>setGender(e.target.value)} /> 
                    </div>
                    <div className='childForm__content-gender__button'>
                      <p> Female:</p>
                       <input type="radio" name='gender' value="female" onChange={(e)=>setGender(e.target.value)} />
                    </div>
                    <div className='childForm__content-gender__button'>
                      <p> MarriageStatus:</p>
                    <input
                      type="checkbox"
                      checked={isMarriageStatus}
                       onChange={(e)=>setIsMarriageStatus(e.target.checked)}
                     />
                    </div>

                  </div>
                  {/* name  */}
                  <div className='childForm__content-name'>
                        <label htmlFor="name">Name:</label>
                        <input type="text" name='name' placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)} />
                  </div>
                  {isMarriageStatus&&(
                    <>
                          <div className='childForm__content-name'>
                        <label htmlFor="name">PartnerName:</label>
                        <input type="text" name='partnerName' placeholder='Partner Name' value={partnerName} onChange={(e)=>setPartnerName(e.target.value)} />
                  </div>
                  <div className='childForm__content-child'>
                            <p>Child:</p>
                            <div className='childForm__content-child__buttons'>
                            <button type='button'><BsArrowUpCircle fontSize={'20px'} onClick={()=>addChild({id:uuidv4(),gender:"",isMarriageStatus:"",name:"",partnerName:"",child:[]})}/></button>
                                <p>{childs.length}</p>
                            <button type='button'><BsArrowDownCircle fontSize={'20px'} onClick={()=>removeLastChild()}/></button>
                            </div>
                        </div>
                       
                    </>
                  )}
                   <div className='childForm__content-button'>
                       
                        
                        <button type='submit' className='childForm__content-done' onClick={handleSubmit}>Submit</button>
                        </div>
                </form>
        </div>
    </div>
</div>
  )
}

export default ChildForm