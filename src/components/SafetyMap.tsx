import { useEffect, useRef } from "react";
import { X, AlertTriangle, CheckCircle, Shield, Navigation } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons
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

type SafetyAlert = {
  id: string;
  type: "warning" | "safe";
  severity?: string;
  location: string;
  description: string;
  timestamp: string;
  coordinates: [number, number];
  reportCount?: number;
};

type SafetyMapProps = {
  alert?: SafetyAlert;
  onClose: () => void;
};

const SafetyMap = ({ alert, onClose }: SafetyMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const userLocation: [number, number] = [6.9271, 79.8612]; // Default: Colombo

  // Sample safety alerts with coordinates
  const safetyAlerts: SafetyAlert[] = [
    {
      id: "1",
      type: "warning",
      severity: "moderate",
      location: "Colombo Fort Area",
      description: "3 scam reports near train station in last 24 hours. Be cautious of unofficial 'tour guides'.",
      timestamp: "2 hours ago",
      coordinates: [6.9344, 79.8428],
      reportCount: 3,
    },
    {
      id: "2",
      type: "safe",
      location: "Galle Fort Historic District",
      description: "Verified safe for tourists. Tourist Police patrol active. Emergency services nearby.",
      timestamp: "Updated 1 hour ago",
      coordinates: [6.0261, 80.2168],
    },
    {
      id: "3",
      type: "warning",
      severity: "high",
      location: "Pettah Market",
      description: "Pickpocket incidents reported. Keep valuables secure and stay in well-lit areas.",
      timestamp: "3 hours ago",
      coordinates: [6.9387, 79.8533],
      reportCount: 5,
    },
    {
      id: "4",
      type: "safe",
      location: "Viharamahadevi Park",
      description: "Well-maintained public space with security. Safe for families and solo travelers.",
      timestamp: "Updated 30 minutes ago",
      coordinates: [6.9147, 79.8612],
    },
    {
      id: "5",
      type: "warning",
      severity: "low",
      location: "Mount Lavinia Beach",
      description: "Strong currents reported. Swim only in designated areas with lifeguards present.",
      timestamp: "4 hours ago",
      coordinates: [6.8378, 79.8631],
      reportCount: 2,
    },
  ];

  // Focus on specific alert if provided, otherwise show all
  const centerPosition: [number, number] = alert?.coordinates || userLocation;
  const displayAlerts = alert ? [alert] : safetyAlerts;

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const timer = setTimeout(() => {
      if (!mapRef.current) return;

      try {
        // Initialize map
        const map = L.map(mapRef.current).setView(centerPosition, alert ? 15 : 13);

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map);

        // Custom marker icons
        const warningIcon = L.divIcon({
          html: `<div style="background-color: #ef4444; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>`,
          className: "",
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });

        const safeIcon = L.divIcon({
          html: `<div style="background-color: #22c55e; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          </div>`,
          className: "",
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });

        const userLocationIcon = L.divIcon({
          html: `<div style="background-color: #3b82f6; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
          className: "",
          iconSize: [20, 20],
          iconAnchor: [10, 10],
        });

        // Add user location marker
        L.marker(userLocation, { icon: userLocationIcon })
          .addTo(map)
          .bindPopup('<div style="text-align: center;"><strong>📍 Your Location</strong><br/><span style="font-size: 12px; color: #666;">Current position</span></div>');

        // Add safety alert markers
        displayAlerts.forEach((alertItem) => {
          const marker = L.marker(alertItem.coordinates, {
            icon: alertItem.type === "warning" ? warningIcon : safeIcon
          }).addTo(map);

          const popupContent = `
            <div style="min-width: 250px; padding: 8px;">
              <div style="margin-bottom: 8px;">
                <span style="background: ${alertItem.type === "warning" ? "#dc2626" : "#16a34a"}; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold;">
                  ${alertItem.type === "warning" ? "⚠️ WARNING" : "✓ SAFE"}
                </span>
                ${alertItem.severity ? `<span style="border: 1px solid #ccc; padding: 2px 6px; border-radius: 4px; font-size: 11px; margin-left: 4px;">${alertItem.severity}</span>` : ''}
              </div>
              <h4 style="font-weight: bold; margin-bottom: 8px;">${alertItem.location}</h4>
              <p style="font-size: 13px; margin-bottom: 8px;">${alertItem.description}</p>
              ${alertItem.reportCount ? `<p style="font-size: 12px; color: #666; margin-bottom: 4px;">📊 ${alertItem.reportCount} reports</p>` : ''}
              <p style="font-size: 11px; color: #999;">${alertItem.timestamp}</p>
            </div>
          `;
          marker.bindPopup(popupContent, { maxWidth: 300 });

          // Add circle overlay for zones
          const circleColor = alertItem.type === "warning" ? "#ef4444" : "#22c55e";
          const circleRadius = alertItem.type === "warning" 
            ? (alertItem.severity === "high" ? 500 : 300)
            : 400;

          L.circle(alertItem.coordinates, {
            color: circleColor,
            fillColor: circleColor,
            fillOpacity: 0.1,
            radius: circleRadius,
            weight: 2,
          }).addTo(map);
        });

        mapInstanceRef.current = map;
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alert]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-in fade-in duration-200">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Map Container */}
      <div className="relative w-full h-full sm:w-[95vw] sm:h-[95vh] sm:max-w-6xl bg-card sm:rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-[1000] bg-gradient-to-b from-card via-card to-card/95 backdrop-blur-sm p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold">Safety Map</h2>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {alert ? "Viewing specific alert" : "All safety alerts and safe zones"}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-destructive/10 hover:text-destructive shrink-0"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute top-20 left-4 z-[1000] bg-card/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-border">
          <h3 className="text-sm font-semibold mb-2">Legend</h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-white"></div>
              <span>Warning Zone</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-white"></div>
              <span>Safe Zone</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500 border-2 border-white"></div>
              <span>Your Location</span>
            </div>
          </div>
        </div>

        {/* Map */}
        <div ref={mapRef} className="w-full h-full z-0" style={{ width: "100%", height: "100%" }} />

        {/* Bottom Info Bar */}
        <div className="absolute bottom-0 left-0 right-0 z-[1000] bg-card/95 backdrop-blur-sm p-3 sm:p-4 border-t border-border">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span className="font-semibold">
                  {displayAlerts.filter((a) => a.type === "warning").length} Warnings
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="font-semibold">
                  {displayAlerts.filter((a) => a.type === "safe").length} Safe Zones
                </span>
              </div>
            </div>
            <Button size="sm" variant="outline" onClick={onClose}>
              Close Map
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyMap;
