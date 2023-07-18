import React, { useState, useEffect, useContext } from 'react';
import UserContext from './UserContext';
import PendingCard from '../PendingCard';
import { Typography } from '@mui/material';

function PendingList() {
  const { user, setUser } = useContext(UserContext);
  const [pendingFriends, setPendingFriends] = useState([])

  function updatePendingFriendsList(newfriendship){
    setPendingFriends((pendingFriends.filter((friend) => friend.id !== newfriendship.receiving_user_id && friend.id !== newfriendship.requesting_user_id)))
  }
  console.log(pendingFriends)
  

  useEffect(() => {
    fetchUsers() }, [user])

// need fetch route just getting friendship to save in state. 
  function fetchUsers(){
    if (user){
      fetch(`/api/user_friendships/${user.id}/PENDING`)
        .then(res => {
          if (res.ok) {
            // console.log(res)
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
    // logging return for user's pending friends
    // console.log(pendingFriends)

//pass down friendship state and do conditional logic to determine buttons
  if (!user) {
    return <div>Loading...</div>;
  }
  
      return (
        <>
        {pendingFriends.length === 0 ? (
          <Box>
            <Typography variant='h4'>Hello, beautiful mama! You don't have any pending requests</Typography>
          </Box>
        //   <div className='container'>
        //     <h2>Hello, beautiful mama!</h2>
        //     <p>You don't have any pending requests</p>
        // </div>
      ):(
        <div className='container'>
        {pendingFriends.map(friend => 
        <PendingCard key={friend.id} 
        friend={friend}
        //updates List of friends state
        updatePendingFriendsList={updatePendingFriendsList}
        pendingFriends={pendingFriends}/>)}
        </div>)}
      </>
) 
}

export default PendingList