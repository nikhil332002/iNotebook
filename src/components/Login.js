import React, { useState } from 'react'
import { Link } from 'react-router-dom';
//import {useHistory} from 'react-router-dom'

const Login=()=> {
  const[credentials,setCredentials]=useState({email:"",password:""})


  const handleSubmit = async (e)=>{
    e.preventDefault();
    const response=await fetch("http://localhost:5000/api/auth/login",{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify({email:credentials.email,password:credentials.password})
  });
  const json=await response.json()
  console.log(json);
  if (json.success){
    localStorage.setItem('token',json.authtoken); 
    alert("Login successful"); 
  }
  else{
    alert("invalid credentials");
  }
  }
  const onChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="email">
          <label htmlFor="email">Email address</label>
          <input type="email" name="email" id="email" value={credentials.email}  onChange={onChange}/>
        </div>
        <div className="password">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" value={credentials.password} onChange={onChange}/>
        </div>
        <button className='submit' type='submit' >Submit</button>
      </form>
        <Link to='/home' role='button'>Next</Link>
    </>
)}

export default Login
