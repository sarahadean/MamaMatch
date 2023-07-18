import { useContext, useState } from 'react'
import UserContext from './Pages/UserContext';
import {Card, CardHeader, CardContent, CardActions, IconButton, CardMedia, Typography } from '@mui/material'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';


//need new status = Not interested??
//pressing X will create friendship with status "hide", 
//clicking yes will create friendship with status "pending"
//add conditional to hide buttons
function UserCard({ friend, friends, updateFriend }) {
  const {id, name, profile_image, location, about, mom_life, interests} = friend
  const { user, setUser } = useContext(UserContext);
  const [error, setError] = useState(null)
  // console.log(friend)
  // console.log(friendship)

  function handleSubmit(e, value){
    console.log(value)
    fetch('/api/user_friendships', {
      method: "POST",
      headers: {
      "content-type": "application/json"
      },
      body: JSON.stringify({
        requesting_user_id: user.id,
        receiving_user_id: id,
        status: value
      })
      })
      .then(res => {
      if (res.ok) {
      res.json().then(newfriend => {
        console.log(newfriend)
        updateFriend(newfriend)

      })
      } else {
      res.json().then(error => setError(error.message));
      }
      })
      }

  return (
    <>
      <Card variant='outlined' sx={{ maxWidth: 600}}>
        <CardMedia 
        component="img"
        image={profile_image}/>
        <CardContent>
          <Typography variant="h5">{name}</Typography>
          <Typography>{location}</Typography>
          <Typography>{about}</Typography>
        </CardContent>
        <hr></hr>
        <CardActions>

          <IconButton onClick={(e) => handleSubmit(e, "PENDING")}>
            <FavoriteBorderOutlinedIcon/>
            </IconButton>
          <IconButton onClick={(e) => handleSubmit(e, "HIDDEN")}>
            <ClearOutlinedIcon/>
          </IconButton>

        </CardActions>
      </Card>

    {/* <div className='card'>

    
      {friendship ? (
        ""
        ) : (
      <div>
        
          <img src={profile_image}></img>
          <h3>{name}</h3>
          <ul>
          <li>{mom_life}</li>
          <li>{location}</li>
          <li>{about}</li>
          <li>{interests}</li>
        </ul>
        <button onClick={(e) => handleSubmit(e, "PENDING")}>Yes</button>
        <button onClick={(e) => handleSubmit(e, "HIDDEN")}>No</button>
      </div>
      )}
      

    </div> */}
    
    </>
  )
}

export default UserCard