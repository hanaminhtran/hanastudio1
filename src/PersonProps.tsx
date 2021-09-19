

import axios from 'axios';
import { response } from 'express';
import { title } from 'process';
import React, {useState,useEffect} from 'react';
import {SendOTP,GetDataOTP} from './apis/index'
import { ShowResult,PaitentVaccined } from './ShowResult';
import DateTimePicker from 'react-datetime-picker';

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: 600,
    height: 600,
    margin: "50px auto",
    backgroundColor: "orange",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
  },
  containerResult: {
    width: 600,
    height: 600,
    margin: "50px auto",
    backgroundColor: "green",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
  },
};

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
  const [noData, setNodata] = useState( false);
  const [message, setMessage] = useState( "You have no information in the vaccination database!");
  const [showInputPage, setShowInput] = useState( true);
  const [dateBirth, onChange] = useState(new Date());

  const initialValues = {
    _fullname: "",
    _birthDay: "",
    _phone: "",
  };
  const [values, setValues] = useState(initialValues);
  const handleChange = (e)=> {

    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  }
  const handleOnBack = (e) =>{
    setShowInput(true);
    setNodata(false);

    setResult(false);

  }

  const handleOnSubmit = (e) =>{
    setNodata(false);
      setResult(false);
    e.preventDefault();
    var promis =  SendOTP(values._fullname, toTimestamp(dateBirth.toString()),values._phone)
    promis.then( (response) =>{  
      
      var otp = prompt("Please enter OTP send to your phone", "");
      if (otp != null) {
        GetDataOTP(values._fullname, toTimestamp(dateBirth.toString()),values._phone,otp)
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
          setShowInput(false);
          setNodata(false);
          setPatient(patientData);
          setResult(true);
          console.log(response)   
        },reason => {
          setNodata(true);
          setResult(false);
          setMessage("Invalid OTP code!")
          console.error(reason)})
      } 
     }, reason => {
      setNodata(true);
      setResult(false);
      setMessage("You have no information in the vaccination database!")
      console.error(reason); // Error!
    });
    
    
  }
  
  /* <button onClick={() => this.setState({ showing: !showing })}>toggle</button>
  <div style={{ display: (showing ? 'block' : 'none') }}>This is visible</div> */

  return (
        
    <div style={{

      justifyContent: "left",
      alignItems: "left"
    }}>
        
        { showInputPage ? 
      <div style={styles.container}>
        <h2> Input info to check your vaccination: </h2>
          <form>
         
              <p>
                <label> Name:  <input  name="_fullname" type="text" value={values._fullname} onChange={handleChange} /> </label>
              </p>
              <p>
              <label>  Birthday:  <DateTimePicker format="dd-MM-y" onChange={onChange} value={dateBirth} /></label>
              </p>
              <p>
                <label> Phone:  <input name="_phone"  type="text" value={values._phone} onChange={handleChange}  /> </label>
              </p>    
              <p>         
              <input type="submit" value="Check" onClick= {handleOnSubmit}/>
              </p>
            </form>
     </div> : null
      }
      { showing ?
      <div style={styles.containerResult}>
          <h1 style={{color: "green"}}>You injection information:</h1>
          <p>Name :<b>{patient.fullname}</b> </p>
          <p>Birthday :<b>{patient.birthday} </b></p>
          <p>Id card :<b> {patient.identification}</b> </p>
          <p>Phone : <b>{patient.phone}</b> </p>
          <p>Injection day :<b> {patient.vaccineDay}</b></p>
          <p>Injection place :<b> {patient.vaccinePlace}</b></p>
          <p>Vaccine name : <b>{patient.vaccineName}</b></p>
          <button onClick= {handleOnBack}>Back </button> 
         {/*  <p>vaccine qrCode : {patient.qrCode}</p> */}
      </div> : null
      }
      { noData ?
      <div>
          
          <h1 style={{color: "red"}}>{message}</h1>
          
      </div> : null
      }
    </div>


    
  )
}

