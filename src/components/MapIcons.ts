// Custom marker icons for different alert levels
import L from 'leaflet';

// High Alert - Red marker
export const highAlertIcon = L.divIcon({
  className: 'custom-marker-icon',
  html: `
    <div style="position: relative;">
      <svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C7.163 0 0 7.163 0 16c0 12 16 26 16 26s16-14 16-26c0-8.837-7.163-16-16-16z" fill="#DC2626"/>
        <circle cx="16" cy="16" r="10" fill="white"/>
        <text x="16" y="22" font-size="16" text-anchor="middle" fill="#DC2626">🚨</text>
      </svg>
      <div style="position: absolute; top: -8px; right: -8px; background: #DC2626; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold; border: 2px solid white;">!</div>
    </div>
  `,
  iconSize: [32, 42],
  iconAnchor: [16, 42],
  popupAnchor: [0, -42]
});

// Medium Alert - Orange/Yellow marker
export const mediumAlertIcon = L.divIcon({
  className: 'custom-marker-icon',
  html: `
    <div style="position: relative;">
      <svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C7.163 0 0 7.163 0 16c0 12 16 26 16 26s16-14 16-26c0-8.837-7.163-16-16-16z" fill="#F59E0B"/>
        <circle cx="16" cy="16" r="10" fill="white"/>
        <text x="16" y="22" font-size="16" text-anchor="middle" fill="#F59E0B">⚠️</text>
      </svg>
    </div>
  `,
  iconSize: [32, 42],
  iconAnchor: [16, 42],
  popupAnchor: [0, -42]
});

// Low Alert - Blue marker
export const lowAlertIcon = L.divIcon({
  className: 'custom-marker-icon',
  html: `
    <div style="position: relative;">
      <svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C7.163 0 0 7.163 0 16c0 12 16 26 16 26s16-14 16-26c0-8.837-7.163-16-16-16z" fill="#3B82F6"/>
        <circle cx="16" cy="16" r="10" fill="white"/>
        <text x="16" y="22" font-size="16" text-anchor="middle" fill="#3B82F6">ℹ️</text>
      </svg>
    </div>
  `,
  iconSize: [32, 42],
  iconAnchor: [16, 42],
  popupAnchor: [0, -42]
});

// Safe - Green marker
export const safeIcon = L.divIcon({
  className: 'custom-marker-icon',
  html: `
    <div style="position: relative;">
      <svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C7.163 0 0 7.163 0 16c0 12 16 26 16 26s16-14 16-26c0-8.837-7.163-16-16-16z" fill="#10B981"/>
        <circle cx="16" cy="16" r="10" fill="white"/>
        <text x="16" y="22" font-size="16" text-anchor="middle" fill="#10B981">✓</text>
      </svg>
    </div>
  `,
  iconSize: [32, 42],
  iconAnchor: [16, 42],
  popupAnchor: [0, -42]
});

// User Report - Purple marker (for user-submitted alerts)
export const userReportIcon = L.divIcon({
  className: 'custom-marker-icon',
  html: `
    <div style="position: relative;">
      <svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C7.163 0 0 7.163 0 16c0 12 16 26 16 26s16-14 16-26c0-8.837-7.163-16-16-16z" fill="#8B5CF6"/>
        <circle cx="16" cy="16" r="10" fill="white"/>
        <text x="16" y="22" font-size="16" text-anchor="middle" fill="#8B5CF6">📍</text>
      </svg>
      <div style="position: absolute; top: -8px; right: -8px; background: #8B5CF6; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold; border: 2px solid white;">👤</div>
    </div>
  `,
  iconSize: [32, 42],
  iconAnchor: [16, 42],
  popupAnchor: [0, -42]
});
