import React from 'react'

function PendingCard({friendship, updateFriendship, pendingFriend}) {
  const {id, name, profile_image, location, about, mom_life, interests} = pendingFriend
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
        <button>Confirm?</button>
        <button>Nah</button>
        </div>
        </>
  )
}

export default PendingCard