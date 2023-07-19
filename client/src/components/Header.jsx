import React,{useContext} from 'react'
import UserContext from './Pages/UserContext'
import { Avatar, Card, CardHeader, IconButton } from '@mui/material';

function Header() {
  const { user, setUser } = useContext(UserContext);
  return (
    <>
    <CardHeader
      action={
        <IconButton>
          <Avatar></Avatar>
        </IconButton>
      }>

    </CardHeader>
    <div className='header'>
      {user ? (
        <img src={user.profile_image} className='profile_image' />
      ) : (
        ''
      )}
      <h4>
        {user ? (
          <span className='welcome_message'>Hi {user.name}!</span>
        ) : (
          ''
        )}
      </h4>
      
    </div>

    </>
  )
}

export default Header