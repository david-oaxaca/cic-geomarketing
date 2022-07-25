import React, { useState } from 'react'
import { Alert, Button, CircularProgress, Grid } from '@mui/material'
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';

import Map, {
  Marker,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl
} from 'react-map-gl';
import MarkerIcon from "./../Assets/Images/marker.png";
import Pin from './pin';
import AnalysisIcon from "./../Assets/Images/analysis.png";
import 'mapbox-gl/dist/mapbox-gl.css';
import { MAPBOX_KEY } from '../Config/Constants';
const mapboxApiKey = MAPBOX_KEY;

export default function Estudio() {

  const [viewState, setViewState] = React.useState({
    latitude: 19.504381750408218,
    longitude: -99.14677597567123,
    zoom: 11
  });

  const [results, setResults] = useState();
  const [loading, setLoading] = useState(false);

  const makeAnalysis = () => {
    // API FETCH
    //on Success
    setLoading(true);
    setTimeout(
      () => {
        setResults("Fiabilidad del negocio: 70%");
        setLoading(false);
      },
      3000
    );
  }

  return (
    <div style={{ height: '100vh', padding: "10px" }}>
      {/* Estudio */}
      <Grid container spacing={2} columns={12}>
        <Grid item md={8}>
          <div>
            <div style={{ width: "100%", height: 600 }}>
              <Map
                mapboxAccessToken={mapboxApiKey}
                style={{ width: "100%" }}
                initialViewState={viewState}
                onMove={(view) => { setViewState(view) }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
              >
                <GeolocateControl position="top-left" />
                <FullscreenControl position="top-left" />
                <NavigationControl position="top-left" />
                <ScaleControl />

                <Marker latitude={19.506381750408218}
                  longitude={-99.14177597567123}
                  onClose={() => { }}
                  anchor="bottom"
                >
                  <Pin />
                </Marker>
                <Marker latitude={19.406381750408218}
                  longitude={-99.14177597567123}
                  onClose={() => { }}
                  anchor="bottom"
                >
                  <img src={MarkerIcon} style={{ width: "16px", height: "26px" }} alt="icon" />
                </Marker>
              </Map>
            </div>
          </div>
        </Grid>
        <Grid item md={4}
          container
          spacing={0}
          direction="column"
          alignItems="center"
        >
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
              <Button style={{ height: 40, maxWidth: 10, backgroundColor: "rgba(0, 0, 0, 0.8)" }} >
                <SearchIconWrapper>
                  <SearchIcon style={{ color: "white" }} />
                </SearchIconWrapper>
              </Button>
            </Search>
            <br />
            <div style={{ textAlign: "center", paddingTop: "60px" }}>
              <div>
                <Button onClick={() => { makeAnalysis() }} style={{ backgroundColor: "#FFC300", color: "black", padding: "8px 16px 8px 16px" }} >
                  <strong> Estudio de Mercado </strong>
                </Button>
                <br/>  <br/>
                <img src={AnalysisIcon} style={{ width:"30%", height:"auto", opacity:"0.1" }} alt="icon" />
              </div>
              <div style={{ paddingTop: "100px" }}>
                {loading ? <CircularProgress /> : results ? <Alert severity="success">{results}</Alert> : ""}
              </div>
            </div>
        </Grid>
      </Grid>
    </div>
  )
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    // border:"1px solid black",
    borderRadius: "4px",
    [theme.breakpoints.up('sm')]: {
      width: '16ch',
      '&:focus': {
        width: '22ch',
      },
    },
  },
}));