import { useState, useMemo, useCallback } from 'react';
import { GoogleMap, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { sampleLocations } from '@/data/locations';
import { X } from 'lucide-react';
import { throttle } from '@/lib/utils';

// Cache map instances to avoid re-creating them
const mapCache = new Map<string, google.maps.Map>();

interface InteractiveMapProps {
  onLocationSelect?: (locationId: number) => void;
}

const InteractiveMap = ({ onLocationSelect }: InteractiveMapProps) => {
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
  const [mapCenter, setMapCenter] = useState({
    lat: 7.8731,
    lng: 80.7718
  });

  const mapOptions = useMemo(() => ({
    zoom: 7,
    minZoom: 6,
    maxZoom: 15,
    mapTypeControl: true,
    streetViewControl: false,
    fullscreenControl: true,
    styles: [
      {
        featureType: 'water',
        stylers: [{ color: '#a8d5ff' }]
      },
      {
        featureType: 'land',
        stylers: [{ color: '#f3f3f3' }]
      }
    ]
  }), []);

  // Throttle marker updates to prevent excessive re-renders
  const handleMarkerClick = useCallback((markerId: number) => {
    setSelectedMarker(markerId);
  }, []);

  const throttledMarkerUpdate = useMemo(
    () => throttle(handleMarkerClick, 300),
    [handleMarkerClick]
  );

  // Cache map container style
  const mapContainerStyle = useMemo(() => ({
    width: '100%',
    height: '100%',
    borderRadius: '1rem'
  }), []);

  // Memoize marker icons to prevent re-creation
  const getMarkerIcon = useCallback((category: string) => ({
    path: 'M0,-28 C-7.73,-28 -14,-21.73 -14,-14 C-14,-10.36 -11.89,-7.27 -9,-5.68 L0,15 L9,-5.68 C11.89,-7.27 14,-10.36 14,-14 C14,-21.73 7.73,-28 0,-28 Z',
    fillColor: category === 'beach' ? '#3b82f6' : '#ff6b35',
    fillOpacity: 1,
    scale: 1.2,
    strokeColor: '#ffffff',
    strokeWeight: 2
  }), []);

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={mapCenter}
      zoom={mapOptions.zoom}
      options={mapOptions}
    >
      {sampleLocations.map((location) => (
        <MarkerF
          key={location.id}
          position={{ lat: location.lat, lng: location.lng }}
          onClick={() => throttledMarkerUpdate(location.id)}
          icon={getMarkerIcon(location.category)}
        >
          {selectedMarker === location.id && (
            <InfoWindowF onCloseClick={() => setSelectedMarker(null)}>
              <div className="w-48">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-sm">{location.name}</h3>
                  <button onClick={() => setSelectedMarker(null)} className="p-0">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-600 mb-2">{location.description.substring(0, 60)}...</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold">⭐ {location.rating}</span>
                  <button
                    onClick={() => {
                      onLocationSelect?.(location.id);
                      setSelectedMarker(null);
                    }}
                    className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </InfoWindowF>
          )}
        </MarkerF>
      ))}
    </GoogleMap>
  );
};

export default InteractiveMap;