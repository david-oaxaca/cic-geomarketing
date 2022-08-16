import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer} from 'react-leaflet';
import { MAPBOX_KEY } from '../Config/Constants';
import axios from "axios";
import ShowMarkersCluster from '../Components/ClusterData/ShowMarkersCluster';

const mapboxUriTileLayer = "https://api.mapbox.com/styles/v1/medinavilla/cl6v5mk8w000t14mtzhgb5kbd/tiles/256/{z}/{x}/{y}@2x?access_token=" + MAPBOX_KEY

export default function Home() {
  const mapRef = useRef(null);
  const [zoom] = useState(5);
  const [data, setData] = useState([])

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // DATA fetcj
    axios.get("https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2019-10").then((res) => {
      setData(res.data);
      setLoading(false);
    })
  }, [])

  if (loading) return <div>Cargando...</div>; else {
    return (
      <div>
        {/* Inicio */}
        <div style={{ width: "100vw", height: "80vh" }}>
          <MapContainer
            center={[52.6376, -1.135171]}
            zoom={zoom}
            ref={mapRef}
            style={{ height: '100%' }}
          >
            <TileLayer
              url={mapboxUriTileLayer}
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
            <ShowMarkersCluster data={data}/>
          </MapContainer>
        </div>
      </div>
    )
  }
}