import React, { useEffect, useRef, useState } from 'react';
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
  filteredLocations?: typeof sampleLocations;
}

export const LeafletMap: React.FC<LeafletMapProps> = ({ 
  selectedLocation, 
  onLocationSelect,
  filteredLocations = sampleLocations
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const [mapReady, setMapReady] = useState(false);

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

        mapInstanceRef.current = map;
        console.log('✅ Leaflet map initialized successfully');
        
        // Signal that map is ready for markers
        setTimeout(() => {
          setMapReady(true);
        }, 50);
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
  }, []);

  // Update markers when filteredLocations changes OR when map initializes
  useEffect(() => {
    if (!mapInstanceRef.current || !mapReady) return;

    // Remove old markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers for filtered locations
    filteredLocations.forEach((location) => {
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
        .addTo(mapInstanceRef.current!)
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

      markersRef.current.push(marker);
    });

    console.log('🔄 Markers updated:', filteredLocations.length, 'locations displayed');
  }, [filteredLocations, onLocationSelect, mapReady]);

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
    </div>
  );
};
