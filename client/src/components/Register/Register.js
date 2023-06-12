import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';
function Register() {
  const [user, setUser]= useState({
    name:"",
    email:"",
    password: "",
    refId:"",
  })
  const changeHandler = (event) =>{
    setUser({...user,name:event.target.value})
}
const changeHandler2 = (event) =>{
  setUser({...user,email:event.target.value})
}
const changeHandler3 = (event) =>{
  setUser({...user,password:event.target.value})
}
const changeHandler4 = (event) =>{
  setUser({...user,refId:event.target.value})
}
const submitHandler = async (event)=>{
    event.preventDefault(event);
    try {
      let result = await axios.post(          // any call like get
        "http://localhost:5000/api/register",         // your URL
        {                                     // data if post, put
          name: user.name,
          email:user.email,
          password:user.password,
          refId: user.refId,
        }
      );
      console.log(result.response.data);
    } catch (error) {
      console.log(error);  
    }
// const res= await axios.post("http://localhost:5000/api/register",user)
// console.log(res) 
// console.log(res.status)
// console.log(user)
// if(res.status===200){
//     alert("Register")
// }
 }
  return (
    <div>
      <div><Link to ='/'><button>Go to Login page</button></Link></div>

      <form onSubmit={submitHandler}>
    <label>Name</label>
    <input type='text'  onChange={changeHandler}></input>
    <label>Email</label>
    <input type='text'  onChange={changeHandler2}></input>
    <label>Password</label>
    <input type = 'password'  onChange={changeHandler3}></input>
    <label>Ref Id</label>
    <input type='text'  onChange={changeHandler4}></input>
  <button type='submit'>Register</button>

  </form>
    </div>
  )
}

export default Register
