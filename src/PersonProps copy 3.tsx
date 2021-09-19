

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

  const [patient, setPatient] = useState( new PaitentVaccined());
  const [showing, setResult] = useState( false);

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
          var dateInject = new Date(response.data.patientInfo.vaccinatedInfoes[0].injectionDate);
          var dateBirth = new Date(response.data.patientInfo.birthday);
          patientData.fullname = response.data.patientInfo.fullname;
          patientData.birthday = dateBirth.getDate()+"/"+(dateBirth.getMonth()+1)+ "/"+dateBirth.getFullYear();
          patientData.phone = response.data.patientInfo.personalPhoneNumber;
          patientData.identification = response.data.patientInfo.identification;
          patientData.address = `${response.data.patientInfo.ward}, ${response.data.patientInfo.district},${response.data.patientInfo.province}`;
          patientData.healthInsuranceNumber = response.data.patientInfo.healthInsuranceNumber;
          patientData.vaccineDay = dateInject.getDate()+"/"+(dateInject.getMonth()+1)+ "/"+dateInject.getFullYear();
          patientData.vaccineName = response.data.patientInfo.vaccinatedInfoes[0].vaccineName;
          patientData.vaccinePlace = response.data.patientInfo.vaccinatedInfoes[0].injectionPlace;
          patientData.qrCode = response.data.patientInfo.vaccinatedInfoes[0].qrCode;
         
          setPatient(patientData);
          setResult(true);
          console.log(patientData)   


        })
      

      } 
     })
    
  }
  
  /* <button onClick={() => this.setState({ showing: !showing })}>toggle</button>
  <div style={{ display: (showing ? 'block' : 'none') }}>This is visible</div> */

  return (
    


    
    <div>

      <p>Name :{fullname}  </p>
      <p>birthday :{toTimestamp(birthday.toString())} </p>
      <p>phone : {phone} </p>
      <button onClick= {handleOnSubmit}>CheckInfo</button>
      { showing ?
      <div>
          <p>Name :{patient.fullname} </p>
          <p>birthday :{patient.birthday} </p>
          <p>identification : {patient.identification} </p>
          <p>phone : {patient.phone} </p>
          <p>injection day : {patient.vaccineDay}</p>
          <p>injection place : {patient.vaccinePlace}</p>
          <p>vaccine name : {patient.vaccineName}</p>
          <p>vaccine qrCode : {patient.qrCode}</p>
      </div> : null
    }
    </div>


    
  )
}

