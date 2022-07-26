import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Tab, Tabs, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material'
import StoreIcon from '@mui/icons-material/Store';
import DrawerComponent from './DrawerComponent';

function Header() {
  const [value, setValue] = useState('Inicio');
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    let pathPure = window.location.pathname;
    let path = pathPure.substring(1, pathPure.length);
    if (path === "") {
      setValue("Inicio")
    } else if (path === "estudio") {
      setValue("Estudio");
    } else if (path === "estadistica") {
      setValue("Estadistica");
    }
  }, []);


  return (
    <React.Fragment>
      <AppBar sx={{ background: "#222831" }} position="sticky">
        <Toolbar>
          {
            isMatch ? (
              <>
                <StoreIcon />
                <Typography
                  sx={{ fontSize: '1.2rem', marginLeft: '2%', marginRight: '5%' }}>
                  Geomarketing
                </Typography>
                <DrawerComponent />
              </>
            ) : (
              <>
                <StoreIcon />
                <Typography
                  sx={{ fontSize: '1.2rem', marginLeft: '2%', marginRight: '5%' }}>
                  Geomarketing
                </Typography>
                <Tabs textColor="inherit"
                  value={value}
                  onChange={(e, value) => setValue(value)}
                  indicatorColor="secondary"
                >
                  <Tab value="Inicio" label='Inicio' to='/' component={Link} />
                  <Tab value="Estudio" label='Estudio' to='/estudio' component={Link} />
                  <Tab value="Estadistica" label='Estadistica' to='/estadistica' component={Link} />
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