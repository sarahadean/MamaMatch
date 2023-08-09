import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Welcome from './Pages/Welcome'
import SignupForm from './Pages/SignupForm'
import LoginForm from './LoginForm'
import PendingList from './Pages/PendingList'
import FriendsList from './Pages/FriendsList'
import MessagesList from './Pages/MessagesList'
import Conversation from './Conversation'
import Home from './Pages/Home'
import NavBar from './NavBar'
import Header from './Header'
import Profile from './Pages/Profile'
import UserContext from './Pages/UserContext'
import Footer from './Footer'
import {Box} from '@mui/material'

function App() {
  const navigate = useNavigate();
  //state of individual user
  const [user, setUser] = useState(null)


  useEffect(() => {
    authorizeUser()
    // getUserFriendships()
  }, [user])
  console.log(user)

  //authorize session
  function authorizeUser(){
    if (user == null) {
      fetch('/api/authorize_session')
      .then(response => {
        if (response.ok) {
          return response.json().then((user) => setUser(user))
        } else {
          setUser(null)
          // navigate("/")
        }
      })
    }
  }


  return (
    <UserContext.Provider value={{user, setUser}}>
      <Header navigate ={navigate}/>
      <div className='content-container'>
        <Routes>
          <Route exact path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />}/>
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm navigate={navigate}/>} />
          <Route path="/interested" key="/interested" element={<PendingList />} />
          <Route path="/friends" key="/friends"element={<FriendsList />} />
          <Route path="/messages" element={<MessagesList />} />
          <Route path="/conversations/:id/:name" element={<Conversation />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      <Footer/>
      <Box height={100}></Box>
    </UserContext.Provider>
  )
}

export default App
