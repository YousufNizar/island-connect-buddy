import React, { useState, useCallback, useMemo } from 'react';
import Map, { Marker, Popup, NavigationControl, GeolocateControl } from 'react-map-gl';
import { MapPin } from 'lucide-react';
import { sampleLocations, Location } from '@/data/locations';
import LocationCard from './LocationCard';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapboxMapProps {
  selectedLocation?: number | null;
  onLocationSelect?: (locationId: number | null) => void;
}

export const MapboxMap: React.FC<MapboxMapProps> = ({ 
  selectedLocation, 
  onLocationSelect 
}) => {
  const mapboxToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
  
  const [viewState, setViewState] = useState({
    longitude: 80.7718,
    latitude: 7.8731,
    zoom: 7
  });
  
  const [popupInfo, setPopupInfo] = useState<number | null>(null);

  // Handle marker click
  const handleMarkerClick = useCallback((locationId: number, lng: number, lat: number) => {
    setPopupInfo(locationId);
    setViewState({
      longitude: lng,
      latitude: lat,
      zoom: 12
    });
    onLocationSelect?.(locationId);
  }, [onLocationSelect]);

  // Close popup
  const handleClosePopup = useCallback(() => {
    setPopupInfo(null);
    onLocationSelect?.(null);
  }, [onLocationSelect]);

  // Memoize markers to prevent re-renders
  const markers = useMemo(() => 
    sampleLocations.map((location) => (
      <Marker
        key={location.id}
        longitude={location.lng}
        latitude={location.lat}
        anchor="bottom"
        onClick={(e) => {
          e.originalEvent.stopPropagation();
          handleMarkerClick(
            location.id,
            location.lng,
            location.lat
          );
        }}
      >
        <div 
          className={`cursor-pointer transition-transform hover:scale-110 ${
            selectedLocation === location.id ? 'scale-125' : ''
          }`}
        >
          <MapPin 
            className={`w-8 h-8 ${
              selectedLocation === location.id
              ? 'text-blue-600 fill-blue-600'
              : 'text-gray-600 fill-gray-600'
            }`}
            strokeWidth={2}
          />
        </div>
      </Marker>
    )),
    [selectedLocation, handleMarkerClick]
  );

  // Get popup location
  const popupLocation = useMemo(() => 
    sampleLocations.find(loc => loc.id === popupInfo),
    [popupInfo]
  );

  if (!mapboxToken || mapboxToken === 'pk.YOUR_MAPBOX_TOKEN_HERE') {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-100">
        <div className="text-center p-8 max-w-md bg-white rounded-lg shadow-lg">
        
          <h3 className="text-xl font-bold mb-2">Mapbox Token Required</h3>
          <p className="text-gray-600 mb-4">
            Get your FREE Mapbox token (no credit card needed!)
          </p>
          <ol className="text-left text-sm space-y-2 mb-4">
            <li>1. Go to <a href="https://account.mapbox.com/access-tokens/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Mapbox Access Tokens</a></li>
            <li>2. Sign up for free (no credit card)</li>
            <li>3. Copy your default public token (starts with "pk.")</li>
            <li>4. Add to .env file: <code className="bg-gray-100 px-1">VITE_MAPBOX_ACCESS_TOKEN=pk.your_token</code></li>
            <li>5. Restart the dev server</li>
          </ol>
          <p className="text-xs text-gray-500">
            Free tier: 50,000 map loads/month - Perfect for development!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={mapboxToken}
        style={{ width: '100%', height: '100%' }}
        attributionControl={true}
      >
        {/* Navigation Controls */}
        <NavigationControl position="top-right" />
        
        {/* Geolocate Control */}
        <GeolocateControl
          position="top-right"
          trackUserLocation
          showUserHeading
        />

        {/* Markers */}
        {markers}

        {/* Popup */}
        {popupInfo && popupLocation && (
          <Popup
            longitude={popupLocation.lng}
            latitude={popupLocation.lat}
            anchor="top"
            onClose={handleClosePopup}
            closeOnClick={false}
            className="mapbox-popup"
          >
            <div className="p-2 max-w-xs">
              <LocationCard location={popupLocation} onClick={handleClosePopup} />
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};
