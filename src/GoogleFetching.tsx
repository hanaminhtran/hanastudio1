

import axios from 'axios';
import { timingSafeEqual } from 'crypto';
import { response } from 'express';
import { title } from 'process';
import React, {useState,useEffect} from 'react';

export default class  GoogleFetching extends React.Component
 {
  state= { 
    person : null, 
    loading : true
   };

   async componentDidMount() {
    
    try {

    
    const url = "https://reactjs.org/docs/hooks-effect.html";

  

    const res = await fetch("https://translate.google.com/saved", {
      headers: {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Accept-Language": "en-US,en;q=0.9",
        "Authority": "translate.google.com",
        "Cache-Control": "max-age=0",
        "Sec-Ch-Ua": "\"Google Chrome\";v=\"93\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"93\"",
        "Sec-Ch-Ua-Mobile": "?0",
        "Sec-Ch-Ua-Platform": "\"macOS\"",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-User": "?1",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36",
        "X-Client-Data": "CIS2yQEIo7bJAQjEtskBCKmdygEI/dDKAQi/3soBCIyeywEI7/LLAQiQ9MsBCLP4ywEInvnLAQj4+csBCK/6ywEIov7LAQi//ssBCJ//ywEI6//LAQ=="
      }
    })
    //const data = await res.json();
    const data = res
    alert(data)
    console.log(res)
    //this.setState({person: data.results[0],loading:false});
   
    }
    catch (err) {
      //console.log(err)
    }
  }

  render(){
    return (
      <div>
        {this.state.loading ==true ? ( <div>loading googles...</div> ) :
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
