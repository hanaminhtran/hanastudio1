import React from 'react';
import logo from './logo.svg';
import './App.css';
import CovidVaccine from './CovidVaccine';


import { starredIntoLocal } from "./import/google-translate"
import { Person } from './PersonProps';

class  App extends React.Component{
  render(){
  return(
    <div className="App">
 
      
      <Person
      fullname="TRAN QUANG MINH"
      birthday = { new Date("1980-09-08")}
      phone = "0919323236"
      />
    </div>
  );
}
}


//alert("abc")
//starredIntoLocal();

export default App;