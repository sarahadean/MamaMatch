import React, { useState, useEffect, useContext } from 'react';
import UserContext from './UserContext';
import PendingCard from '../PendingCard';

function PendingList({friendship, updateFriendship}) {
  const { user, setUser } = useContext(UserContext);
  const [pendingFriends, setPendingFriends] = useState([])

  useEffect(() => {
    fetchUsers() }, [user])

  function fetchUsers(){
    if (user){
      fetch(`/api/user_friendships/${user.id}/PENDING`)
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


    console.log(pendingFriends)

//pass down friendship state and do conditional logic to determine buttons
  if (!user) {
    return <div>Loading...</div>;
  }
  

      return (
        <>
        {pendingFriends.length === 0 ? (
      <h2>Sorry, you don't have friends yet!</h2>
      ):(
        <div>
        {[...pendingFriends].map(friend => <PendingCard key={friend.id} friend={friend}/>)}
        </div>)}
      </>
) 
}

export default PendingList