import React from 'react'

function Message({convo}) {

    //recipient={convo.receiving_user_name} messages={convo.messages}
  return (
    <div>
        Message
        <h5>{convo.author} says:</h5>
        <p>{convo.messages[1]}</p>
    </div>
  )
}

export default Message