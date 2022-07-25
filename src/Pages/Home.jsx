import React from 'react';
import Map, {
  Marker,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl
} from 'react-map-gl';
import MarkerIcon from "./../Assets/Images/marker.png";
import Pin from './pin';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MAPBOX_KEY } from '../Config/Constants';

export default function Home() {

  const mapboxApiKey = MAPBOX_KEY;

  const [viewState, setViewState] = React.useState({
    latitude: 19.504381750408218,
    longitude: -99.14677597567123,
    zoom: 11
  });

  return (
    <div>
      {/* Inicio */}
      <div style={{ width: "100vw", height: "90vh" }}>
        <Map
          mapboxAccessToken={mapboxApiKey}
          style={{ width: "100$" }}
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
  )
}