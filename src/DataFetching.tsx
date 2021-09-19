

import axios from 'axios';
import { response } from 'express';
import { title } from 'process';
import React, {useState,useEffect} from 'react';

class  DataFetching extends React.Component
 {


  _renderCounter = () => () => 
  {
    
    

    const [posts,setPosts] = useState([])
    useState(()=>{
      //axios.get('https://jsonplaceholder.typicode.com/posts')
      axios.get('https://api.randomuser.me')
      .then(response =>{   
      
        //console.log(response.data.results);
        //if(response.data.results.length > 0)
          setPosts(response.data.results)
          //this.setState({person: response.data.result})
         
      })
      .catch(err =>{
        console.log(err)     
      })

      axios.getUri()
     

  })

    return(
    <div>
      {
       
      }
      <ul>
        
        {
            //posts.map(post =><li key = {post.id}>{post.email}
            
            posts.map((post) =><li key = {post.id}>{post.email}</li>)
          
          
        }
        { 
          <div>info :
            
              {posts.map((i) =>  (
                
                i.name.first + ' ' +
                i.name.last + ' ' + '- Cell :' +
                i.cell + ' ' +
                i.gender
      
              )
              )}
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

  
  export default DataFetching;