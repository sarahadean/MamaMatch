import React,{useContext} from 'react'
import UserContext from './Pages/UserContext'
import NavBar from './NavBar';
import { Box, Avatar, Card, CardHeader, IconButton, Typography } from '@mui/material';

function Header({ navigate }) {
  const { user, setUser } = useContext(UserContext);
  return (
    <>
    <Typography></Typography>
    {/* <CardHeader
      action={
        <IconButton>
          <Avatar></Avatar>
        </IconButton>
      }>

    </ CardHeader> */}
    <div className='header'>
      
        {user ? (
          <span className='welcome_message'>Hi {user.name}!</span>
        ) : (
          ''
        )}
      <NavBar navigate ={navigate}/>
    </div>

    </>
  )
}

export default Header