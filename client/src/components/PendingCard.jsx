import React from 'react'

function PendingCard({friendship, updateFriendship, pendingFriend}) {
  const {id, name, profile_image, location, about, mom_life, interests} = pendingFriend
  
  function handleSubmit(e, value){
    console.log(value)
    fetch(`/api/friendship/${friendship.id}`, {
      method: "POST",
      headers: {
      "content-type": "application/json"
      },
      body: JSON.stringify({
        status: e.target.value
      })
      })
      .then(res => {
      if (res.ok) {
      res.json().then(friendship => {
        updateFriendship(friendship)
      })
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
        <button onClick={(e) => handleSubmit(e, "CONFIRMED")}>Confirm?</button>
        <button onClick={(e) => handleSubmit(e, "HIDDEN")}>Nah</button>
        </div>
        </>
  )
}

export default PendingCard