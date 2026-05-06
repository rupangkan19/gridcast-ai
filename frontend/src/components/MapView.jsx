import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useForecast } from '../context/ForecastContext';
import L from 'leaflet';

// Fix Leaflet's default icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Map context hook to change view when region changes
const MapUpdater = ({ center }) => {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
};

const MapView = () => {
  const { selectedRegion, darkMode } = useForecast();

  // Coordinates for some Karnataka regions
  const regions = {
    "Bangalore": [12.9716, 77.5946],
    "Mysore": [12.2958, 76.6394],
    "Hubli": [15.3647, 75.1240],
    "Mangalore": [12.9141, 74.8560],
    "Belagavi": [15.8497, 74.4977]
  };

  const center = regions[selectedRegion] || regions["Bangalore"];

  return (
    <div className="h-full w-full relative z-0">
      <MapContainer 
        center={center} 
        zoom={10} 
        scrollWheelZoom={false} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url={
            darkMode 
              ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          }
          attribution='&copy; OpenStreetMap contributors'
        />
        <MapUpdater center={center} />
        <Marker position={center}>
          <Popup>
            <div className="font-semibold">{selectedRegion} Node</div>
            <div className="text-xs text-gray-500">Active monitoring</div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapView;
