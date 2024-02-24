import React from 'react'
import { Link } from 'react-router-dom'

function Loginpage() {
  return (
    <>
      <form >
      <Link to="/" ></Link>
      <Link to="/login" role='button'>Login</Link>
      <Link to="/signup" role='button'>SignUp</Link>
      </form>
    </>
  )
}

export default Loginpage
