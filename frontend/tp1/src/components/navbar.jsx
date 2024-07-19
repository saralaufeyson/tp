import HomeIcon from '@mui/icons-material/Home';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Link } from 'react-router-dom';
import BasicDateCalendar from './togglec';
import banner from './ban.png'




export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{
      background: 'linear-gradient(to right, #EE6520, #883A12)',
    width:'100%',left:0}}
      >
         <img src={banner}></img>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <HomeIcon /> <Link to='/home'style={{color:'white'}}>Home</Link>
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            TRADE PLANNER
          </Typography>
          
         <MenuItem  > <Link to='/add' style={{color:'white'}}>
         
              <Typography >Add Stratergy</Typography>
              
              </Link></MenuItem>
              <MenuItem  > 
         <Link to="https://www.nseindia.com/option-chain" style={{color:'white'}} target="_blank">
             <Typography sx={{color:'whitesmoke'}}> NSE option chain</Typography>
             </Link>
              </MenuItem>
              <MenuItem  > 
         
            <BasicDateCalendar/>Calendar
              
              </MenuItem>
         
               
                
          
        </Toolbar>
      </AppBar>
     
    </Box>
  );
}