import React from 'react'
import emailjs from '@emailjs/browser';

const USER_ID ='7px9uWE1xMYvr7zyl';
const TEMPLATE_ID='template_z4we2f5';
const SERVICE_ID= "service_gl2r8k4";

function MailTo(props) {
    const sendEmail = e => {
        e.preventDefault()    
        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID)
        .then(result => {
            console.log(result.text)
          },
          error => {
            console.log(error.text)
          }
        )
    }
  return (
    <div>
       <form className="form" onSubmit={sendEmail}>
        <input name={props.name} type="text" placeholder="Your name..." className="form__input" />
        <textarea name= {props.refCode}type="text" placeholder="Your Referral Code..." className="form__input"  ></textarea>

        <input type="submit" value="send" className="form__input form__input--button"/>
    </form>
    </div>
  )
}
export default MailTo
