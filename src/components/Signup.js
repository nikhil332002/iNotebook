import React,{ useState } from 'react'
import { Link } from 'react-router-dom'
import './style.css'

const Signup=()=> {
  const[credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""})


  const handleSubmit = async (e)=>{
    e.preventDefault();
    const {name,email,password}=credentials;
    const response=await fetch("http://localhost:5000/api/auth/createuser",{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify({name,email,password})
  });
  const json=await response.json()
  console.log(json);
  if (json.success){
    localStorage.setItem('token',json.authtoken); 
    alert("Signup successful!");   
  }
  else{
    alert("Invalid credentials!");
  }
  }
  const onChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="name">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" value={credentials.name}  onChange={onChange} />
        </div>
        <div className="email">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" value={credentials.email}  onChange={onChange}/>
        </div>
        <div className="password">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" value={credentials.password} onChange={onChange} minLength={3} required/>
        </div>
        {/* <div className="cpassword">
          <label htmlFor="cpassword">Confirm Password</label>
          <input type="password" name="cpassword" id="cpassword" value={credentials.cpassword} onChange={onChange}/>
        </div>
        <div className="checkbox">
          <label htmlFor="checkbox">Confirm</label>
          <input type="checkbox" name="checkbox" id="checkbox" value={credentials.checkbox} onChange={onChange}/>
        </div> */}
        <button className='submit' type='submit' >Submit</button>
      </form>
        <Link to='/login' role='button'>Go to Login</Link>
    </>
  )
}

export default Signup
