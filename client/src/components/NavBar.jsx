import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from "react-router-dom";
import UserContext from './Pages/UserContext';
import { Button, Box, useMediaQuery, Grid, Toolbar, Avatar, IconButton, Menu, Fade, MenuItem, AppBar, Typography, Tab, Tabs, Icon} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';


function NavBar({navigate}) {
  const { user, setUser } = useContext(UserContext);
  const [value, setValue] = useState()

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
        <Toolbar className="App-header">
          
      {user ? 
          (
          <>
            <Grid sx={{placeItems: 'center'}} container>

                <Grid item sx={1}>
                  <IconButton component={Link} to="/home">
                      <HomeIcon />
                  </IconButton >
                </Grid>

                <Grid item xs={1}></Grid>

                <Grid item xs={6}>
                  <Tabs 
                      indicatorColor="secondary" 
                      textColor="inherit" 
                      value={value} onChange={(e, val)=>setValue(val)}>
                    <Tab label={pending}/>
                    <Tab label={friends}/>
                    <Tab label={profile}/>
                  </Tabs>
                </Grid>

                <Grid item xs={2}></Grid>

                <Grid item xs={2}>
                  <Box display="flex">
                    <Button sx={{marginLeft: 'auto'}} variant='contained'onClick={handleLogout} >Logout</Button>
                  </Box>
                </Grid>
                </Grid>
          </>
          ):(
          <>
            <Grid container spacing={1}>
              <Grid item sx={1}>
                <Tabs indicatorColor="secondary" textColor="inherit" value={value} onChange={(e, val)=>setValue(val)}>
                  <Tab label={welcome}/>
                </Tabs>
              </Grid>
            </Grid>
          </>) }
        </Toolbar>
    </AppBar>
    </>
    
  )
}

export default NavBar