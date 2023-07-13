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

function App() {
  const navigate = useNavigate();
  //state of individual user
  const [user, setUser] = useState(null)
  const [friendship, setFriendship] = useState(null)
  console.log(user)

  function updateFriendship(){
    setFriendship(friendship)
  }

  useEffect(() => {
    authorizeUser()
  }, [user])


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
        <NavBar navigate ={navigate}/>
        <Routes>
          <Route exact path="/" element={<Welcome />} />
          <Route path="/home" element={<Home friendship={friendship} updateFriendship={updateFriendship}/>}/>
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm navigate={navigate}/>} />
          <Route path="/interested" key="/interested" element={<PendingList friendship={friendship} updateFriendship={updateFriendship}/>} />
          <Route path="/friends" key="/friends"element={<FriendsList friendship={friendship} updateFriendship={updateFriendship}/>} />
          <Route path="/messages" element={<MessagesList />} />
          <Route path="/conversation" element={<Conversation />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </UserContext.Provider>
  )
}

export default App
