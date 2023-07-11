import { useState, useEffect } from 'react'
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
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <NavBar/>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/welcome" element={<Welcome />}/>
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/interested" element={<PendingList />} />
          <Route path="/friends" element={<FriendsList />} />
          <Route path="/messages" element={<MessagesList />} />
          <Route path="/conversation" element={<Conversation />} />
        </Routes>
    </div>
    </>
  )
}

export default App
