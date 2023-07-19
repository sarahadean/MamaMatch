import React, { useState, useContext } from 'react';
import UserContext from './Pages/UserContext';
import {Card, Grid, CardHeader, CardContent, CardActions, IconButton, CardMedia, Typography } from '@mui/material'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

function PendingCard({updatePendingFriendsList, pendingFriends, friend}) {
  const {id, name, profile_image, location, about, mom_life, interests} = friend
  const { user, setUser } = useContext(UserContext);


  //console log individual friendship
  console.log(friend)
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
        console.log(friendship)
        updatePendingFriendsList(friendship)
      })
      } else {
      res.json().then(error => setError(error.message));
      }
      })
      }
  
  return (
    <>
    <Card variant='outlined' sx={{ maxHeight: 800}}>
        <CardMedia 
        component="img"
        image={profile_image}
        height={350}/>
        <CardContent sx={{height:150}}>
          <Typography variant="h5">{name}</Typography>
          <Typography>{location}</Typography>
          <Typography>{about}</Typography>
        </CardContent>

        <CardActions>
        <Grid container sx={{placeItems: 'center'}} spacing={2}>
            <Grid item xs={6}>
              <IconButton sx={{ display: 'flex', flexDirection: 'column'}} onClick={(e) => handleSubmit(e, "CONFIRMED")}>
                <FavoriteBorderOutlinedIcon/>
                <Typography variant="caption">Confirm Friend</Typography>
              </IconButton>
            </Grid>

            <Grid item xs={6}>
              <IconButton sx={{ display: 'flex', flexDirection: 'column'}} onClick={(e) => handleSubmit(e, "HIDDEN")}>
                <ClearOutlinedIcon/>
                <Typography variant="caption">Decline</Typography>
              </IconButton>
            </Grid>
        </Grid>
        </CardActions>
      </Card>
          {/* <div className='card'>
        
          <img src={profile_image}></img>
          <ul>
          <h3>{name}</h3>
          <li>{pendingFriend.mom_life}</li>
          <li>{location}</li>
          <li>{about}</li>
          <li>{pendingFriend.interests}</li>
        </ul>
        <button onClick={(e) => handleSubmit(e, "CONFIRMED")}>Confirm?</button>
        <button onClick={(e) => handleSubmit(e, "HIDDEN")}>Nah</button>
        </div> */}
        </>
  )
}

export default PendingCard