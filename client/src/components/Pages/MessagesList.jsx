import React, { useEffect, useState, useContext} from 'react'
import {useNavigate } from 'react-router-dom'
import Conversation from '../Conversation'
import UserContext from './UserContext'

function MessagesList() {
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext);
  console.log(user)

  //all user’s confirmed friendships with access to messages
  const [friendMessages, setFriendMessages] = useState([])


  

  useEffect(() => {
    fetch(`/api/user_friendships/${user.id}`)
    .then(res => {
      console.log(res)
      if (res.ok) {
        return res.json()
      } else if (res.status == 404){
        return []
      } else {
        throw new Error("Error fetching address details")
      }
    })
    .then(friendMessages => setFriendMessages(friendMessages))
  }, [user])

  console.log(friendMessages)

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div> 
      {[...friendMessages].map((convo) => <Conversation key={convo.id} convo={convo}/>)}
    </div>
  )
}

export default MessagesList