import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link, NavLink, useNavigate } from "react-router-dom";

function Footer() {
  const [value, setValue] = React.useState(0);

  return (
    <Box >
      <BottomNavigation
        showLabels
        position="fixed"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Requests" component={Link} to='/pending' icon={<RestoreIcon />} />
        <BottomNavigationAction label="Friends" component={Link} to='/friends' icon={<FavoriteIcon />} />
      </BottomNavigation>
    </Box>
  );
}

export default Footer