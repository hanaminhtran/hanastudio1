

import axios from 'axios';
import { response } from 'express';
import { title } from 'process';
import React, {useState,useEffect} from 'react';
import {SendOTP,GetDataOTP} from './apis/index'


export class C {
  a: number = 10;
  b: boolean = true;
  c: string = "hello";
  }
export class  PaitentVaccined{

  fullname : string ='';
  birthday : string='';
  phone: string='';
  identification: string='';
  address : string='';
  healthInsuranceNumber: string='';
  vaccineName: string='';
  vaccineDay: string;
  vaccinePlace: string='';
  qrCode: string='';
}
function toTimestamp(strDate){
  var datum = Date.parse(strDate);
  return datum/1000;
}

export function ShowResult (patient)
 {

  const [curPatient, setPatient] = useState(new PaitentVaccined());
  const [fullname, setFullName] = useState();
  useEffect(()=>{
    setPatient(patient);
    setFullName(patient.fullname);
    //console.log('data to ShowResult')
    console.log(fullname)
  },[patient])

  return (
    <div>
      <p>Name :{fullname} </p>
      <p>birthday :{curPatient.birthday} </p>
      <p>identification : {curPatient.identification} </p>
      <p>phone : {curPatient.phone} </p>
      <p>injection day : {curPatient.vaccineDay}</p>
      <p>injection place : {curPatient.vaccinePlace}</p>
      <p>vaccine name : {curPatient.vaccineName}</p>
      <p>vaccine qrCode : {curPatient.qrCode}</p>
    </div>
    
  )
}

