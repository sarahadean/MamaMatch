import React, { useState, useContext } from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import UserContext from './Pages/UserContext';
import {Card, Button, Grid, Box, CardHeader, CardContent, CardActions, IconButton, CardMedia, Typography } from '@mui/material'
import { Formik, Field, ErrorMessage } from "formik";
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import * as yup from "yup";


function FriendsCard({friend, friendship, updateFriendship}) {
  const {id, name, profile_image, location, about, mom_life, interests} = friend
  const { user, setUser } = useContext(UserContext);
  const [toggle, setToggle] = useState(true)

  const updateToggle = () => setToggle((prev) => !prev)


  // console.log(friend) - successfully getting friend's user info

  const url = `/conversations/${id}/${name}`
  console.log(url)

  //not getting the friendship data:
  // console.log(friendship)

//<----------DELETES FRIEND---------------->
function handleDelete(){
  fetch(`/api/friendship/${user.id}/${id}`, {
    method: "DELETE",
    headers: {
    "content-type": "application/json"
    },
    })
    .then(res => {
    if (res.ok) {
    res.json().then(friendship => {
      updateFriendship(null)
    })
    } else {
    res.json().then(error => setError(error.message));
    }
    })
    }

// const validationSchema = yup.object().shape({
//   // friendship_id: yup.string(),
//   // author: yup.string(),
//   content: yup.string()
// });

return (
  <>
  <Card variant='outlined' sx={{ maxHeight: 800, width: 300}}>
        <CardMedia 
        component="img"
        image={profile_image}
        height={350}/>
        <CardContent sx={{height:100}}>
          <Typography variant="h5">{name}</Typography>
          <Typography>{location}</Typography>
          {/* <Typography>{about}</Typography> */}
        </CardContent>

        <CardActions>
          <Grid container sx={{placeItems: 'center'}} spacing={2}>
            <Grid item xs={6}>
              <IconButton sx={{ display: 'flex', flexDirection: 'column'}} component={Link} to={url}>
                <ForumOutlinedIcon/>
                <Typography variant="caption">Chat</Typography>
              </IconButton>
            </Grid>

            <Grid item xs={6}>
              <IconButton sx={{ display: 'flex', flexDirection: 'column'}} onClick={() => updateToggle()}>
                <ClearOutlinedIcon />
                <Typography variant="caption">Vibes off?</Typography>
              </IconButton>
            </Grid>

          </Grid>
        </CardActions>
        {toggle ? 
        ("") :
        (<CardContent>
          <Typography>Click to delete friend or go back:</Typography>
          <Button onClick={() => handleDelete()}>Delete</Button>
          <Typography></Typography>
          <Button onClick={() => updateToggle()}>Nevermined</Button>
        </CardContent>)
        }
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
      clicking toggles hidden input box
      <p>Send a message to say hi!</p>
      <button onClick={updateToggleBox} className='button'> Message</button>
      <NavLink className="button" to={url}
      >Send Message</NavLink>
      <p>Vibes off? Click to delete friend:</p>
      <button onClick={() => handleDelete()} className='button'>Delete</button> */}
      
      {/* {toggleBox ? (
        <>
        <Formik
          initialValues={{
            // friendship_id: friendship.id,
            // author: user.id,
            content: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            console.log(values)
            fetch(`/api/messages/${user.id}/${id}`, {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(values)
            })
              .then((res) => {
                console.log(res)
                if (res.ok) {
                  res.json().then((message) => {
                    setMessage(message)
                    actions.resetForm() 
                    {updateToggleBox};
                  });
                } else {
                  res.json().then((data) => {
                    if (data && data.message) {
                      setError(data.message);
                    } else {
                      setError("An error occurred during signup.");
                    }
                  });
                }
              })
              .catch((error) => {
                setError("An error occurred during signup.");
                console.error(error);
              });
          }}
        > 
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <label>
                Send Message:
                <Field type="text" name="content" />
                <ErrorMessage name="content" component="h3" />
              </label>
              <input type="submit" value="Send" />
            </form>
          )}
        </Formik>
          
        </>
      ) : ("")} */}
      
      {/* <button> Block </button> */}
    {/* </div> */}
  </>
);
}

export default FriendsCard;