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
import UserContext from './Pages/UserContext'

function App() {
  //state of individual user
  const [user, setUser] = useState(null)
  console.log(user)

  useEffect(() => {
    authorizeUser()
    // getFriends()
  }, [user])

  // updates user info
  function updateUser(user){
    setUser(user)
  }

  function authorizeUser(){
    if (user == null) {
      fetch('/api/authorize_session')
      .then(response => {
        if (response.ok) {
          response.json().then((user) => setUser(user))
        } else {
          setUser(null)
        }
      })
    }
  }
  
  // function getFriends(){
  //   fetch('/user_friendships')
  //   .then(response => response.json)
  //   .then(data => console.log(data))
  // }

  return (
    <UserContext.Provider value={{user, setUser}}>
      <div>
        <Header />
        <NavBar user={user} updateUser={updateUser}/>
        <Routes>
          <Route exact path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />}/>
          <Route path="/signup" element={<SignupForm user = {user} updateUser={updateUser}/>} />
          <Route path="/login" element={<LoginForm user = {user} updateUser={updateUser}/>} />
          <Route path="/interested" element={<PendingList />} />
          <Route path="/friends" element={<FriendsList />} />
          <Route path="/messages" element={<MessagesList />} />
          <Route path="/conversation" element={<Conversation />} />
          <Route path="/profile" element={<Profile user={user} updateUser={updateUser}/>} />
        </Routes>
      </div>
    </UserContext.Provider>
  )
}

export default App
