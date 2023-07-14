import React from 'react'

function Message({content, author}) {
  return (
    <div>
        Message
    <h5>{author} says:</h5>
    <p>{content}</p>
    </div>
  )
}

export default Message