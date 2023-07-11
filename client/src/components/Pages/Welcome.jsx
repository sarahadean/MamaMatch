import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

function Welcome({user, updateUser}) {
  const navigate = useNavigate();
  return (
    <>
    <div>
      <h1>Welcome to MamaMatch!</h1>
    </div>
    <div className='menu'>
      {/* <button>Sign Up! </button>
      <button>Login</button> */}
      <NavLink className="button" to="/login">Login</NavLink>
      <NavLink className="button" to="/signup">Signup</NavLink>
    </div>
    </>
    
  )
}

export default Welcome