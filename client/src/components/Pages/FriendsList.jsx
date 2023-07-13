import React, { useState, useEffect, useContext } from 'react';
import UserContext from './UserContext';
import UserCard from '../UserCard';

function FriendsList({friendship, updateFriendship}) {
  const { user, setUser } = useContext(UserContext);
  const [actualFriends, setActualFriends] = useState([])

  useEffect(() => {
    fetchUsers() }, [user])

  function fetchUsers(){
    if (user){
      fetch(`/api/user_friendships/${user.id}/CONFIRMED`)
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
        .then(actualFriends => setActualFriends(actualFriends))
      }
    }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
    {actualFriends.length === 0 ? (
  <h2>Sorry, you don't have friends yet!</h2>
  ):(
    <div>
    {[...actualFriends].map(friend => 
    <PendingCard 
    key={friend.id} 
    friend={friend}
    friendship={friendship}
    updateFriendship={updateFriendship}
    />)}
    </div>)}
  </>
  )
}

export default FriendsList