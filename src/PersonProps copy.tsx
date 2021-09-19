

import axios from 'axios';
import { response } from 'express';
import { title } from 'process';
import React, {useState,useEffect} from 'react';
import {SendOTP,GetDataOTP} from './apis/index'

export class PersonProps{

  fullname : string;
  birthday : Date;
  phone: string;
}
function toTimestamp(strDate){
  var datum = Date.parse(strDate);
  return datum/1000;
}

export function Person ({fullname, birthday,phone})
 {

  //const [person,setPerson] = useState([]);
  const [notes, setNotes] = useState(null);
  
  const handleOnSubmit = () =>{
    SendOTP(fullname, toTimestamp(birthday.toString()),phone)
    .then((response) =>{  
      var otp = prompt("Please enter OTP send to your phone", "");
      if (otp != null) {
        GetDataOTP(fullname, toTimestamp(birthday.toString()),phone,otp)
        .then((response) =>{ 
          console.log(response)
          //alert(response)
          //Viewresult
          setNotes(response);

        })
      

      } 
     console.log(response)})
    
  }
  
     

  return (
    <div>
      <p>Name :{fullname} </p>
      <p>birthday :{toTimestamp(birthday.toString())} </p>
      <p>phone : {phone} </p>
      <button onClick= {handleOnSubmit}>CheckInfo</button>
    
      <div style={{ width: 400, marginTop: 20 }}>{
          JSON.stringify(notes, null, 8)
        }</div>
    </div>


    
  )
}

