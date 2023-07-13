import React, { useState, useEffect, useContext } from 'react';
import UserContext from './UserContext';
import UserCard from '../UserCard';

function FriendsList() {

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    fetchUsers("CONFIRMED") }, [user])

  function fetchUsers(status){
    if (user){
      fetch(`/api/user_friendships/${user.id}/${status}`)
        .then(res => {
          if (res.ok) {
            console.log(res)
            return res.json()
          } else if (res.status == 404) {
            return []
          } else {
            throw new Error("Error fetching address details");
          }
        })
        .then(pendingFriends => setPendingFriends(pendingFriends))
    }
    }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>FriendsList - this will display friendships with status= CONFIRMED</div>
  )
}

export default FriendsList