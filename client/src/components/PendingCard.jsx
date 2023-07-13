import React, { useState, useContext } from 'react';
import UserContext from './Pages/UserContext';

function PendingCard({friendship, updateFriendship, updatePendingFriendsList, pendingFriends, friend}) {
  const {id, name, profile_image, location, about, mom_life, interests} = friend
  const { user, setUser } = useContext(UserContext);


  //console log individual friendship
  console.log(friendship)
  function handleSubmit(e, value){
  //console log status from button click
    console.log(value)
    console.log(id)

    
    fetch(`/api/friendship/${user.id}/${id}`, {
      method: "PATCH",
      headers: {
      "content-type": "application/json"
      },
      body: JSON.stringify({status: (value)})
      })
      .then(res => {
      if (res.ok) {
      res.json().then(friendship => {
        updateFriendship(friendship)
        updatePendingFriendsList(pendingFriends)
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