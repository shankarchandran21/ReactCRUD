import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './detail.css'
import { ADD_FAMILY,EDIT_FAMILY_ID,EDIT__COMPLETE } from "../../reducer/Action"
import Family from '../../assets/pexels-elina-fairytale-3807332.jpg'
import {BsArrowUpCircle,BsArrowDownCircle} from 'react-icons/bs'
import { v4 as uuidv4 } from 'uuid';
import { useGlobalContext } from '../../Context/Context';
function Detail() {
const {dispatch,isEdit,editId,data}= useGlobalContext()
const [detail,setDetail] = useState({fatherName:"",motherName:"",child:[]});
const [edit,setEdit]= useState(isEdit);
const [error,setError]=useState(false);
const navigate = useNavigate()
const HandleChange=(e)=>{
    setError(false);
    const name = e.target.name;
    const value = e.target.value;
    setDetail({...detail,[name]:value})
}

const addChild = (newChild) => {
  setDetail(prevState => {
    const updatedChild = [...prevState.child, newChild];
    return { ...prevState, child: updatedChild };
  });
};

const removeLastChild = () => {
  setDetail(prevState => {
    const updatedChild = [...prevState.child];
    updatedChild.pop();
    return { ...prevState, child: updatedChild };
  });
};

if( edit){
  const findId = data.find(({id})=>id === editId);
    console.log(findId)
    setEdit(false)
    setDetail({...detail,fatherName:findId.fatherName,motherName:findId.motherName,child:findId.child})
    console.log(isEdit)
    
  }

const HandleSubmit=(e)=>{
    e.preventDefault();
   
    if(detail.fatherName.trim()&&detail.motherName.trim()&&!isEdit){
      
    


      let details={...detail,id:uuidv4()}
      dispatch({type:ADD_FAMILY,details});
      setDetail({...detail,fatherName:"",motherName:"",child:[]});
      navigate('/list')

    }else if(isEdit && editId && detail.fatherName.trim()&&detail.motherName.trim()){
      const Child = data.map((item)=>item.child)
      // flat Method make 3d array into single array
      const flattenedArray_isChild = Child.flatMap(twoDArray => twoDArray.flat()).some((item)=>item.id === editId)
        if(flattenedArray_isChild){
            console.log("ENTER")
        }else{
          let editDetail = data.map((item)=>{
            if(item.id === editId){
              return {...item,fatherName:detail.fatherName,motherName:detail.motherName,child:detail.child}
            }else{
              return item;
            }

        })
        
        dispatch({type:EDIT__COMPLETE,editDetail})
      setDetail({...detail,fatherName:"",motherName:""});
      
      
        navigate('/list')
        }
    }else{
      setError(true)
      setTimeout(()=>setError(false), 3000)
    }
   
}


  return (
    <div className='detail'>
        <img src={Family} alt='~'></img>
        <div className='detail__content'>
            <div className='detail__content-center'>
                    <form>
                        {error&&(<p style={{color:'red'}}>Please fill the form correctly!!!</p>)}
                        <h1>HELLO FAMILY!!!</h1>
                        <div>
                        <label htmlFor="fatherName">FatherName:</label>
                        <input type="text" name='fatherName' placeholder='FatherName' value={detail.fatherName} onChange={HandleChange} />
                        </div>
                        <div>
                        <label htmlFor="motherName">MotherName:</label>
                        <input type="text" name='motherName' placeholder='MotherName' value={detail.motherName} onChange={HandleChange} />
                        </div>
                        <div className='detail__content-child'>
                            <p>Child:</p>
                            <div className='detain__content-child__buttons'>
                            <button type='button'><BsArrowUpCircle fontSize={'20px'} onClick={()=>addChild({id:uuidv4(),gender:"",isMarriageStatus:"",name:"",partnerName:"",child:[]})}/></button>
                                <p>{detail.child.length}</p>
                            <button type='button'><BsArrowDownCircle fontSize={'20px'} onClick={()=>removeLastChild()}/></button>
                            </div>
                        </div>
                        <div className='detail__content-button'>
                        <button type='button' className='detail__content-done' onClick={()=>navigate('/list')}>View Family</button>
                        
                        <button type='submit' className='detail__content-done' onClick={HandleSubmit}>Submit</button>
                        </div>
                    </form>
            </div>
        </div>
    </div>
  )
}

export default Detail