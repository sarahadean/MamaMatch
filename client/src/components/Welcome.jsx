import React from 'react'
import { useNavigate } from 'react-router-dom';

function Welcome({user, updateUser}) {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Welcome to MamaMatch!</h1>

      <p>New here, Mama?</p>
      <Link to={"/signup"} >
      <button>Sign up!</button>
      </Link>
      
      <p>Returning user? </p>
      <Link to={"/login"}></Link>
      <button>Login</button>
    </div>
  )
}

export default Welcome