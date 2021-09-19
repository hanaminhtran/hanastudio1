

import axios from 'axios';
import { timingSafeEqual } from 'crypto';
import { response } from 'express';
import { title } from 'process';
import React, {useState,useEffect} from 'react';

export default class  DataFetching1 extends React.Component
 {
  state= { 
    person : null, 
    loading : true
   };

   async componentDidMount() {
    
    try {

    
    const url = "https://api.randomuser.me/";
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.results[0])
    this.setState({person: data.results[0],loading:false});
   
    }
    catch (err) {
      console.log(err)
    }
  }

  render(){
    return (
      <div>
        {this.state.loading ==true ? ( <div>loading...</div> ) :
        ( 
        <div>    
          <div>name : {this.state.person.name.first} {this.state.person.name.last}</div> 
          <div>cell : {this.state.person.phone} </div>
          <img src={this.state.person.picture.large} />

        </div>
             
        )
        
        }

        
        </div>
    )
  }
  
}
