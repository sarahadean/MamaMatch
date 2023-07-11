import React from 'react'
import { Link, NavLink, useNavigate } from "react-router-dom";

function NavBar() {

    // const navigate = useNavigate()

  return (
    <div>NavBar
        <nav>
            <NavLink exact to="/">Welcome</NavLink>
            <NavLink exact to="/signup">Signup</NavLink>
            <NavLink exact to="/login">Login</NavLink>
            <NavLink exact to="/home">Home</NavLink>
            <NavLink exact to="/interested">Pending</NavLink>
            <NavLink exact to="/friends">Matches</NavLink>
            <NavLink exact to="/messages">Messages</NavLink>
            {/* <NavLink exact to="/conversation">Welcome</NavLink> */}
        </nav>
    </div>
  )
}

export default NavBar