import React, { useState } from 'react'
import './childForm.css'
import { BsArrowDownCircle, BsArrowUpCircle } from 'react-icons/bs';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
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
  const [err,setErr] =useState(false)
  const navigate = useNavigate()
  const {dispatch,isEdit,editId,data}= useGlobalContext()
  const [edit,setEdit]= useState(isEdit);

  


console.log(edit,editId,data)
const handleSubmit =(e)=>{
  e.preventDefault();
   
  console.log(gender)
    if(gender &&name && !(isMarriageStatus ) ){
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
       setName("")
       setPartnerName("")
       setIsMarriageStatus(false)
       setGender("")
       setChilds([])
     

      //  it will replace the url. i get previous url combined with new url so i use this method
       const newUrl = `/list/child/${parent}`;
    navigate(newUrl, { replace: true });
      
       
      
    }else if(isMarriageStatus && name.trim() && parent.trim() && gender.trim() ){
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
        }  else{
          return item
        }
      })
     
      const childUpdateState = gender === "male" ?[...childUpdate,{id:child,fatherName:name,motherName:partnerName,child:childs}]:[...childUpdate,{id:child,fatherName:partnerName,motherName:name,child:childs}]
      dispatch({type:"UPDATE_CHILD_AND_STATE",childUpdateState})
      setName("")
      setPartnerName("")
      setIsMarriageStatus(false)
      setGender("")
      setChilds([])
      navigate("/list")
    }else if(isEdit && gender && name){

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
        }  else{
          return item
        }
      })
      if(isMarriageStatus){
        const childUpdateState = gender === "male" ?[...childUpdate,{id:child,fatherName:name,motherName:partnerName,child:childs}]:[...childUpdate,{id:child,fatherName:partnerName,motherName:name,child:childs}]
        dispatch({type:"CHILD_EDIT_SATE",childUpdateState})
        setName("")
        setPartnerName("")
        setIsMarriageStatus(false)
        setGender("")
        setChilds([])
        navigate("/list")
      }else{
        const childUpdateState = data.filter((item)=>item.id !== child)
        dispatch({type:"CHILD_EDIT_SATE",childUpdateState})
        setName("")
        setPartnerName("")
        setIsMarriageStatus(false)
        setGender("")
        setChilds([])
        navigate("/list")
      }

    }else{
        setErr(true)
        setTimeout(()=>setErr(false),3000)
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

  if(edit){
     setEdit(false)
    const Child = data.map((item)=>item.child)
    
    // flat Method make 3d array into single array
    const findDetail = Child.flatMap(twoDArray => twoDArray.flat()).find(({id})=>id === editId)
    console.log(findDetail)
    setName(findDetail.name) 
    setGender(findDetail.gender)
    setIsMarriageStatus(findDetail.isMarriageStatus)
    setPartnerName(findDetail.partnerName)
    setChilds(findDetail.child)
    
    }
  
  return (
    <div className='childForm'>
    <img src={Family} alt='~'></img>
    <div className='childForm__content'>
        <div className='childForm__content-center'>
                {err&&<p style={{color:"red"}}>Please Fill The Form Correctly</p>}
                <form>
                   <h1 style={{textAlign:"center"}}>Child Details</h1>
                   {/* Gender and status */}
                  <div className='childForm__content-gender'>
                    <div className='childForm__content-gender__button'>
                      <p>Male:</p>
                     <input type="radio" name='gender' value="male" checked={gender === 'male'} onChange={(e)=>setGender(e.target.value)} /> 
                    </div>
                    <div className='childForm__content-gender__button'>
                      <p> Female:</p>
                       <input type="radio" name='gender' value="female" checked={gender === 'female'} onChange={(e)=>setGender(e.target.value)} />
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