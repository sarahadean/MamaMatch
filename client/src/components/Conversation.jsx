import React, { useEffect, useState, useContext} from 'react'
import UserContext from './Pages/UserContext';
import Message from './Message';


//fetch all of the messages for a single conversation
//map through fetch for message component
function Conversation({convo}) {
  const { user, setUser } = useContext(UserContext);
  const {receiving_user_name, requesting_user_name, messages} = convo
//successfully getting correct information
console.log(convo)
console.log(messages)

//if messages.length() < 0


  //state of all messages for single friendship
// const [friendshipMessages, setFriendshipMessages] = useState([])

  return (
    <div>
      {user.name === receiving_user_name ? (
        <h3>{requesting_user_name}</h3>
      ) : (
        <h3>{receiving_user_name}</h3>
      )}
      {/* <p>{messages[0]}</p> */}

      {[...messages].map((message) => (
        <Message key={message.id} 
        message={message} />
      ))}
    </div>
  )
}

export default Conversation