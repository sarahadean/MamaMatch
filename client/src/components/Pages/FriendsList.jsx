import React, { useState, useEffect, useContext } from 'react';
import UserContext from './UserContext';
import FriendsCard from '../FriendsCard';

function FriendsList({friendship, updateFriendship}) {
  const { user, setUser } = useContext(UserContext);
  
  const [actualFriends, setActualFriends] = useState([])

  

  useEffect(() => {
    fetchUsers() }, [user])

    if (!user) {
      return <div>Loading...</div>;
    }

  function fetchUsers(){
    if (user){
      fetch(`/api/user_friendships/${user.id}/CONFIRMED`)
        .then(res => {
          // console.log(res)
          if (res.ok) {
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
    console.log(actualFriends)

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
    {actualFriends.length === 0 ? (
  <div>
  <h2>Hello, opulent mama!</h2>
  <p>No MamaMatch friends yet! Head back to the home to find your perfect mom-match!</p>
</div>
  ):(
    <div className='container'>
    {actualFriends.map(friend => 
    <FriendsCard
    key={friend.id} 
    friend={friend}
    updateFriendship={updateFriendship}
    friendship={friendship}
    />)}
    </div>)}
  </>
  )
}

export default FriendsList