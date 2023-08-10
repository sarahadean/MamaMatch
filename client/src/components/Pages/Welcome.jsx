import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import UserContext from './UserContext';
import { Grid, List, Paper, Box, Button, ImageList, ImageListItem, Typography, ListItem, ListItemText, IconButton } from '@mui/material';
import { FaGithub, FaLinkedinIn } from "react-icons/fa"

function Welcome() {
  // const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  // commented out because session is not setting user_id to none and navigating back to home
  // automatically
  // if (user) {
  //   navigate('/home')
  // }

  function srcset(image, size, rows = 2, cols = 3) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }

  const imageList = [
    {
      img:"https://images.pexels.com/photos/5444934/pexels-photo-5444934.jpeg?auto=compress&cs=tinysrgb&w=400", 
      alt:"Image of a mother"
    },
    {
      img:"https://images.pexels.com/photos/5853820/pexels-photo-5853820.jpeg?auto=compress&cs=tinysrgb&w=400", 
      alt:"Image of a mother"
    },
    
    {
      img:"https://images.pexels.com/photos/5907535/pexels-photo-5907535.jpeg?auto=compress&cs=tinysrgb&w=400", 
      alt:"Image of a mother"
    },
    {
      img:"https://images.pexels.com/photos/5094674/pexels-photo-5094674.jpeg?auto=compress&cs=tinysrgb&w=400", 
      alt:"Image of a mother"
    },
    {
      img:"https://images.pexels.com/photos/1755207/pexels-photo-1755207.jpeg?auto=compress&cs=tinysrgb&w=400",
      alt:"Image of a mother"
    }
    // {
    //   img:"https://images.pexels.com/photos/6116274/pexels-photo-6116274.jpeg?auto=compress&cs=tinysrgb&w=400",
    //   alt:"Image of a mother"
    // },
    // {
    //   img:"https://images.pexels.com/photos/5528997/pexels-photo-5528997.jpeg?auto=compress&cs=tinysrgb&w=400",
    //   alt:"Image of a mother"
    // },
  ]

  return (
    <>
    <Box height={100}></Box>
    <ImageList sx={{ height: 450 }} cols={5} rowHeight={400} variant='quilted' >
      {imageList.map((picture, index) => (
        <ImageListItem key={index} cols={picture.cols || 1} rows={picture.rows || 1}>
        <img
          {...srcset(picture.img, 300, picture.rows, picture.cols)}
          alt={picture.title}
          loading="lazy"
        /> </ImageListItem>
      ))}
    </ImageList>
    {/* <img src={BloomCover} width={900}></img> */}
    <Box
    display="flex" 
    alignItems="center"
    justifyContent="center"
    sx={{width: "100vw"}}>

    <Box align="center" marginRight={10}>
      <Button component={Link} to="/signup" >Signup</Button>
    </Box>

    <Box align="center" marginLeft={10}>
      <Button component={Link} to="/login" >Login</Button>
    </Box>
    </Box>

    {/* Contact section */}
    
      <Paper
      sx={{ width: '100%', position: "fixed", bottom: 0, left: 0, right: 0, height: 215, backgroundColor: '#e8e8e8'}}
      elevation={2}>
        <Box 
        display="flex" 
        alignItems="center"
        justifyContent="center"
        sx={{width: "100vw"}}
      
        paddingTop={4}>
        <Grid container>

          <Grid container item xs={4} justifyContent="center">
          <List>
        <ListItemText>CONTACT US</ListItemText>
        <ListItemText>Ph: 800-867-5309</ListItemText>
        <ListItemText>1 Roadrunner Blvd </ListItemText>
        <ListItemText>San Antonio, TX 78257</ListItemText>
    </List>
          </Grid>

          <Grid container item xs={4} justifyContent="center">
          <List>
      <ListItemText>SOCIAL MEDIA:</ListItemText>
      <ListItemText> 
      <IconButton component={Link} to='http://linkedin.com/in/sarah-a-dean/'>
        <FaLinkedinIn/>
        </IconButton>
        LinkedIn
      </ListItemText>
      <ListItemText>
      <IconButton component={Link} to='http://github.com/sarahadean'>
        <FaGithub/>
        </IconButton>
        GitHub
      </ListItemText>
    </List>
          </Grid>

          <Grid item container xs={4} justifyContent="center">
            <List>
              <ListItemText>
                ABOUT:
              </ListItemText>
              <ListItemText>
              MamaMatch is dedicated and catered toward mothers 
              </ListItemText>
              <ListItemText>
              to foster meaningful connections within their 
              </ListItemText>
              <ListItemText>
              community. Engage with other moms IRL or use 
              </ListItemText>
              <ListItemText>
              the in-app chat feature! 
              </ListItemText>
            </List>
          </Grid>
        </Grid>
      
  
    </Box>
      </Paper>
    
    </>
    
  )
}

export default Welcome