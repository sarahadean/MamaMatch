import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import UserContext from './UserContext';

function Welcome() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  if (user) {
    navigate('/home')
  }

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