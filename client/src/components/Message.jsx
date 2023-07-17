import React from 'react'

function Message({message}) {

    //recipient={convo.receiving_user_name} messages={convo.messages}
  return (
    <div>
        <h5>{message.author} says:</h5>
        <p>{message.content}</p>
    </div>
  )
}

export default Message