import React,{useContext} from 'react'
import UserContext from './Pages/UserContext'

function Header() {
  const { user, setUser } = useContext(UserContext);
  return (
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
  )
}

export default Header