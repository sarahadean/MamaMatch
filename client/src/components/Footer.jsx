import React, { useContext } from 'react';
import {Box, Paper, List, ListItem} from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link, NavLink, useNavigate } from "react-router-dom";
import UserContext from './Pages/UserContext';

function Footer() {
  const [value, setValue] = React.useState(0);
  const {user, setUser } = useContext(UserContext)

  return (
    <Box >
      
      {user ? 
      (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}
        justifyContent="center"
        alignItems="center" 
        >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      > 
        <BottomNavigationAction label="Requests" component={Link} to='/interested' icon={<RestoreIcon />} />
        <BottomNavigationAction label="Friends" component={Link} to='/friends' icon={<FavoriteIcon />} />
      </BottomNavigation>
      </Paper>
      ) : (""
      //   <Paper
      //   sx={{ position: "fixed", bottom: 0, left: 0, right: 0, height: 200 }}
      //   elevation={2}
      //   justifyContent="center"
      //   alignItems="center" 
      //   >
      // <List>
      //   <ListItem>Contact Us</ListItem>
      // </List>
      //   </Paper>
      )}
      {/* <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      > 
        <BottomNavigationAction label="Requests" component={Link} to='/interested' icon={<RestoreIcon />} />
        <BottomNavigationAction label="Friends" component={Link} to='/friends' icon={<FavoriteIcon />} />
      </BottomNavigation> */}
      
    </Box>
  );
}

export default Footer