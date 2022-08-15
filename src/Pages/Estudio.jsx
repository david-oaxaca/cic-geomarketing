import React, { useState, useRef } from 'react'
import { Alert, Button, CircularProgress, Grid } from '@mui/material'
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import Map, {
  Marker,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { MAPBOX_KEY } from '../Config/Constants';
import AnalysisIcon from "./../Assets/Images/analysis.png";
import Pin from './pin';
import { forwardGeocoding, reverseGeocoding } from '../Utils/Geocoder';

const mapboxApiKey = MAPBOX_KEY;

export default function Estudio() {
  const mapRef = useRef(null);

  const [viewState, setViewState] = React.useState({
    latitude: 19.504381750408218,
    longitude: -99.14677597567123,
    zoom: 11
  });

  const [positionSelected, setPositionSelected] = useState();

  const [results, setResults] = useState();
  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);
  const [search, setSearch] = useState("");

  const makeAnalysis = () => {
    if(!positionSelected){
      notifyInfo("Selecciona un punto en el mapa o propociona una dirección")
      return ;
    }
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

  const handlePositionSelectedMap = async (positionCords) => {
    let response = await reverseGeocoding(positionCords, mapboxApiKey);
    if (response.status === 200) {
      if (response.message) { // If we had a address, change Marker Position Map
        setPositionSelected(positionCords);
        mapRef.current.flyTo({
          center: [positionCords.lng, positionCords.lat],
          zoom: 16,
          essential: true
        })
        setSearch(response.message);
      }
    } else {
      notifyWarn(response.message);
    }
  }

  const searchAddressOnMap = async () => {
    if (search) {
      let response = await forwardGeocoding(search, mapboxApiKey);
      if (response.status === 200) {
        if (response.message) { // If we had coords, change Marker Position Map
          setPositionSelected({
            lng: response.message[0],
            lat: response.message[1]
          });
          mapRef.current.flyTo({
            center: [response.message[0], response.message[1]],
            zoom: 16,
            essential: true
          })
        }
      } else {
        notifyWarn("No se ha podido encontrar una ubicación dada la dirección proporcionada");
      }
    } else {
      inputRef.current.focus();
    }
  }

  const notifyWarn = (message) => toast.warn(message);
  const notifyInfo = (message) => toast.info(message);

  return (
    <div style={{ height: '100%', padding: "10px" }}>
      {/* Estudio */}
      <Grid container spacing={1} columns={12} >
        <Grid item xs={12} md={7} lg={8}>
          <div style={{ width: "100%", height: "70vh" }}>
            <Map
              mapboxAccessToken={mapboxApiKey}
              style={{ width: "100%" }}
              initialViewState={viewState}
              onMove={(view) => { setViewState(view) }}
              ref={mapRef}
              mapStyle="mapbox://styles/mapbox/streets-v11"
              onClick={(position) => { handlePositionSelectedMap(position.lngLat) }}
            >
              <GeolocateControl position="top-left" />
              <FullscreenControl position="top-left" />
              <NavigationControl position="top-left" />
              <ScaleControl />
              {
                positionSelected && <Marker latitude={positionSelected.lat}
                  longitude={positionSelected.lng}
                  anchor="bottom"
                >
                  <Pin />
                </Marker>
              }
            </Map>
          </div>
        </Grid>
        <Grid item xs={12} md={5} lg={4}
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
              // ref={inputRef}
              inputRef={inputRef}
              value={search}
              onChange={(event) => { setSearch(event.currentTarget.value) }}
              placeholder="Buscar dirección..."
              inputProps={{ 'aria-label': 'search' }}
            />
            <Button onClick={() => searchAddressOnMap()} style={{ height: 40, backgroundColor: "rgba(0, 0, 0, 0.8)" }} >
              <SearchIconWrapper>
                <SearchIcon style={{ color: "white" }} />
              </SearchIconWrapper>
            </Button>
          </Search>
          <br />
          <div style={{ textAlign: "center", paddingTop: "60px" }}>
            <div>
              <Button onClick={() => { makeAnalysis() }} style={{ backgroundColor: "#FFC300", color: "black", padding: "8px 16px 8px 16px" }} >
                <strong> Aceptar </strong>
              </Button>
              <br />  <br />
              <img src={AnalysisIcon} style={{ width: "30%", height: "auto", opacity: "0.1" }} alt="icon" />
            </div>
            <div style={{ paddingTop: "100px" }}>
              {loading ? <CircularProgress color='warning' /> : results ? <Alert severity="success">{results}</Alert> : ""}
            </div>
          </div>
        </Grid>
      </Grid>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        closeOnClick
      />
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
  [theme.breakpoints.up('xs')]: {
    width: 'auto',
    paddingTop: "8px",
    display: 'flex',
    alignItems: 'center',
  },
  [theme.breakpoints.up('md')]: {
    width: 'auto',
    paddingTop: "0px"
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
    fontSize: '12px',
    borderRadius: "4px",
    [theme.breakpoints.up('xs')]: {
      width: '100%',
      '&:focus': {
        width: '18ch',
      },
    },
    [theme.breakpoints.up('sm')]: {
      width: '24ch',
      '&:focus': {
        width: '28ch',
      },
    },
  },
}));