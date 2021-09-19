

import axios from 'axios';
import { response } from 'express';
import { title } from 'process';
import React, {useState,useEffect} from 'react';
import {SendOTP,GetDataOTP} from './apis/index'
import { ShowResult,PaitentVaccined } from './ShowResult';

export interface PersonProps{

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

  const [patient, setPatient] = useState(null);
  
  useEffect(()=>{
   // setNotes(patientData);
  })
  const handleOnSubmit = () =>{
    SendOTP(fullname, toTimestamp(birthday.toString()),phone)
    .then((response) =>{  
      var otp = prompt("Please enter OTP send to your phone", "");
      if (otp != null) {
        GetDataOTP(fullname, toTimestamp(birthday.toString()),phone,otp)
        .then((response) =>{ 
          var patientData = new PaitentVaccined();
          patientData.fullname = response.data.patientInfo.fullname;
          patientData.birthday = response.data.patientInfo.birthday;
          patientData.phone = response.data.patientInfo.personalPhoneNumber;
          patientData.identification = response.data.patientInfo.identification;
          patientData.address = `${response.data.patientInfo.ward}, ${response.data.patientInfo.district},${response.data.patientInfo.province}`;
          patientData.healthInsuranceNumber = response.data.patientInfo.healthInsuranceNumber;
          patientData.vaccineDay = response.data.patientInfo.vaccinatedInfoes[0].injectionDate;
          patientData.vaccineName = response.data.patientInfo.vaccinatedInfoes[0].vaccineName;
          patientData.vaccinePlace = response.data.patientInfo.vaccinatedInfoes[0].injectionPlace;
          setPatient(patientData);
          //console.log('da lay duoc data')   
          //console.log(patient)   


        })
      

      } 
     })
    
  }
  
     

  return (
    


    
    <div>
      <p>Name :{fullname} </p>
      <p>birthday :{toTimestamp(birthday.toString())} </p>
      <p>phone : {phone} </p>
      <button onClick= {handleOnSubmit}>CheckInfo</button>
    
      <div>
        <ShowResult patient = {patient}></ShowResult>
        </div>
    </div>


    
  )
}

