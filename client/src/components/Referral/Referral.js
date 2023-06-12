import React, {useEffect, useState} from 'react';
import axios from 'axios';
import MailTo from '../MailTo/MailTo';

function Referral() {
  const[name, setName]=useState()
  const[count, setCount]=useState()
  const[refCode, setRefCode]=useState()
  const[showEmail,setShowEmail]=useState(false)
useEffect(() => {
  const email=localStorage.getItem('email')
  // const refCode=localStorage.getItem('refCode')
 axios(`http://localhost:5000/api/user/${email}`, {
  method: 'get'
 })
 .then(response => {
  console.log(response.data);
   setName(response.data.name)
   setRefCode(response.data.refCode)
   localStorage.setItem("userId",response.userId)
 })
 .catch(err => {
   console.log(err);
 })
},[])

useEffect(() => {
  const userId=localStorage.getItem('userId')
 axios(`http://localhost:5000/api/referral/${userId}`, {
  method: 'get'
 })
 .then(response => {
  console.log(response);
   setCount(response.data.referredCount)
 })
 .catch(err => {
   console.log(err);
 })
},[])
  return (
    <div>
      <h1>referral page</h1>
      <p>My name is:<b>{name}</b> </p>
      <p>My Referral code is: <b>{refCode}</b></p>
      <p>Total Referred Person: <b>{count}</b></p>
      <div>
        <button onClick={()=>setShowEmail(!showEmail)}>Invite friends</button>
      </div>
      {showEmail===true&&<MailTo name ={name} refCode= {refCode}/>}
    </div>
  )
}


export default Referral
