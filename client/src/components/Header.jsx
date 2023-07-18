import React,{useContext} from 'react'
import UserContext from './Pages/UserContext'
import NavBar from './NavBar';
import { Box, Avatar, Card, CardHeader, IconButton, Typography } from '@mui/material';

function Header({ navigate }) {
  const { user, setUser } = useContext(UserContext);
  return (
    <>

    <div className='header'>
      <NavBar navigate ={navigate}/>
      {user ? (
        <Typography>Hi {user.name}!</Typography>
        ) : (
          ''
        )}
    </div>

    </>
  )
}

export default Header