import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from "react-router-dom";
import UserContext from './Pages/UserContext';
import { CardHeader, Button, Box, useMediaQuery, Grid, Toolbar, Avatar, IconButton, Menu, Fade, MenuItem, AppBar, Typography, Tab, Tabs, Icon} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import logo from './../logos/BloomCover.png'
import newlogo from './../logos/UpdatedCover.png'



function NavBar({navigate}) {
  const { user, setUser } = useContext(UserContext);
  const [value, setValue] = useState("undefined")

  const home = <NavLink className="button" to="/home">Home</NavLink>
  const pending = <NavLink className="button" to="/interested">Requests</NavLink> 
  const friends = <NavLink className="button" to="/friends">Friends</NavLink> 
  const profile = <NavLink className="button" to="/profile">Profile</NavLink>
  const welcome = <NavLink className="button" to="/">Welcome</NavLink>

  function handleLogout() {
		fetch("/api/logout", {
      method: "POST",
      headers: {
        "content-type" : "application/json"
      }
    }).then((res) => {
			if (res.ok){
				setUser(null);
				navigate("/");
			}
		});
	}

  return (
   <>
      <AppBar>
        <Toolbar>

      {user ? 
          (
          <>
          <IconButton>
          <Avatar alt={user.name} src={user.profile_image} component={Link} to="/profile"></Avatar>
        </IconButton>

            <Grid sx={{placeItems: 'center'}} container spacing={10}>

                <Grid item sx={2}>
                  <IconButton component={Link} to="/home" value="home">
                      <HomeIcon />
                  </IconButton >
                </Grid>

                <Grid item sx={1}></Grid>

                <Grid item sx={1}>
                  {/* <Tabs 
                      indicatorColor="secondary" 
                      textColor="inherit" 
                      value={value} onChange={(e, val)=>setValue(val)}>
                    <Tab value="Requests" label="Requests" component={Link} to="/interested"/>
                    <Tab value="Friends" label="Friends"component={Link} to="/friends"/>
                  </Tabs> */}
                </Grid>
                <Grid item sx={6} >
                <img src={newlogo} width={350}/>
              </Grid>

                <Grid item xs={2}></Grid>

                <Grid item sx={2}>
                  <Box display="flex">
                    <Button sx={{marginLeft: 'auto'}} variant='contained'onClick={handleLogout} >Logout</Button>
                  </Box>
                </Grid>
                </Grid>
          </>
          ):(
          <>
            <Grid container sx={{placeItems: 'center'}} spacing={10}>
              <Grid item sx={2}>
                <Tabs indicatorColor="secondary" textColor="inherit" value={value} onChange={(e, val)=>setValue(val)}>
                  <Tab label={welcome}/>
                </Tabs>
              </Grid>
             
              <Grid item></Grid>
              <Grid item></Grid>
              <Grid item sx={10} >
                <img src={newlogo} width={350}/>
              </Grid>
            </Grid>
          </>) }
        </Toolbar>
    </AppBar>
    </>
    
  )
}

export default NavBar