

import axios from 'axios';
import { response } from 'express';
import { title } from 'process';
import React, {useState,useEffect} from 'react';

class  CovidVaccine extends React.Component
 {
  state = {
    name: '',
    username: '',
    location: '',
    password: '',
  }

  setName = (evt) => this.setState({ name: evt.target.value });

  setUsername = (evt) => this.setState({ username: evt.target.value });

  setLocation = (evt) => this.setState({ location: evt.target.value });

  setPassword = (evt) => this.setState({ password: evt.target.value });

  _renderCounter = () => () => 
  {
    let name = 'TRAN QUANG MINH';
    let date = 335176000000;
    let url = "https://tiemchungcovid19.gov.vn/api/vaccination/public/otp-search?fullname=";
    url = url +name + "&birthday=" + date.toString() + '&genderId=1&personalPhoneNumber=0919323236&identification=&healthInsuranceNumber';

    const [posts,setPosts] = useState([])
    useState(()=>{
      axios.get(url)
      .then(response =>{   
        console.log(response);
        setPosts(response.data)
         
      })
      .catch(err =>{
        console.log(err)     
      })
      //axios.getUri()   
  })

    return(
    <div>
      <ul>
   
        {
            //posts.map(post =><li key = {post.id}>{post.title} </li>)
          
        }
   
  
      </ul>

  </div>
    )
  }

  render(){
  const { name, username, location, password } = this.state;
  const MyInlineHook = this._renderCounter();
    return (
      <div><MyInlineHook />
       <p>Name: {name}</p>
        <input onChange={this.setName} value={name} />
        <p>Username: {username}</p>
        <input onChange={this.setUsername} value={username} />
        <p>Location: {location}</p>
        <input onChange={this.setLocation} value={location} />
        <p>Password</p>
        <input onChange={this.setPassword} value={password} />

      
      </div>
      

    )
  }
}

  
export default CovidVaccine;