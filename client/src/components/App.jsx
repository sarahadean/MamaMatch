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

  //single friendship state - {} or []??
  const [friendship, setFriendship] = useState(null)


  //adds new friendship to user's friendships
  // function updateFriendships(friendship){
  //   setFriendships([...friendships, friendship])
  // }

//updates SINGLE friendship
  function updateFriendship(){
    setFriendship(friendship)
  }

 
  // console.log(friendship)

  useEffect(() => {
    authorizeUser()
    // getUserFriendships()
  }, [user])
  console.log(user)
  console.log(friendships)

  

  //adds friendship to all friendships
  // function addToAllFriendships(friendship){
  //   setAllFriendships([...allFriendships, friendship])
  // }

  //authorize session
  function authorizeUser(){
    if (user == null) {
      fetch('/api/authorize_session')
      .then(response => {
        console.log(response)
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
      <div>
        <Header />
        <NavBar navigate ={navigate}/>
        <Routes>
          <Route exact path="/" element={<Welcome />} />
          <Route path="/home" element={<Home friendship={friendship} updateFriendship={updateFriendship} updateFriendships={updateFriendships}/>}/>
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm navigate={navigate}/>} />
          <Route path="/interested" key="/interested" element={<PendingList friendship={friendship} updateFriendship={updateFriendship} updateFriendships={updateFriendships}/>} />
          <Route path="/friends" key="/friends"element={<FriendsList friendship={friendship} updateFriendship={updateFriendship}/>} />
          <Route path="/messages" element={<MessagesList />} />
          <Route path="/conversations/:id" element={<Conversation />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </UserContext.Provider>
  )
}

export default App
