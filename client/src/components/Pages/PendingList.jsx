import React, { useState, useEffect, useContext } from 'react';
import UserContext from './UserContext';
import UserCard from '../UserCard';

function PendingList() {
  const { user, setUser } = useContext(UserContext);
  const [pendingFriends, setPendingFriends] = useState([])

  useEffect(() => {
    fetchUsers("PENDING") }, [user])

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
    const pendingFriend = pendingFriends.map((friend) => { 
    return <UserCard key={friend.id} friend={friend}/>})
  return (
    <div>{pendingFriend}</div>
  )
}

export default PendingList