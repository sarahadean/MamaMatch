import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Welcome from './Welcome'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import PendingList from './PendingList'
import FriendsList from './FriendsList'
import MessagesList from './MessagesList'
import Conversation from './Conversation'
import Home from './Home'
import NavBar from './NavBar'
import Header from './Header'

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
        <NavBar/>
        <Header />
        <Routes>
          <Route exact path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />}/>
          <Route path="/signup" element={<SignupForm user = {user} updateUser={updateUser}/>} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/interested" element={<PendingList />} />
          <Route path="/friends" element={<FriendsList />} />
          <Route path="/messages" element={<MessagesList />} />
          <Route path="/conversation" element={<Conversation />} />
        </Routes>
    </div>
  )
}

export default App
