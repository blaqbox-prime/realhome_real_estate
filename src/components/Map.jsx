/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from 'react'
import * as L from 'leaflet';

function Map({ location }) {
  const fallbackLocation = { lat: -26.2041, lng: 28.0473 };
  const coordinates = location ?? fallbackLocation;

  const [map, setMap] = useState(null);
 
 const mapRef = useCallback((mapContainer) => {
 
    if(!mapContainer) return;
 
    mapContainer.innerHTML = '';
 
   
    const leafmap = new L.map(mapContainer).setView([-26.029744,28.0579063],14);
 
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
    }).addTo(leafmap);
 
    setMap(leafmap);
 
  },[]);
 
  useEffect(()=>{
    if(map !== null){
      map.setView([coordinates.lat, coordinates.lng], 14);
      const marker = L.marker([coordinates.lat, coordinates.lng],{
        icon: L.icon({iconUrl :'/assets/icon-location.svg',iconSize: [46,56]})
      }).addTo(map)

      return () => map.removeLayer(marker);
    }
  },[map, coordinates])
 
  return (
    <main className="MapContainer flex flex-1 h-80 w-full" ref={mapRef}>
 
    </main>
  )
}
 
export default Map
 