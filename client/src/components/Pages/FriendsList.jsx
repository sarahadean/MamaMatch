import React, { useState, useEffect, useContext } from 'react';
import UserContext from './UserContext';
import FriendsCard from '../FriendsCard';
import { Typography, Box, Grid } from '@mui/material';

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
      <Box height={400}
      justifyContent="center"
      alignItems="center">
      <Typography variant='h4'>Hello, opulent mama!No MamaMatch friends yet! Head back to the home to find your perfect mom-match!</Typography>
    </Box>
  ):(

    <Box padding={4}
    display="flex" 
      alignItems="center"
      justifyContent="center"
      sx={{width: "100vw"}}>
      <Grid container spacing={7}>
    {actualFriends.map(friend =>(
      <Grid item >
        <FriendsCard
          key={friend.id} 
          friend={friend}
          updateFriendship={updateFriendship}
          friendship={friendship}/>    
      </Grid>
      ))}
      </Grid>
    </Box>
    
    )}


  </>
  )
}

export default FriendsList