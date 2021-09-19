

import axios from 'axios';
import { response } from 'express';
import { url } from 'inspector';
import { title } from 'process';
import React, {useState,useEffect} from 'react';
import request from 'request'

class  AxiosHeader extends React.Component
 {


  _renderCounter = () => () => 
  {
    
    const options = {
          url: 'https://translate.google.com/saved',
          method: 'get',
          headers:  {
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
      }

  
 

    return(
    <div>
      {
       
      }
      <ul>
        
        {
            //posts.map(post =><li key = {post.id}>{post.email}
            
            
          
          
        }
        { 
          <div>info :
            
             
          </div>
        
        }
        { 
          <div>more info :
     
        
      
              
          </div>
        
        }
        { 
        
        }
      </ul>

  </div>
    )
  }

  render(){
  const MyInlineHook = this._renderCounter();
    return (
      <div><MyInlineHook /></div>
    )
  }
}

  
  export default AxiosHeader;