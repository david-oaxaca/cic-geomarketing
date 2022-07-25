import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {AppBar, Tab, Tabs, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material'
import StoreIcon from '@mui/icons-material/Store';
import DrawerComponent from './DrawerComponent';

function Header() {
  const [value, setValue] = useState();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <React.Fragment>
        <AppBar sx={{ background: "#222831" }} position="sticky">
            <Toolbar>
              {
                isMatch ? (
                  <>
                    <StoreIcon/>
                    <Typography 
                    sx={{fontSize: '1.2rem', marginLeft: '2%', marginRight: '5%'}}>
                      Geomarketing
                    </Typography>
                    <DrawerComponent/>
                  </>
                ) : (
                  <>
                    <StoreIcon/>
                    <Typography 
                    sx={{fontSize: '1.2rem', marginLeft: '2%', marginRight: '5%'}}>
                      Geomarketing
                    </Typography>
                    <Tabs  textColor="inherit" 
                      value={value} 
                      onChange={(e,value) => setValue(value)} 
                      indicatorColor="#F7F7F7"
                    >
                      <Tab label='Inicio' to='/' component={Link}/>
                      <Tab label='Estudio' to='/estudio' component={Link} />
                      <Tab label='Estadistica' to='/estadistica' component={Link}/>
                    </Tabs>
                  </>
                )
              }
            </Toolbar>
        </AppBar>
    </React.Fragment>
  )
}

export default Header;