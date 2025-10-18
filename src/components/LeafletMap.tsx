import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { sampleLocations } from '@/data/locations';
import { getMarkerByCategory } from './CategoryMarkers';
import 'leaflet/dist/leaflet.css';
import { MapPin, Gem, Mountain, Sun, Coffee, Star } from "lucide-react";


// Fix for default marker icon
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet's default icon path issue
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface LeafletMapProps {
  selectedLocation?: number | null;
  onLocationSelect?: (locationId: number | null) => void;
}

export const LeafletMap: React.FC<LeafletMapProps> = ({ 
  selectedLocation, 
  onLocationSelect 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (!mapRef.current) return;

      try {
        // Initialize map
        const map = L.map(mapRef.current).setView([7.8731, 80.7718], 7);

        // Add OpenStreetMap tiles (FREE - No API key needed!)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map);

        // Add markers for each location with category-based icons
        sampleLocations.forEach((location) => {
          // Get emoji for category
          const categoryEmoji = {
            beach: Sun,
            adventure: Mountain,
            cultural: Star,
            food: Coffee,
            hidden: Gem
          }[location.category];

          const marker = L.marker([location.lat, location.lng], {
            icon: getMarkerByCategory(location.category)
          })
            .addTo(map)
            .bindPopup(`
              <div style="min-width: 280px; max-width: 320px;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                  <span style="font-size: 20px;">${categoryEmoji}</span>
                  <h3 style="font-weight: bold; font-size: 16px; margin: 0;">
                    ${location.name}
                  </h3>
                </div>
                <div style="display: inline-block; background: ${
                  location.category === 'beach' ? '#DBEAFE' :
                  location.category === 'adventure' ? '#FEE2E2' :
                  location.category === 'cultural' ? '#F3E8FF' :
                  location.category === 'food' ? '#FFEDD5' :
                  '#D1FAE5'
                }; color: ${
                  location.category === 'beach' ? '#1E40AF' :
                  location.category === 'adventure' ? '#991B1B' :
                  location.category === 'cultural' ? '#6B21A8' :
                  location.category === 'food' ? '#9A3412' :
                  '#065F46'
                }; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 600; margin-bottom: 8px; text-transform: capitalize;">
                  ${location.category}
                </div>
                <p style="font-size: 13px; color: #666; margin-bottom: 8px;">${location.description}</p>
                <div style="display: flex; align-items: center; gap: 8px; font-size: 13px; margin-bottom: 8px;">
                  <span style="color: #f59e0b;">⭐ ${location.rating}</span>
                  <span style="color: #999;">(${location.reviewCount} reviews)</span>
                </div>
                <span style="font-size: 11px; background: #d1fae5; color: #065f46; padding: 4px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">
                  🌱 ${location.sustainabilityScore}% Sustainable
                </span>
              </div>
            `, {
              maxWidth: 350
            });

          marker.on('click', () => {
            onLocationSelect?.(location.id);
          });
        });

        mapInstanceRef.current = map;
        console.log('✅ Leaflet map initialized successfully with', sampleLocations.length, 'markers');
      } catch (error) {
        console.error('❌ Error initializing Leaflet map:', error);
      }
    }, 100);

    // Cleanup
    return () => {
      clearTimeout(timer);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [onLocationSelect]);

  // Handle selected location changes
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedLocation) return;

    const location = sampleLocations.find(l => l.id === selectedLocation);
    if (location) {
      mapInstanceRef.current.flyTo([location.lat, location.lng], 12, {
        duration: 1
      });
    }
  }, [selectedLocation]);

  return (
    <div className="h-full w-full relative min-h-[400px]">
      <div ref={mapRef} className="h-full w-full" style={{ minHeight: '400px' }} />

      {/* Info Badge with Legend */}
      <div className="absolute top-4 left-4 z-[1000] bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-3 max-w-xs">
        <div className="flex items-start gap-2">
          <MapPin className="w-5 h-5 text-[#122C34] mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h4 className="font-semibold text-sm">Leaflet Map ✓</h4>
            <p className="text-xs text-gray-600 mb-2">
              100% FREE • No API Key
            </p>
            <div className="text-xs space-y-1 pt-2 border-t border-gray-200">
              <div className="font-semibold text-gray-700 mb-1">Map Legend:</div>
              <div className="flex items-center gap-2">
                <Sun className="w-5 h-5 text-blue-700" />
                <span className="text-blue-700 font-medium">Beach</span>
              </div>
              <div className="flex items-center gap-2">
                <Mountain className="w-5 h-5 text-green-700" />
                <span className="text-green-700 font-medium">Mountains</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-stone-700" />
                <span className="text-stone-700 font-medium">Culture</span>
              </div>
              <div className="flex items-center gap-2">
                <Coffee className="w-5 h-5 text-purple-700" />
                <span className="text-purple-700 font-medium">Food</span>
              </div>
              <div className="flex items-center gap-2">
                <Gem className="w-5 h-5 text-orange-700" />
                <span className="text-orange-700 font-medium">Hidden Gem</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
