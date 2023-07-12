import React from 'react'
import { Link, NavLink, useNavigate } from "react-router-dom";


function NavBar({ user, updateUser }) {
  const navigate = useNavigate()

  function handleLogout() {
		fetch("/logout").then((res) => {
			if (res.ok){
				updateUser(null);
				navigate("/");
			}
		});
	}

  return (
    <header>
      {/* {user ? } */}
      <div className='menu'>
      {user ? 
          (<>
          <NavLink className="button" to="/home">Home</NavLink>
          <NavLink className="button" to="/interested">Pending</NavLink> 
            <NavLink className="button" to="/friends">Friends</NavLink> 
            <NavLink className="button" to="/messages">Messages</NavLink>
            <NavLink className="button" to="/profile">Profile</NavLink>
            <button onClick={handleLogout} className='button'>Logout</button> 
          </>):
          (<>
            <NavLink className="button" to="/">Welcome</NavLink>
          </>) }
       
            {/* <NavLink className="button" to="/home">Home</NavLink>  */}
             
            {/* <NavLink className="button" to="/">Welcome</NavLink> */}
            
            {/* <NavLink className="button" to="/login">Login</NavLink> */}
            {/* <NavLink className="button" to="/signup">Signup</NavLink> */}
  
    </div>
    </header>
    
  )
}

export default NavBar