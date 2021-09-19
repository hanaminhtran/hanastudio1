

import axios from 'axios';
import { response } from 'express';
import { title } from 'process';
import React, {useState,useEffect} from 'react';
import {SendOTP,GetDataOTP} from './apis/index'

export interface PersonProps{

  fullname : string;
  birthday : Date;
  phone: string;
}
function toTimestamp(strDate){
  var datum = Date.parse(strDate);
  return datum/1000;
}

export function FormInfo ()
 {
   //cosnt {fullname, handleOnSubmit, errors} = useFrom();

  //const [person,setPerson] = useState([]);
  const handleOnSubmit = (e:any) =>{
    e.preventDefault();
  }
  
     

  return (
    <div>
      <h1>Input Info : </h1>
      <form onSubmit={handleOnSubmit}>
        <input type="text" placeholder="fullname"/> 
        <button onClick= {handleOnSubmit}>CheckInfo</button>
      </form>
    
     
    
    </div>


    
  )
}

