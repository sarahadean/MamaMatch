import React from 'react'

function FriendsCard({friend, friendship, updateFriendship}) {
  const {id, name, profile_image, location, about, mom_life, interests} = friend
  
  function handleSubmit(e){
    fetch(`/api/friendship/${friendship.id}`, {
      method: "DELETE",
      headers: {
      "content-type": "application/json"
      },
      })
      .then(res => {
      if (res.ok) {
      res.json()
      // .then(friendship => {updateFriendship(friendship)})
      } else {
      res.json().then(error => setError(error.message));
      }
      })
      }

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
        <button > Message</button>
        <button onClick={(e) => handleSubmit(e)}>Delete</button>
        </div>
        </>
  )
}

export default FriendsCard