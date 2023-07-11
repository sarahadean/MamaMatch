import React from 'react'
import { useNavigate } from 'react-router-dom';

function Welcome({user, updateUser}) {
  const navigate = useNavigate();
  return (
    <>
    <div>
      <h1>Welcome to MamaMatch!</h1>
    </div>
    <div>
      <button>Sign Up! </button>
      <button>Login</button>
    </div>
    </>
    
  )
}

export default Welcome