import React, {useState} from 'react';
import {setToken} from'../Auth';
import axios from 'axios';
import {Link} from 'react-router-dom';

function Login() {
  const[user, setUser] = useState({
    email:"",
    password:"",
  })
  const changeHandler = (event) =>{
    setUser({...user,email:event.target.value})
}
const changeHandler2 = (event) =>{
  setUser({...user,password:event.target.value})
}

  const handleSubmit = async (event) => {
    console.log("handle form submit")
    // Prevent page reload
    event.preventDefault();
    const res = await axios.post("http://localhost:5000/api/login", {
      email:user.email,
      password: user.password,
    })
    console.log(res.data)
    if (res.status ===200){
      console.log(res.data.user.userId);
      setToken(res.data.token)
      localStorage.setItem('email', user.email);
      localStorage.setItem("userId",res.data.user.userId)
      localStorage.setItem("refCode",res.data.user.refCode)
      window.location.href = './referral'
    }
  };
  return (
    <div>
      <div><Link to ='./register'><button> Go to Register Page</button></Link></div>
  <form onSubmit={handleSubmit}>
    <label>Email</label>
    <input type='text' onChange={changeHandler}></input>
    <label>Password</label>
    <input type = 'password' onChange={changeHandler2}></input>
    <button type='submit' >Login</button>

  </form>
    </div>
  )
}

export default Login
