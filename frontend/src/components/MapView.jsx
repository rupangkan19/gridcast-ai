import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useForecast } from '../context/ForecastContext';
import L from 'leaflet';
import { renewableAssets } from '../data/assets';

// Fix Leaflet's default icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Map context hook to change view when asset changes
const MapUpdater = ({ center }) => {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
};

const MapView = () => {
  const { selectedAsset, darkMode } = useForecast();

  const activeAssetData = renewableAssets.find(a => a.id === selectedAsset) || renewableAssets[0];
  const center = [activeAssetData.lat, activeAssetData.lon];

  return (
    <div className="h-full w-full relative z-0">
      <MapContainer 
        center={center} 
        zoom={8} 
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
        
        {renewableAssets.map(asset => (
          <Marker key={asset.id} position={[asset.lat, asset.lon]}>
            <Popup>
              <div className="font-semibold">{asset.name}</div>
              <div className="text-xs text-gray-500 capitalize">{asset.type} Plant | {asset.capacityMW} MW</div>
              {selectedAsset === asset.id && (
                <div className="mt-1 text-xs text-blue-500 font-medium">Currently Selected</div>
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
