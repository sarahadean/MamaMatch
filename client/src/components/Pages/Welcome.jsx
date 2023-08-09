import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import UserContext from './UserContext';
import { Box, Button, ImageList, ImageListItem } from '@mui/material';

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
    <Box height={100}>
    </Box>
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
    <Box align="center">
      <Button component={Link} to="/signup">Signup</Button>
      <Button component={Link} to="/login">Login</Button>
    </Box>

    <div className='menu'>
      {/* <button>Sign Up! </button>
      <button>Login</button> */}
      {/* <NavLink className="button" to="/login">Login</NavLink>
      <NavLink className="button" to="/signup">Signup</NavLink> */}
    </div>
    </>
    
  )
}

export default Welcome