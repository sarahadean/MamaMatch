import React from 'react'
import Home from './Pages/Home'

//need new status = Not interested??
//pressing X will create friendship with status "not interested", 
//clicking yes will create friendship with status "pending"
//add conditional to hide buttons
function UserCard({friend}) {

  const {name, profile_image, location, about, mom_life, interests} = friend
  return (
    <div>UserCard
        <ul>
          <li>{profile_image}</li>
          <li>{name}</li>
          <li>{mom_life}</li>
          <li>{location}</li>
          <li>{about}</li>
          <li>{interests}</li>
        </ul>
        <button>X</button>
        <button>YES</button>
    </div>
  )
}

export default UserCard