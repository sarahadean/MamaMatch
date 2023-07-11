import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
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

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    authorizeUser()
  }, [])

  function updateUser(user){
    setUser(user)
  }

  function authorizeUser(){
    fetch('/check_session')
    .then(response => {
      if (response.ok) {
        response.json().then((user) => setUser(user))
      } else {
        setUser(null)
      }
    })
  }

  return (
      <div>
        <Header />
        <NavBar/>
        <Routes>
          <Route exact path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />}/>
          <Route path="/signup" element={<SignupForm user = {user} updateUser={updateUser}/>} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/interested" element={<PendingList />} />
          <Route path="/friends" element={<FriendsList />} />
          <Route path="/messages" element={<MessagesList />} />
          <Route path="/conversation" element={<Conversation />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
    </div>
  )
}

export default App
