import React from 'react'

function FriendsCard({friend, friendship, updateFriendship}) {
  const {id, name, profile_image, location, about, mom_life, interests} = friend
  
  return (
    <>
          <div>
        
          <img src={profile_image}></img>
          <ul>
          <h3>{name}</h3>
          {/* <li>{pendingFriend.mom_life}</li> */}
          <li>{location}</li>
          <li>{about}</li>
          {/* <li>{pendingFriend.interests}</li> */}
        </ul>
        <button>Message</button>
        <button>Delete</button>
        </div>
        </>
  )
}

export default FriendsCard