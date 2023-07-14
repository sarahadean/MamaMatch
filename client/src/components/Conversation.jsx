import React, { useEffect, useState, useContext} from 'react'
import UserContext from './Pages/UserContext';
import Message from './Message';


//fetch all of the messages for a single conversation
//map through fetch for message component
function Conversation() {
  const { user, setUser } = useContext(UserContext);

  //state of all messages for single friendship
const [friendshipMessages, setFriendshipMessages] = useState([])


//fetch all the messages for single friendship
useEffect(() => {
  fetch(`/api/`)
})



  return (
    <div>
      {friendshipMessages.map(message =>
      <Message key={message.id} content={message.content} author={message.author_id}/>)}
    </div>
  )
}

export default Conversation